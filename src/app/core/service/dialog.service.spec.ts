import { DOCUMENT, PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { DialogService } from '@core/service/dialog.service';

describe('DialogService', () => {
  const setup = (options: {
    platform?: 'browser' | 'server';
    referrer?: string;
    pathname?: string;
  } = {}) => {
    const { platform = 'browser', referrer = '', pathname = '/' } = options;
    const dialogMock = { open: vi.fn(), closeAll: vi.fn() };
    const fakeDoc = {
      referrer,
      location: { pathname },
    };
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        DialogService,
        { provide: MatDialog, useValue: dialogMock },
        { provide: PLATFORM_ID, useValue: platform },
        { provide: DOCUMENT, useValue: fakeDoc },
      ],
    });
    return { service: TestBed.inject(DialogService), dialogMock };
  };

  afterEach(() => {
    vi.restoreAllMocks();
    TestBed.resetTestingModule();
  });

  describe('closeDialog', () => {
    it('emits false on dialogState$', () => {
      const { service } = setup();
      const observer = vi.fn();
      service.dialogState$.subscribe(observer);

      service.closeDialog();

      expect(observer).toHaveBeenCalledWith(false);
    });
  });

  describe('openDialog', () => {
    it('opens the DialogComponent with forced-dialog styling and the text content', () => {
      const { service, dialogMock } = setup();
      const config = {
        text: { body: [{ type: 'text-1v1' }] },
        params: { width: '420px' },
      };

      service.openDialog(config);

      expect(dialogMock.open).toHaveBeenCalledTimes(1);
      const [component, dialogConfig] = dialogMock.open.mock.calls[0];
      expect(component.name).toBe('DialogComponent');
      expect(dialogConfig.width).toBe('420px');
      expect(dialogConfig.disableClose).toBe(true);
      expect(dialogConfig.hasBackdrop).toBe(true);
      expect(dialogConfig.panelClass).toBe('force-dialog');
      expect(dialogConfig.backdropClass).toBe('force-backdrop');
      expect(dialogConfig.data).toEqual({
        disableActions: true,
        inputData: { content: config.text },
      });
    });
  });

  describe('openDynamicDialog', () => {
    it('opens the DialogComponent spreading params and passing the content array', () => {
      const { service, dialogMock } = setup();
      const content = [{ type: 'form-1v1' }];
      const config = {
        content,
        params: { width: '600px', disableClose: true, autoFocus: false },
      };

      service.openDynamicDialog(config);

      const [component, dialogConfig] = dialogMock.open.mock.calls[0];
      expect(component.name).toBe('DialogComponent');
      expect(dialogConfig.width).toBe('600px');
      expect(dialogConfig.disableClose).toBe(true);
      expect(dialogConfig.autoFocus).toBe(false);
      expect(dialogConfig.data).toEqual({ inputData: content });
    });
  });

  describe('openForcedDialog', () => {
    it('opens on first visit (no referrer) when no path filter is configured', () => {
      const { service, dialogMock } = setup({ referrer: '' });
      service.openForcedDialog({
        text: {},
        params: { first: true },
      });
      expect(dialogMock.open).toHaveBeenCalledTimes(1);
    });

    it('does not open for returning visitors with first-only config', () => {
      const { service, dialogMock } = setup({ referrer: 'https://elsewhere.example/' });
      service.openForcedDialog({
        text: {},
        params: { first: true },
      });
      expect(dialogMock.open).not.toHaveBeenCalled();
    });

    it('opens when the current path contains the configured path filter', () => {
      const { service, dialogMock } = setup({ pathname: '/blog/post-1' });
      service.openForcedDialog({
        text: {},
        params: { path: '/blog' },
      });
      expect(dialogMock.open).toHaveBeenCalledTimes(1);
    });

    it('does not open when the path filter does not match the current path', () => {
      const { service, dialogMock } = setup({ pathname: '/blog/post-1' });
      service.openForcedDialog({
        text: {},
        params: { path: '/shop' },
      });
      expect(dialogMock.open).not.toHaveBeenCalled();
    });

    it('opens unconditionally when neither first nor path is configured', () => {
      const { service, dialogMock } = setup();
      service.openForcedDialog({
        text: {},
        params: {},
      });
      expect(dialogMock.open).toHaveBeenCalledTimes(1);
    });

    it('still checks the path filter for returning visitors', () => {
      const { service, dialogMock } = setup({
        referrer: 'https://elsewhere.example/',
        pathname: '/blog/post-1',
      });
      service.openForcedDialog({
        text: {},
        params: { path: '/blog' },
      });
      expect(dialogMock.open).toHaveBeenCalledTimes(1);
    });

    it('blocks returning visitors even when the path filter matches', () => {
      // The first-visit gate takes precedence over the path filter.
      const { service, dialogMock } = setup({
        referrer: 'https://elsewhere.example/',
        pathname: '/blog/post-1',
      });
      service.openForcedDialog({
        text: {},
        params: { first: true, path: '/blog' },
      });
      expect(dialogMock.open).not.toHaveBeenCalled();
    });

    it('opens for first-time visitors when the path filter matches', () => {
      const { service, dialogMock } = setup({
        referrer: '',
        pathname: '/blog/post-1',
      });
      service.openForcedDialog({
        text: {},
        params: { first: true, path: '/blog' },
      });
      expect(dialogMock.open).toHaveBeenCalledTimes(1);
    });

    it('does not open for first-time visitors when the path filter misses', () => {
      const { service, dialogMock } = setup({
        referrer: '',
        pathname: '/blog/post-1',
      });
      service.openForcedDialog({
        text: {},
        params: { first: true, path: '/shop' },
      });
      expect(dialogMock.open).not.toHaveBeenCalled();
    });
  });

  describe('handleIframe', () => {
    const dispatchMessage = (origin: string, data: unknown) => {
      window.dispatchEvent(
        new MessageEvent('message', { origin, data: data as never })
      );
    };

    it('does not register a message listener on the server', () => {
      const { service } = setup({ platform: 'server' });
      const addSpy = vi.spyOn(window, 'addEventListener');

      service.handleIframe({ closeAll: vi.fn() } as never);

      expect(addSpy).not.toHaveBeenCalledWith('message', expect.anything(), false);
    });

    it('closes all dialogs when receiving a same-origin closeDialog message', () => {
      const { service } = setup({ platform: 'browser' });
      const dialog = { closeAll: vi.fn() };
      service.handleIframe(dialog as never);

      dispatchMessage(window.location.origin, 'closeDialog');

      expect(dialog.closeAll).toHaveBeenCalledTimes(1);
    });

    it('ignores messages from other origins', () => {
      const { service } = setup({ platform: 'browser' });
      const dialog = { closeAll: vi.fn() };
      service.handleIframe(dialog as never);

      dispatchMessage('https://evil.example', 'closeDialog');

      expect(dialog.closeAll).not.toHaveBeenCalled();
    });

    it('ignores same-origin messages with other payloads', () => {
      const { service } = setup({ platform: 'browser' });
      const dialog = { closeAll: vi.fn() };
      service.handleIframe(dialog as never);

      dispatchMessage(window.location.origin, 'openDialog');

      expect(dialog.closeAll).not.toHaveBeenCalled();
    });
  });
});
