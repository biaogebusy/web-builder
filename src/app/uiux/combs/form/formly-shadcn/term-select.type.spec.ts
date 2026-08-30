import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { UntypedFormGroup } from '@angular/forms';
import { provideRouter } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FormlyModule } from '@ngx-formly/core';
import type { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { of, throwError } from 'rxjs';
import { vi } from 'vitest';

import { provideCoreMocks } from '@core/testing/mocks';
import { NodeService } from '@core/service/node.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { provideXinshiFormly } from '../formly-feature.config';
import { shadcnFormOptions } from './formly-shadcn.config';

@Component({
  selector: 'app-term-select-spec-host',
  imports: [FormlyModule],
  providers: [provideXinshiFormly()],
  template: '<formly-form [form]="form" [fields]="fields" [model]="model" [options]="options" />',
})
class TermSelectSpecHostComponent {
  form = new UntypedFormGroup({});
  model: Record<string, unknown> = {};
  fields: FormlyFieldConfig[] = [];
  options: FormlyFormOptions = shadcnFormOptions();
}

describe('TermSelectType', () => {
  let nodeServiceMock: { addEntity: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    nodeServiceMock = { addEntity: vi.fn(() => of({ data: { id: 't-new' } })) };
    await TestBed.configureTestingModule({
      imports: [TermSelectSpecHostComponent, TranslateModule.forRoot()],
      providers: [
        provideRouter([]),
        ...provideCoreMocks(),
        { provide: NodeService, useValue: nodeServiceMock },
      ],
    }).compileComponents();
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  const render = async (
    fields: FormlyFieldConfig[],
    model?: Record<string, unknown>
  ) => {
    const fixture = TestBed.createComponent(TermSelectSpecHostComponent);
    fixture.componentInstance.fields = fields;
    if (model) {
      fixture.componentInstance.model = model;
    }
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    return fixture;
  };

  const openPanelAndFilter = async (
    fixture: { detectChanges: () => void; nativeElement: HTMLElement },
    keyword: string
  ) => {
    const el = fixture.nativeElement as HTMLElement;
    (el.querySelector<HTMLButtonElement>('.term-trigger') as HTMLButtonElement).click();
    fixture.detectChanges();
    const input = el.querySelector<HTMLInputElement>('input.term-filter');
    expect(input).toBeTruthy();
    input!.value = keyword;
    input!.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    return el;
  };

  it('多选:过滤无匹配时提供新建项,创建后并入选项并选中', async () => {
    const fixture = await render([
      {
        key: 'field_tags',
        type: 'term-select',
        props: {
          label: '标签',
          multiple: true,
          vocabulary: 'tags',
          options: [
            { label: 'Drupal', value: 't1' },
            { label: 'Angular', value: 't2' },
          ],
        },
      },
    ]);

    const el = await openPanelAndFilter(fixture, '新标签');

    // Filtering narrowed the list to the create option only
    const createItem = el.querySelector('.create-label')?.closest('li') as HTMLElement;
    expect(createItem).toBeTruthy();
    expect(el.querySelectorAll('.shad-option').length).toBe(1);

    createItem.click();
    fixture.detectChanges();

    // The term was created in the field's vocabulary and the fresh uuid became the form value
    expect(nodeServiceMock.addEntity).toHaveBeenCalledWith(
      '/api/v1/taxonomy_term/tags',
      { name: '新标签' }
    );
    expect(fixture.componentInstance.model['field_tags']).toEqual(['t-new']);
    // The created term is selectable like any existing option
    expect(el.querySelector('.term-trigger')?.textContent).toContain('新标签');
  });

  it('单选:创建后写入单个 uuid,已有词条过滤时不出现新建项', async () => {
    const fixture = await render([
      {
        key: 'category',
        type: 'term-select',
        props: {
          label: '分类',
          multiple: false,
          vocabulary: 'news_category',
          options: [{ label: '公司新闻', value: 'c1' }],
        },
      },
    ]);

    // An exact (case-insensitive) match is a selection, not a creation
    let el = await openPanelAndFilter(fixture, '公司新闻');
    expect(el.querySelector('.create-label')).toBeNull();
    expect(el.querySelector('.shad-option')?.textContent).toContain('公司新闻');

    (el.querySelector('.shad-option') as HTMLElement)?.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.model['category']).toBe('c1');

    // A name matching nothing offers creation instead
    el = await openPanelAndFilter(fixture, '产品动态');
    (el.querySelector('.create-label')?.closest('li') as HTMLElement).click();
    fixture.detectChanges();

    expect(nodeServiceMock.addEntity).toHaveBeenCalledWith(
      '/api/v1/taxonomy_term/news_category',
      { name: '产品动态' }
    );
    expect(fixture.componentInstance.model['category']).toBe('t-new');
  });

  it('创建失败时提示错误且不改表单值', async () => {
    const util = TestBed.inject(UtilitiesService);
    nodeServiceMock.addEntity.mockReturnValue(
      throwError(() => ({ error: { errors: [{ detail: '无权限' }] } }))
    );
    const fixture = await render([
      {
        key: 'field_tags',
        type: 'term-select',
        props: { label: '标签', multiple: true, vocabulary: 'tags', options: [] },
      },
    ]);

    const el = await openPanelAndFilter(fixture, '失败词条');
    (el.querySelector('.create-label')?.closest('li') as HTMLElement).click();
    fixture.detectChanges();

    expect(util.openSnackbar).toHaveBeenCalled();
    // The form value was never touched: creation failure leaves it as-is
    expect(fixture.componentInstance.model['field_tags']).toBeUndefined();
  });
});
