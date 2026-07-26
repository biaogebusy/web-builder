import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { BuilderService } from '@core/service/builder.service';
import { NodeService } from '@core/service/node.service';
import { UtilitiesService } from '@core/service/utilities.service';
import {
  createBuilderServiceMock,
  createNodeServiceMock,
  createUtilitiesServiceMock,
  provideCoreMocks,
} from '@core/testing/mocks';
import { of, throwError } from 'rxjs';

import { TaxonomyComponent } from './taxonomy.component';

describe('TaxonomyComponent', () => {
  let component: TaxonomyComponent;
  let fixture: ComponentFixture<TaxonomyComponent>;
  const user = { id: 'u-1' };
  const nodeService = createNodeServiceMock();
  const builderService = createBuilderServiceMock();
  const util = createUtilitiesServiceMock();

  beforeEach(async () => {
    vi.clearAllMocks();
    await TestBed.configureTestingModule({
      imports: [TaxonomyComponent],
      providers: [
        provideRouter([]),
        ...provideCoreMocks(),
        { provide: NodeService, useValue: nodeService },
        { provide: BuilderService, useValue: builderService },
        { provide: UtilitiesService, useValue: util },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TaxonomyComponent);
    fixture.componentRef.setInput('content', {
      title: '分类管理',
      params: { api: '/api/v1/taxonomy_term/tags' },
    });
    component = fixture.componentInstance;
    component.ngOnInit();
    nodeService.fetch.mockClear();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('requires a signed-in user before adding a term', () => {
    component.onUpdate({ name: '新分类' }, undefined);

    expect(util.openSnackbar).toHaveBeenCalledWith('请登录！', 'ok');
    expect(nodeService.addEntity).not.toHaveBeenCalled();
  });

  it('adds a new term, refreshes the list and resets the form', () => {
    const resetSpy = vi.spyOn(component.form, 'reset');

    component.onUpdate({ name: '新分类', weight: 0 }, user);

    expect(nodeService.addEntity).toHaveBeenCalledWith('/api/v1/taxonomy_term/tags', {
      name: '新分类',
      weight: 0,
    });
    expect(nodeService.fetch).toHaveBeenCalledWith('/api/v1/taxonomy_term/tags', 'noCache=true');
    expect(resetSpy).toHaveBeenCalled();
  });

  it('shows the failure hint when adding a term fails', () => {
    nodeService.addEntity.mockReturnValueOnce(throwError(() => new Error('boom')));

    component.onUpdate({ name: '新分类' }, user);

    expect(util.openSnackbar).toHaveBeenCalledWith('添加失败');
    expect(nodeService.fetch).not.toHaveBeenCalled();
  });

  it('updates the selected term through updateAttributes', () => {
    component.selectedItem = { id: 'term-1', attributes: { langcode: 'zh-hans' } };
    builderService.updateAttributes.mockReturnValueOnce(of({ data: {} }));

    component.onUpdate({ name: '改名', weight: 2 }, user);

    expect(builderService.updateAttributes).toHaveBeenCalledWith(
      { uuid: 'term-1', langcode: 'zh-hans' },
      '/api/v1/taxonomy_term/tags',
      { name: '改名', weight: 2 },
      {}
    );
    expect(util.openSnackbar).toHaveBeenCalledWith('更新成功！');
    expect(nodeService.fetch).toHaveBeenCalledWith('/api/v1/taxonomy_term/tags', 'noCache=true');
  });

  it('deletes the term and refreshes the list', () => {
    component.onDelete({ id: 'term-9' }, user);

    expect(nodeService.deleteEntity).toHaveBeenCalledWith('/api/v1/taxonomy_term/tags', 'term-9');
    expect(util.openSnackbar).toHaveBeenCalledWith('删除成功！', 'ok');
    expect(nodeService.fetch).toHaveBeenCalledWith('/api/v1/taxonomy_term/tags', 'noCache=true');
  });

  it('clears the selection on reset', () => {
    component.selectedItem = { id: 'term-1' };

    component.onReset();

    expect(component.selectedItem).toBeNull();
  });
});
