import type { FormlyFieldConfig } from '@ngx-formly/core';
import { getHeroText } from './getHeroText';

/** Build settings for the hero-2v1 component. */
export function getHero2v1(widget: any): FormlyFieldConfig {
  return getHeroText(widget, 'hero-2v1');
}
