import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MatIconTestingModule } from '@angular/material/icon/testing';
import { provideRouter } from '@angular/router';
import type { IMetaEdit } from '@core/interface/IBuilder';
import type { IImg } from '@core/interface/widgets/IImg';
import { BuilderState } from '@core/state/BuilderState';
import { getInlineImg } from '@modules/builder/factory/getInlinImg';
import { provideBuilderMocks } from '@modules/builder/testing/mocks';
import { FormlyComponent } from '@uiux/combs/form/formly/formly.component';
import { LocalStorageService, withNgxWebstorageConfig } from 'ngx-webstorage';
import { get } from 'lodash-es';
import { InlineEditComponent } from './inline-editor.component';

describe('InlineEditComponent with Formly and real draft state', () => {
  let fixture: ComponentFixture<InlineEditComponent>;
  let state: BuilderState;
  const original = () => ({ type: 'img', src: '/first.svg', alt: 'First image',
    width: 320, height: 240, href: '/details', custom: { keep: true },
    style: { borderRadius: '24px', opacity: '0.6', boxShadow: '0 2px 4px black',
      aspectRatio: '4 / 3', objectFit: 'cover' } });
  const storage = { retrieve: vi.fn(), store: vi.fn() };
  let saved: unknown;

  const image = (path = '0'): IImg => get(state.currentPage.body, path);
  const formly = () => fixture.debugElement.query(By.directive(FormlyComponent))
    .componentInstance as FormlyComponent;
  const change = async (key: string, value: unknown) => {
    formly().form().get(key)!.setValue(value);
    fixture.detectChanges();
    await fixture.whenStable();
  };
  const open = async (path = '0') => {
    const data = image(path);
    const ele = document.createElement('img');
    ele.src = data.src;
    ele.width = data.width!;
    ele.height = data.height!;
    Object.assign(ele.style, data.style);
    const content: IMetaEdit = { type: 'inline-editor', mode: 'img', path: `${path}.src`,
      fullWidth: true, ele, fields: getInlineImg(ele),
      data: { src: data.src, fileName: 'image.svg', alt: data.alt ?? null, tag: 'IMG' } };
    fixture.componentRef.setInput('content', content);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  };

  beforeEach(async () => {
    saved = undefined;
    storage.retrieve.mockImplementation(key => key === 'version' ? [
      { title: 'First', current: true, body: [original(), { ...original(), src: '/second.svg' }] },
    ] : null);
    storage.store.mockImplementation((_key, value) => {
      saved = JSON.parse(JSON.stringify(value));
    });
    await TestBed.configureTestingModule({
      imports: [InlineEditComponent, MatIconTestingModule],
      providers: [provideRouter([]), ...provideBuilderMocks(), BuilderState,
        ...withNgxWebstorageConfig({ separator: ':', caseSensitive: true }).providers,
        { provide: LocalStorageService, useValue: storage }],
    }).compileComponents();
    state = TestBed.inject(BuilderState);
    fixture = TestBed.createComponent(InlineEditComponent);
    await open();
    storage.store.mockClear();
  });

  it.each(['style.width', 'style.height', 'src'])(
    'keeps styles cleared when editing %s and reopening the panel', async key => {
      fixture.componentInstance.onClear();
      fixture.detectChanges();
      await fixture.whenStable();
      expect(image().style).toEqual({});
      await change(key, key === 'src' ? '/replacement.svg' : 321);
      expect(image().style).toEqual({});
      expect(image()).toMatchObject({ alt: 'First image', href: '/details', custom: { keep: true } });
      expect(get(saved, '0.body.0.style')).toEqual({});
      await open();
      expect(formly().form().get('style.borderRadius')!.value).toBe('');
    });

  it.each([null, '', 0, -1, 1.5, NaN, Infinity])(
    'retains both dimensions for invalid input %s and accepts the next valid input', async value => {
      await change('style.width', value);
      await change('style.height', value);
      expect(image()).toMatchObject({ width: 320, height: 240 });
      expect(get(saved, '0.body.0')).toMatchObject({ width: 320, height: 240 });
      await change('style.width', 640);
      await change('style.height', 480);
      expect(image()).toMatchObject({ width: 640, height: 480 });
    });

  it('saves a complete image once without mutating the previous draft or emitted model', () => {
    const previous = image();
    const before = structuredClone(previous);
    const value = { src: '/replacement.svg', style: { width: 640, height: 480, opacity: 0 } };
    fixture.componentInstance.onModelChange(value);
    expect(storage.store).toHaveBeenCalledOnce();
    expect(previous).toEqual(before);
    expect(value.style).toEqual({ width: 640, height: 480, opacity: 0 });
    expect(image()).toMatchObject({ width: 640, height: 480, src: '/replacement.svg',
      alt: 'First image', href: '/details', custom: { keep: true }, style: { opacity: 0 } });
    expect(image().style.width).toBeUndefined();
  });

  it('clears repeatedly without losing dimensions or restoring untouched fields', async () => {
    fixture.componentInstance.onClear();
    expect(storage.store).toHaveBeenCalledOnce();
    fixture.componentInstance.onClear();
    expect(storage.store).toHaveBeenCalledTimes(2);
    await change('style.width', 500);
    expect(image()).toMatchObject({ width: 500, height: 240, style: {} });
    await change('style.opacity', 0.5);
    expect(image().style).toEqual({ opacity: 0.5 });
  });

  it('initializes a replacement image and edits only its nested path', async () => {
    const first = structuredClone(image());
    const nested = { ...original(), src: '/nested.svg', width: 600 };
    state.setCurrentPage({ ...state.currentPage, body: [first,
      { type: 'container', elements: [nested] }] });
    await open('1.elements.0');
    expect(formly().form().get('style.width')!.value).toBe(600);
    fixture.componentInstance.onClear();
    await change('style.height', 400);
    expect(image('1.elements.0')).toMatchObject({ src: '/nested.svg', width: 600,
      height: 400, style: {} });
    expect(image()).toEqual(first);
  });

  it('ignores the old panel after page selection starts', async () => {
    state.beginPageLoad();
    const before = structuredClone(state.currentPage);
    await change('style.width', 500);
    fixture.componentInstance.onClear();
    expect(state.currentPage).toEqual(before);
  });
});
