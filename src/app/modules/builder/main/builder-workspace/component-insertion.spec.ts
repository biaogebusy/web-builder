import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MatIconTestingModule } from '@angular/material/icon/testing';
import { provideRouter } from '@angular/router';
import { BuilderState } from '@core/state/BuilderState';
import { ScreenService } from '@core/service/screen.service';
import { IBuilderShowcase } from '@core/interface/IBuilder';
import { provideBuilderMocks } from '@modules/builder/testing/mocks';
import { LocalStorageService, withNgxWebstorageConfig } from 'ngx-webstorage';
import { BuilderPanelComponent } from '../../sidebar/builder-panel/builder-panel.component';
import { BuilderShowcaseComponent } from '../builder-showcase/builder-showcase.component';
import { BuilderWorkspaceComponent } from './builder-workspace.component';

describe('component insertion with the workspace and real draft state', () => {
  let fixture: ComponentFixture<BuilderWorkspaceComponent>;
  let state: BuilderState;
  let panel: BuilderPanelComponent;
  let showcase: BuilderShowcaseComponent;
  const storage = { retrieve: vi.fn(), store: vi.fn() };
  const preview = (title: string): IBuilderShowcase => ({ title,
    card: { type: 'card-1v1', components: [{ type: 'text', content: { type: 'text' } }] } });
  const widget = { type: 'text', body: '<p>Inserted</p>' };
  const targets: HTMLElement[] = [];

  const target = (index = 1) => {
    const element = document.createElement('div');
    element.id = `item-${index}`;
    element.scrollIntoView = vi.fn();
    document.body.append(element);
    targets.push(element);
    return element;
  };

  beforeEach(async () => {
    vi.useFakeTimers();
    storage.store.mockClear();
    storage.retrieve.mockImplementation(key => key === 'version' ? [
      { title: 'First', body: [{ type: 'text' }], current: true },
      { title: 'Second', body: [{ type: 'text' }], current: false },
    ] : null);
    await TestBed.configureTestingModule({
      imports: [BuilderWorkspaceComponent, MatIconTestingModule],
      providers: [
        provideRouter([]), ...provideBuilderMocks(), BuilderState, ScreenService,
        ...withNgxWebstorageConfig({ separator: ':', caseSensitive: true }).providers,
        { provide: LocalStorageService, useValue: storage },
      ],
    }).overrideComponent(BuilderWorkspaceComponent, { set: {
      imports: [BuilderPanelComponent, BuilderShowcaseComponent],
      template: `<app-builder-panel />
        @if (builder.currentShowcase(); as content) {
          <app-builder-showcase [content]="content" />
        }`,
    } }).compileComponents();
    state = TestBed.inject(BuilderState);
    state.currentShowcase.set(preview('First preview'));
    fixture = TestBed.createComponent(BuilderWorkspaceComponent);
    fixture.detectChanges();
    panel = fixture.debugElement.query(By.directive(BuilderPanelComponent)).componentInstance;
    showcase = fixture.debugElement.query(By.directive(BuilderShowcaseComponent)).componentInstance;
    storage.store.mockClear();
  });

  afterEach(() => {
    fixture?.destroy();
    TestBed.resetTestingModule();
    targets.splice(0).forEach(element => element.remove());
    vi.useRealTimers();
  });

  for (const entry of ['panel', 'showcase'] as const) {
    const delay = entry === 'panel' ? 500 : 200;
    const insert = () => entry === 'panel' ? panel.add(widget) : showcase.insert(widget);

    it(`${entry}: saves immediately and preserves the normal reveal after closing its own preview`, () => {
      const element = target();
      insert();
      expect(state.currentPage.body).toHaveLength(2);
      expect(storage.store).toHaveBeenCalledOnce();
      vi.advanceTimersByTime(delay - 1);
      expect(state.currentShowcase()).not.toBe(false);
      vi.advanceTimersByTime(1);
      fixture.detectChanges();
      if (entry === 'showcase') expect(state.currentShowcase()).toBe(false);
      expect(element.scrollIntoView).not.toHaveBeenCalled();
      vi.advanceTimersByTime(100);
      expect(element.scrollIntoView).toHaveBeenCalledOnce();
      expect(storage.store).toHaveBeenCalledOnce();
    });

    for (const change of ['local', 'remote', 'destroy'] as const) {
      it(`${entry}: cancels delayed work after ${change}`, () => {
        const element = target();
        insert();
        const nextPreview = preview('New preview');
        if (change === 'local') state.showVersionPage(1);
        if (change === 'remote') state.beginPageLoad();
        if (change === 'destroy') fixture.destroy();
        state.currentShowcase.set(nextPreview);
        vi.advanceTimersByTime(700);
        expect(element.scrollIntoView).not.toHaveBeenCalled();
        expect(state.currentShowcase()).toBe(nextPreview);
        expect(state.version()[0].body).toHaveLength(2);
      });
    }

    it(`${entry}: cancels an anchor search before a new page supplies the same id`, () => {
      insert();
      vi.advanceTimersByTime(delay);
      fixture.detectChanges();
      state.beginPageLoad();
      const replacement = target();
      vi.advanceTimersByTime(6000);
      expect(replacement.scrollIntoView).not.toHaveBeenCalled();
    });

    it(`${entry}: cancels the final scroll delay on workspace destruction`, () => {
      const element = target();
      insert();
      vi.advanceTimersByTime(delay);
      fixture.detectChanges();
      fixture.destroy();
      vi.advanceTimersByTime(100);
      expect(element.scrollIntoView).not.toHaveBeenCalled();
    });

    it(`${entry}: retains every insertion but reveals only the latest one`, () => {
      const first = target(1);
      const last = target(2);
      insert();
      vi.advanceTimersByTime(50);
      insert();
      vi.advanceTimersByTime(delay + 100);
      expect(state.currentPage.body).toHaveLength(3);
      expect(storage.store).toHaveBeenCalledTimes(2);
      expect(first.scrollIntoView).not.toHaveBeenCalled();
      expect(last.scrollIntoView).toHaveBeenCalledOnce();
    });

    it(`${entry}: preserves the original target through ordinary edits and invalid selection`, () => {
      const inserted = target(1);
      const later = target(2);
      insert();
      state.showVersionPage(-1);
      state.setCurrentPage({ ...state.currentPage, title: 'Edited',
        body: [...state.currentPage.body, { type: 'text' }] });
      fixture.detectChanges();
      vi.advanceTimersByTime(delay + 100);
      expect(inserted.scrollIntoView).toHaveBeenCalledOnce();
      expect(later.scrollIntoView).not.toHaveBeenCalled();
    });
  }

  it.each(['replace', 'reopen'])('keeps a new preview after %s during the insertion delay', change => {
    const element = target();
    showcase.insert(widget);
    if (change === 'reopen') {
      state.currentShowcase.set(false);
      fixture.detectChanges();
    }
    const next = preview('Next preview');
    state.currentShowcase.set(next);
    fixture.detectChanges();
    vi.advanceTimersByTime(300);
    expect(state.currentShowcase()).toBe(next);
    expect(element.scrollIntoView).not.toHaveBeenCalled();
  });

  it('cancels an anchor search when another preview opens after normal closure', () => {
    showcase.insert(widget);
    vi.advanceTimersByTime(200);
    fixture.detectChanges();
    expect(state.currentShowcase()).toBe(false);
    const next = preview('Next preview');
    state.currentShowcase.set(next);
    fixture.detectChanges();
    const element = target();
    vi.advanceTimersByTime(6000);
    expect(element.scrollIntoView).not.toHaveBeenCalled();
    expect(state.currentShowcase()).toBe(next);
  });

  it('shares the latest reveal across the two insertion controls', () => {
    const first = target(1);
    const last = target(2);
    showcase.insert(widget);
    vi.advanceTimersByTime(50);
    panel.add(widget);
    vi.advanceTimersByTime(600);
    expect(state.currentPage.body).toHaveLength(3);
    expect(storage.store).toHaveBeenCalledTimes(2);
    expect(first.scrollIntoView).not.toHaveBeenCalled();
    expect(last.scrollIntoView).toHaveBeenCalledOnce();
  });
});
