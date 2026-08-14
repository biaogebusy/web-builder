import { map, Observable } from 'rxjs';
import type { IBranding, IFooter, IHeader } from '@core/interface/branding/IBranding';
import { NodeService } from '@core/service/node.service';

export const BRANDING_JSON_ENDPOINT = '/api/v1/node/json';

/** 品牌配置节点(node--json)的固定别名,ContentService.loadBranding 同源 */
export const BRANDING_ALIAS = '/core/branding';

/** 按别名解析品牌节点,供无 uuid 参数直接进入编辑页时补齐 uuid/langcode */
export function resolveBrandingNode(
  nodeService: NodeService
): Observable<{ uuid: string; langcode: string } | null> {
  return nodeService
    .fetch(BRANDING_JSON_ENDPOINT, { 'filter[path.alias]': BRANDING_ALIAS })
    .pipe(
      map((res: any) => {
        const node = res?.data?.[0];
        return node ? { uuid: node.id, langcode: node.attributes?.langcode ?? '' } : null;
      })
    );
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
