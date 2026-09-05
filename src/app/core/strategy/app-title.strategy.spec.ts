import { TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { AppTitleStrategy } from './app-title.strategy';

function stateOf(dataChain: (Record<string, unknown> | undefined)[]): RouterStateSnapshot {
  const chain = dataChain.map(data => ({ data }));
  chain.forEach((route, i) => {
    (route as any).firstChild = chain[i + 1] ?? null;
  });
  return { root: chain[0] } as unknown as RouterStateSnapshot;
}

describe('AppTitleStrategy', () => {
  let strategy: AppTitleStrategy;
  let setTitle: ReturnType<typeof vi.fn>;
  let get: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    setTitle = vi.fn();
    get = vi.fn(() => new Subject<string>());
    TestBed.configureTestingModule({
      providers: [
        AppTitleStrategy,
        { provide: Title, useValue: { setTitle } },
        { provide: TranslateService, useValue: { get } },
      ],
    });
    strategy = TestBed.inject(AppTitleStrategy);
  });

  it('sets the translated title for a route with titleKey', () => {
    strategy.updateTitle(stateOf([{ titleKey: 'BUILDER.HUB.PAGE_TITLE' }]));
    (get.mock.results[0].value as Subject<string>).next('管理中心');
    expect(setTitle).toHaveBeenCalledWith('管理中心');
  });

  it('keeps the current title when no route declares a titleKey', () => {
    strategy.updateTitle(stateOf([{}]));
    expect(get).not.toHaveBeenCalled();
    expect(setTitle).not.toHaveBeenCalled();
  });

  it('lets the deepest route win over its parents', () => {
    strategy.updateTitle(
      stateOf([{ titleKey: 'BUILDER.WORKSPACE.PAGE_TITLE' }, { titleKey: 'BUILDER.HUB.PAGE_TITLE' }])
    );
    expect(get).toHaveBeenCalledWith('BUILDER.HUB.PAGE_TITLE');
  });

  it('ignores a stale translation that lands after a newer navigation', () => {
    const first$ = new Subject<string>();
    const second$ = new Subject<string>();
    get.mockReturnValueOnce(first$).mockReturnValueOnce(second$);

    strategy.updateTitle(stateOf([{ titleKey: 'a' }]));
    strategy.updateTitle(stateOf([{ titleKey: 'b' }]));
    first$.next('stale');

    expect(setTitle).not.toHaveBeenCalledWith('stale');
    second$.next('fresh');
    expect(setTitle).toHaveBeenCalledWith('fresh');
  });
});
