import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconTestingModule } from '@angular/material/icon/testing';
import type { IPage } from '@core/interface/IAppConfig';
import { BuilderService } from '@core/service/builder.service';
import { createBuilderServiceMock } from '@core/testing/mocks';
import { provideBuilderMocks } from '@modules/builder/testing/mocks';
import { Subject, of, throwError } from 'rxjs';

import {
  RevisionDiffComponent,
  toRevisionDiffText,
  type IRevisionDiffData,
} from './revision-diff.component';

describe('RevisionDiffComponent', () => {
  let component: RevisionDiffComponent;
  let fixture: ComponentFixture<RevisionDiffComponent>;
  const builderService = createBuilderServiceMock();

  const data: IRevisionDiffData = {
    nid: '12',
    langcode: 'zh-hans',
    title: '首页',
    original: { vid: '28', time: 1740140000000 },
    modified: { vid: '29', time: 1740226733000 },
  };

  // Shape of the revision endpoint: page metadata plus body blocks in their JSON:API envelope
  const page = (title: string, vid = '28') =>
    ({
      status: true,
      message: '',
      title,
      nid: '12',
      uuid: 'page-uuid',
      vid,
      changed: '1740140000',
      current: false,
      body: [
        {
          uuid: `block-${vid}`,
          id: `json--${vid}`,
          type: 'json',
          attributes: { body: { type: 'hero-1v1', title } },
        },
      ],
    }) as any;

  beforeEach(async () => {
    vi.clearAllMocks();
    builderService.getPageRevision.mockReset();
    builderService.getPageRevision
      .mockReturnValueOnce(of(page('Old', '28')))
      .mockReturnValueOnce(of(page('New', '29')));
    await TestBed.configureTestingModule({
      imports: [RevisionDiffComponent, MatIconTestingModule],
      providers: [
        ...provideBuilderMocks(),
        { provide: BuilderService, useValue: builderService },
        { provide: MAT_DIALOG_DATA, useValue: data },
        { provide: MatDialogRef, useValue: { close: vi.fn() } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RevisionDiffComponent);
    component = fixture.componentInstance;
  });

  it('fetches the pair it was opened for and keeps the older revision on the left', () => {
    fixture.detectChanges();

    expect(builderService.getPageRevision).toHaveBeenNthCalledWith(1, {
      nid: '12',
      langcode: 'zh-hans',
      vid: '28',
    });
    expect(builderService.getPageRevision).toHaveBeenNthCalledWith(2, {
      nid: '12',
      langcode: 'zh-hans',
      vid: '29',
    });
    expect(component.loading()).toBe(false);
    expect(component.models()?.original.code).toContain('"Old"');
    expect(component.models()?.modified.code).toContain('"New"');
  });

  it('reports a failed request instead of rendering half a diff', () => {
    builderService.getPageRevision.mockReset();
    builderService.getPageRevision.mockReturnValue(throwError(() => new Error('offline')));

    fixture.detectChanges();

    expect(component.error()).toBe(true);
    expect(component.models()).toBeNull();
  });

  it('treats a rejected payload as an error', () => {
    builderService.getPageRevision.mockReset();
    builderService.getPageRevision.mockReturnValue(of({ status: false, message: 'gone' }));

    fixture.detectChanges();

    expect(component.error()).toBe(true);
  });

  // An empty side-by-side view looks broken, so the identical case is called out in words
  it('flags a pair whose content is the same', () => {
    builderService.getPageRevision.mockReset();
    builderService.getPageRevision.mockReturnValue(of(page('Same')));

    fixture.detectChanges();

    expect(component.identical()).toBe(true);
  });

  it('reports differing content as a real diff', () => {
    fixture.detectChanges();

    expect(component.identical()).toBe(false);
  });

  describe('pending revision reads', () => {
    let left: Subject<IPage>;
    let right: Subject<IPage>;

    beforeEach(async () => {
      left = new Subject<IPage>();
      right = new Subject<IPage>();
      builderService.getPageRevision.mockReset();
      builderService.getPageRevision.mockReturnValueOnce(left).mockReturnValueOnce(right);
      await fixture.whenStable();
    });

    it.each(['left', 'right'])('keeps loading after only the %s side completes', async side => {
      const root: HTMLElement = fixture.nativeElement;
      expect(root.querySelector('[role="status"]')?.getAttribute('aria-label'))
        .toBe('APP.LOADING');
      expect(root.querySelector('app-spinner mat-progress-spinner svg')).not.toBeNull();
      expect(root.querySelector('ngx-monaco-diff-editor')).toBeNull();

      const first = side === 'left' ? left : right;
      const second = side === 'left' ? right : left;
      first.next(page('First'));
      first.complete();
      await fixture.whenStable();

      expect(component.loading()).toBe(true);
      expect(component.models()).toBeNull();
      expect(root.querySelector('app-spinner mat-progress-spinner svg')).not.toBeNull();
      expect(root.querySelector('ngx-monaco-diff-editor')).toBeNull();

      second.next(page('Second'));
      second.complete();
      await fixture.whenStable();

      expect(component.loading()).toBe(false);
      expect(component.error()).toBe(false);
      expect(component.models()?.original.code).toContain(side === 'left' ? 'First' : 'Second');
      expect(component.models()?.modified.code).toContain(side === 'left' ? 'Second' : 'First');
      expect(root.querySelector('[role="status"]')).toBeNull();
      expect(root.querySelector('ngx-monaco-diff-editor')).not.toBeNull();
    });

    it.each(['request', 'payload'])('retries a failed %s with a new pair', async failure => {
      if (failure === 'request') {
        left.error(new Error('offline'));
      } else {
        left.next({ status: false } as IPage);
        left.complete();
        right.next(page('Rejected pair'));
        right.complete();
      }
      await fixture.whenStable();
      const root: HTMLElement = fixture.nativeElement;
      expect(component.loading()).toBe(false);
      expect(component.error()).toBe(true);
      expect(component.models()).toBeNull();
      expect(right.observed).toBe(false);
      expect(root.textContent).toContain('BUILDER.REVISION.COMPARE_FAIL');
      expect(root.querySelector('app-spinner')).toBeNull();

      const retryLeft = new Subject<IPage>();
      const retryRight = new Subject<IPage>();
      builderService.getPageRevision
        .mockReturnValueOnce(retryLeft).mockReturnValueOnce(retryRight);
      root.querySelector<HTMLButtonElement>('.diff-state app-btn button')!.click();
      await fixture.whenStable();

      expect(builderService.getPageRevision).toHaveBeenCalledTimes(4);
      expect(component.error()).toBe(false);
      expect(root.textContent).not.toContain('BUILDER.REVISION.COMPARE_FAIL');
      expect(root.querySelector('[role="status"]')).not.toBeNull();
      expect(root.querySelector('app-spinner mat-progress-spinner svg')).not.toBeNull();
      retryRight.next(page('Retry right'));
      retryRight.complete();
      await fixture.whenStable();
      expect(component.models()).toBeNull();
      expect(component.loading()).toBe(true);
      retryLeft.next(page('Retry left'));
      retryLeft.complete();
      await fixture.whenStable();

      expect(component.loading()).toBe(false);
      expect(component.models()?.original.code).toContain('Retry left');
      expect(component.models()?.modified.code).toContain('Retry right');
    });

    it('unsubscribes both pending reads when the dialog is destroyed', () => {
      expect(left.observed).toBe(true);
      expect(right.observed).toBe(true);
      fixture.destroy();

      expect(left.observed).toBe(false);
      expect(right.observed).toBe(false);
      left.next(page('Late left'));
      left.complete();
      right.next(page('Late right'));
      right.complete();
      expect(component.models()).toBeNull();
    });
  });

  // Revision metadata differs between any two revisions and every save writes new block ids
  it('leaves revision metadata and block envelopes out of the compared text', () => {
    const parsed = JSON.parse(toRevisionDiffText(page('Home | Xinshi')));

    expect(parsed).not.toHaveProperty('vid');
    expect(parsed).not.toHaveProperty('changed');
    expect(parsed).not.toHaveProperty('uuid');
    expect(parsed).not.toHaveProperty('status');
    expect(parsed).not.toHaveProperty('current');
    expect(parsed.title).toBe('Home');
    expect(parsed.body).toEqual([{ type: 'hero-1v1', title: 'Home | Xinshi' }]);
  });
});
