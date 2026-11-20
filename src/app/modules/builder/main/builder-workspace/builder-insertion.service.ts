import { DestroyRef, Injectable, effect, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IBuilderShowcase } from '@core/interface/IBuilder';
import { ScreenService } from '@core/service/screen.service';
import { BuilderState } from '@core/state/BuilderState';

/** Keeps insertion reveals within their workspace, page selection and preview. */
@Injectable()
export class BuilderInsertionService {
  private builder = inject(BuilderState);
  private screen = inject(ScreenService);
  private destroyRef = inject(DestroyRef);
  private pending?: { preview: IBuilderShowcase | false | undefined; cancel: () => void };

  constructor() {
    this.destroyRef.onDestroy(() => this.pending?.cancel());
    this.builder.pageSelection$.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.pending?.cancel());
    effect(() => {
      const preview = this.builder.currentShowcase();
      if (this.pending?.preview !== undefined && this.pending.preview !== preview) {
        this.pending.cancel();
      }
    });
  }

  /** Reveal the last inserted item; a supplied preview closes only while it still owns the task. */
  reveal(index: number, delay: number, owner: DestroyRef, preview?: IBuilderShowcase): void {
    this.pending?.cancel();
    let cancelScroll: (() => void) | undefined;
    const task = {
      preview: preview as IBuilderShowcase | false | undefined,
      cancel: () => {
        clearTimeout(timer);
        cancelScroll?.();
        releaseOwner?.();
        if (this.pending === task) this.pending = undefined;
      },
    };
    let releaseOwner: (() => void) | undefined = owner.onDestroy(task.cancel);
    const timer = setTimeout(() => {
      // Check synchronously as well as in the effect, before touching the canvas or preview.
      if (preview && this.builder.currentShowcase() !== preview) {
        task.cancel();
        return;
      }
      cancelScroll = this.screen.scrollToAnchor(`item-${index}`);
      if (preview) {
        // Normal closure destroys the preview; the workspace still owns its pending scroll.
        releaseOwner?.();
        releaseOwner = undefined;
        task.preview = false;
        this.builder.cancelFixedShowcase();
      }
    }, delay);
    this.pending = task;
  }
}
