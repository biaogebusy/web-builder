import { map, Observable } from 'rxjs';
import type { IBranding, IFooter, IHeader } from '@core/interface/branding/IBranding';
import { NodeService } from '@core/service/node.service';

export const BRANDING_JSON_ENDPOINT = '/api/v1/node/json';

/** 品牌配置节点(node--json)的固定别名,ContentService.loadBranding 同源 */
export const BRANDING_ALIAS = '/core/branding';

export interface IBrandingNode {
  uuid: string;
  langcode: string;
}

/** 按别名列出全部品牌节点(每语言一个),供直接进入时解析与语言切换器共用 */
export function listBrandingNodes(nodeService: NodeService): Observable<IBrandingNode[]> {
  // 不能用 filter[path.alias](computed 字段,部分 Drupal 版本直接 500):
  // node--json 是核心配置节点,数量固定为个位数,列出后在前端按别名匹配
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

/** 挑目标语言的品牌节点,无匹配回退第一个(单语言部署只有一个) */
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
