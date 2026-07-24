import type { ILanguage } from '@core/interface/IEnvironment';

export function getLangPrefix(lang?: Pick<ILanguage, 'langCode' | 'default'>): string {
  return lang && !lang.default ? `/${lang.langCode}` : '';
}
