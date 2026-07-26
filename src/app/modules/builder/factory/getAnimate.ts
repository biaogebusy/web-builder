import { FormlyFieldConfig } from '@ngx-formly/core';
import { tap } from 'rxjs/operators';
import { getAnimateAos } from './getAnimateAos';
import { getAnimateGsap } from './getAnimateGsap';

export function getAnimate(content: any): FormlyFieldConfig {
  return {
    props: {
      label: 'BUILDER.FACTORY.ANIMATION_TAB_LABEL',
    },
    fieldGroup: [
      {
        key: 'animate',
        fieldGroupClassName: 'w-full',
        fieldGroup: [getAnimateAos(content), getAnimateGsap(content)],
        hooks: {
          onInit: (formGroup: FormlyFieldConfig) => {
            const { form } = formGroup;
            return form!.valueChanges.pipe(
              tap((value: any) => {
                const {
                  animate: { aos, gsap },
                } = value;
                if (aos?.enable) {
                  form
                    ?.get(['animate', 'gsap', 'enable'])
                    ?.patchValue(false, { onlySelf: true, emitEvent: true });
                }
                if (gsap?.enable) {
                  form
                    ?.get(['animate', 'aos', 'enable'])
                    ?.patchValue(false, { onlySelf: true, emitEvent: true });
                }
              })
            );
          },
        },
      },
    ],
  };
}
