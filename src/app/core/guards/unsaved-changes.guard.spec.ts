import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { unsavedChangesGuard, HasUnsavedChanges } from '@core/guards/unsaved-changes.guard';
import { firstValueFrom, of } from 'rxjs';

describe('unsavedChangesGuard', () => {
  const createComponent = (dirty: boolean): HasUnsavedChanges => ({
    hasUnsavedChanges: vi.fn(() => dirty),
  });

  const setup = (dialogResult: unknown = undefined) => {
    const dialogRef = {
      afterClosed: vi.fn(() => of(dialogResult)),
    } as unknown as MatDialogRef<unknown, unknown>;
    const dialog = { open: vi.fn(() => dialogRef) };

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [{ provide: MatDialog, useValue: dialog }],
    });

    return {
      dialog,
      run: async (component: HasUnsavedChanges) => {
        return TestBed.runInInjectionContext(() => {
          const guard = unsavedChangesGuard as CanDeactivateFn<HasUnsavedChanges>;
          const result = guard(component, null as never, null as never, null as never);
          if (typeof result === 'boolean') {
            return Promise.resolve(result);
          }
          return firstValueFrom(result as any);
        });
      },
    };
  };

  afterEach(() => {
    vi.restoreAllMocks();
    TestBed.resetTestingModule();
  });

  it('allows navigation immediately when there are no unsaved changes', async () => {
    const { run } = setup();
    const component = createComponent(false);

    expect(await run(component)).toBe(true);
    expect(component.hasUnsavedChanges).toHaveBeenCalled();
  });

  it('opens a confirmation dialog when there are unsaved changes', async () => {
    const { run, dialog } = setup(true);
    await run(createComponent(true));

    expect(dialog.open).toHaveBeenCalledTimes(1);
    const [comp, config] = (dialog.open as ReturnType<typeof vi.fn>).mock.calls[0];
    expect(comp.name).toBe('DialogComponent');
    expect(config.width).toBe('360px');
    expect(config.data.title).toBe('未保存的更改');
    expect(config.data.yesLabel).toBe('离开');
    expect(config.data.noLabel).toBe('留下');
    expect(config.data.inputData.content.body).toContain('未保存的更改');
  });

  it('resolves to true when the user confirms leaving', async () => {
    const { run } = setup(true);
    expect(await run(createComponent(true))).toBe(true);
  });

  it('resolves to false when the user cancels (falsy dialog result)', async () => {
    const { run } = setup(false);
    expect(await run(createComponent(true))).toBe(false);
  });

  it('resolves to false when the dialog is dismissed without a result', async () => {
    const { run } = setup(undefined);
    expect(await run(createComponent(true))).toBe(false);
  });
});
