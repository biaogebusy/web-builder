import type { IBranding, IFooter, IHeader } from '@core/interface/branding/IBranding';

export const BRANDING_JSON_ENDPOINT = '/api/v1/node/json';

export function canSaveBranding(
  dirty: boolean,
  loading: boolean,
  saving: boolean,
  hasConfig: boolean
): boolean {
  return dirty && !loading && !saving && hasConfig;
}

export function buildBrandingUpdateBody(
  branding: IBranding,
  section: 'header',
  value: IHeader
): { body: string };
export function buildBrandingUpdateBody(
  branding: IBranding,
  section: 'footer',
  value: IFooter
): { body: string };
export function buildBrandingUpdateBody(
  branding: IBranding,
  section: 'header' | 'footer',
  value: IHeader | IFooter
): { body: string } {
  const updatedBranding =
    section === 'header' ? { ...branding, header: value } : { ...branding, footer: value };

  return { body: JSON.stringify(updatedBranding) };
}
