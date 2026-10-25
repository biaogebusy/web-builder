import { TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { vi } from 'vitest';
import { UtilitiesService } from '@core/service/utilities.service';
import { provideUiuxMocks } from '@uiux/testing/mocks';
import { VideoComponent } from './video.component';

describe('VideoComponent lifecycle', () => {
  const loadStyle = vi.fn<() => Promise<void>>();
  const loadScript = vi.fn<() => Promise<void>>();
  const players: { dispose: ReturnType<typeof vi.fn>; on: ReturnType<typeof vi.fn> }[] = [];
  const createPlayer = vi.fn((element: HTMLVideoElement) => {
    const owner = element.parentElement!.hasAttribute('data-vjs-player')
      ? element.parentElement! : element;
    const player = { dispose: vi.fn(() => owner.remove()), on: vi.fn(), el: () => element };
    players.push(player);
    return player;
  });

  beforeEach(() => {
    vi.clearAllMocks();
    players.length = 0;
    loadStyle.mockResolvedValue(undefined);
    loadScript.mockResolvedValue(undefined);
    vi.stubGlobal('videojs', createPlayer);
    TestBed.configureTestingModule({
      imports: [VideoComponent, TranslateModule.forRoot()],
      providers: [...provideUiuxMocks(),
        { provide: UtilitiesService, useValue: { loadStyle, loadScript } }],
    });
  });
  afterEach(() => vi.unstubAllGlobals());

  function create() {
    const fixture = TestBed.createComponent(VideoComponent);
    fixture.componentRef.setInput('content', { type: 'video', options: { sources: [] } });
    fixture.componentRef.setInput('label', 'Introduction');
    return fixture;
  }

  it('does not initialize after destruction while the script is loading', async () => {
    let finish!: () => void;
    loadScript.mockReturnValueOnce(new Promise(resolve => { finish = resolve; }));
    const fixture = create();
    await fixture.whenStable();
    await vi.waitFor(() => expect(finish).toBeDefined());
    fixture.destroy();
    finish();
    await Promise.resolve();
    expect(createPlayer).not.toHaveBeenCalled();
  });

  it('disposes the previous player on update and isolates multiple instances', async () => {
    const first = create();
    const second = create();
    await first.whenStable();
    await second.whenStable();
    await vi.waitFor(() => expect(createPlayer).toHaveBeenCalledTimes(2));
    expect(createPlayer.mock.calls[0][0]).not.toBe(createPlayer.mock.calls[1][0]);
    expect(first.nativeElement.querySelector('video').getAttribute('aria-label'))
      .toBe('Introduction');
    first.componentRef.setInput('content', { type: 'video', options: { poster: '/poster.png' } });
    await first.whenStable();
    await vi.waitFor(() => expect(createPlayer).toHaveBeenCalledTimes(3));
    expect(first.nativeElement.querySelector('video')).not.toBeNull();
    expect(players[0].dispose).toHaveBeenCalledOnce();
    expect(players[1].dispose).not.toHaveBeenCalled();
    first.destroy();
    second.destroy();
    expect(players.every(player => player.dispose.mock.calls.length === 1)).toBe(true);
  });

  it('reports an asset failure and can retry with current inputs', async () => {
    loadScript.mockRejectedValueOnce(new Error('Offline'));
    const fixture = create();
    await fixture.whenStable();
    await vi.waitFor(() => expect(fixture.componentInstance.failed()).toBe(true));
    fixture.componentInstance.retry();
    await fixture.whenStable();
    await vi.waitFor(() => expect(createPlayer).toHaveBeenCalledOnce());
    expect(fixture.componentInstance.failed()).toBe(false);
    players[0].on.mock.calls[0][1]();
    expect(fixture.componentInstance.failed()).toBe(true);
  });
});
