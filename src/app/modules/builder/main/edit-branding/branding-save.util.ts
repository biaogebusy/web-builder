import { map, Observable } from 'rxjs';
import type { IBranding, IFooter, IHeader } from '@core/interface/branding/IBranding';
import { NodeService } from '@core/service/node.service';

export const BRANDING_JSON_ENDPOINT = '/api/v1/node/json';

/** Fixed alias of the branding config node (node--json), same source as ContentService.loadBranding */
export const BRANDING_ALIAS = '/core/branding';

export interface IBrandingNode {
  uuid: string;
  langcode: string;
}

/** List all branding nodes by alias (one per language), shared by direct-entry resolution and the language switcher */
export function listBrandingNodes(nodeService: NodeService): Observable<IBrandingNode[]> {
  // Cannot use filter[path.alias] (a computed field; some Drupal versions 500
  // on it): node--json is a core config node fixed at a handful of entries, so
  // list them and match by alias on the frontend.
  return nodeService
    .fetch(BRANDING_JSON_ENDPOINT, { 'fields[node--json]': 'langcode,path', 'page[limit]': 50 })
    .pipe(
      map((res: any) =>
        (res?.data ?? [])
          .filter((row: any) => row?.attributes?.path?.alias === BRANDING_ALIAS)
          .map((row: any) => ({ uuid: row.id, langcode: row.attributes?.langcode ?? '' }))
      )
    );
}

/** Pick the branding node for the target language; fall back to the first when unmatched (single-language deployments have only one) */
export function pickBrandingNode(
  nodes: IBrandingNode[],
  langcode: string | undefined
): IBrandingNode | null {
  return nodes.find(node => node.langcode === langcode) ?? nodes[0] ?? null;
}

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
