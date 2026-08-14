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
  // 不能用 filter[path.alias](computed 字段,部分 Drupal 版本直接 500):
  // node--json 是核心配置节点,数量固定为个位数,列出后在前端按别名+语言匹配
  return nodeService
    .fetch(BRANDING_JSON_ENDPOINT, { 'fields[node--json]': 'langcode,path', 'page[limit]': 50 })
    .pipe(
      map((res: any) => {
        const rows = (res?.data ?? []).filter(
          (row: any) => row?.attributes?.path?.alias === BRANDING_ALIAS
        );
        const langCode = nodeService.getLang(nodeService.pageUrl)?.langCode;
        const node = rows.find((row: any) => row.attributes?.langcode === langCode) ?? rows[0];
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
