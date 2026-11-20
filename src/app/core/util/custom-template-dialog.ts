import type { ICustomTemplateDialog } from '@core/interface/IBuilder';
import type { IDialog } from '@core/interface/IDialog';

/** Build the same dialog configuration for a template and its editor preview. */
export function buildCustomTemplateDialogConfig(config: ICustomTemplateDialog) {
  const inputData = Array.isArray(config.content) ? config.content : { content: config.content };
  const data: IDialog = { disableActions: true, inputData };
  const rawPanelClass = config.params?.panelClass;
  const panelClass = Array.isArray(rawPanelClass)
    ? rawPanelClass
    : typeof rawPanelClass === 'string' && rawPanelClass.trim()
      ? rawPanelClass.trim().split(/\s+/)
      : ['close-outside', 'dialog-p-0'];
  return {
    width: config.params?.width || 'auto',
    height: config.params?.height || 'auto',
    ...config.params,
    panelClass,
    data,
  };
}
