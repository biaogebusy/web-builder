import type { ILanguage } from '@core/interface/IEnvironment';

export interface NodeLangResolutionOptions {
  pageUrl: string;
  builderLangcode?: string;
  inCanvas: boolean;
  multiLang?: boolean;
  languages?: readonly ILanguage[];
}

export function resolveNodeLangCode({
  pageUrl,
  builderLangcode,
  inCanvas,
  multiLang,
  languages,
}: NodeLangResolutionOptions): string | undefined {
  if (!multiLang || !languages?.length) {
    return undefined;
  }

  const url = inCanvas && builderLangcode ? `/${builderLangcode}` : pageUrl;
  const urlLangcode = url.split('/')[1];
  const language =
    languages.find(item => item.langCode === urlLangcode) ?? languages.find(item => item.default);

  return language?.default ? undefined : language?.langCode;
}
