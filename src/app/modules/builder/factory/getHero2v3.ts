import type { FormlyFieldConfig } from '@ngx-formly/core';
import { getHeroText } from './getHeroText';

/** Build settings for the hero-2v3 component. */
export function getHero2v3(widget: any): FormlyFieldConfig {
  return getHeroText(widget, 'hero-2v3');
}
