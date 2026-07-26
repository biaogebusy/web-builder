import type { FormlyFieldConfig } from '@ngx-formly/core';
import { Observable, Subject } from 'rxjs';
import { getAnimate } from './getAnimate';

function getAnimateGroup(content: any = {}): FormlyFieldConfig {
  const field = getAnimate(content);
  expect(field.props?.label).toBe('BUILDER.FACTORY.ANIMATION_TAB_LABEL');
  return field.fieldGroup?.[0] as FormlyFieldConfig;
}

function getChild(field: FormlyFieldConfig, key: string): FormlyFieldConfig {
  const child = field.fieldGroup?.find(item => item.key === key);
  if (!child) {
    throw new Error(`Missing direct child field: ${key}`);
  }
  return child;
}

function findDescendant(field: FormlyFieldConfig, key: string): FormlyFieldConfig {
  for (const child of field.fieldGroup ?? []) {
    if (child.key === key) {
      return child;
    }
    const descendant = findDescendantOrUndefined(child, key);
    if (descendant) {
      return descendant;
    }
  }
  throw new Error(`Missing descendant field: ${key}`);
}

function findDescendantOrUndefined(
  field: FormlyFieldConfig,
  key: string
): FormlyFieldConfig | undefined {
  for (const child of field.fieldGroup ?? []) {
    if (child.key === key) {
      return child;
    }
    const descendant = findDescendantOrUndefined(child, key);
    if (descendant) {
      return descendant;
    }
  }
  return undefined;
}

describe('getAnimate', () => {
  it('keeps the animate, AOS, and GSAP field grouping', () => {
    const animate = getAnimateGroup();

    expect(animate.key).toBe('animate');
    expect(animate.fieldGroup?.map(field => field.key)).toEqual(['aos', 'gsap']);
    expect(
      getChild(getChild(animate, 'aos'), 'behaviour').fieldGroup?.map(field => field.key)
    ).toEqual(['offset', 'duration', 'delay', 'easing']);
    expect(getChild(animate, 'gsap').fieldGroup?.map(field => field.key)).toEqual([
      'enable',
      'from',
      'trigger',
    ]);
  });

  it('keeps AOS defaults and nullish fallback semantics', () => {
    const aos = getChild(
      getAnimateGroup({
        animate: {
          aos: {
            enable: true,
            animation: '',
            behaviour: {
              offset: 0,
              duration: 0,
              delay: 0,
              easing: '',
            },
          },
        },
      }),
      'aos'
    );
    const behaviour = getChild(aos, 'behaviour');

    expect(getChild(aos, 'enable').defaultValue).toBe(true);
    expect(getChild(aos, 'animation').defaultValue).toBe('fade-up');
    expect(getChild(behaviour, 'offset').defaultValue).toBe(0);
    expect(getChild(behaviour, 'duration').defaultValue).toBe(0);
    expect(getChild(behaviour, 'delay').defaultValue).toBe(0);
    expect(getChild(behaviour, 'easing').defaultValue).toBe('');

    const defaultAos = getChild(getAnimateGroup(), 'aos');
    const defaultBehaviour = getChild(defaultAos, 'behaviour');
    expect(getChild(defaultAos, 'enable').defaultValue).toBe(false);
    expect(getChild(defaultAos, 'animation').defaultValue).toBe('fade-up');
    expect(getChild(defaultBehaviour, 'offset').defaultValue).toBe(120);
    expect(getChild(defaultBehaviour, 'duration').defaultValue).toBe(400);
    expect(getChild(defaultBehaviour, 'delay').defaultValue).toBe(0);
    expect(getChild(defaultBehaviour, 'easing').defaultValue).toBe('ease');
  });

  it('keeps GSAP numeric conversion including null and NaN values', () => {
    const gsap = getChild(
      getAnimateGroup({
        animate: {
          gsap: {
            from: {
              x: '12',
              y: '',
              rotationX: null,
              rotationY: 0,
              scaleX: '1.25',
              skewX: '-3',
              skewY: 'invalid',
              opacity: '0.5',
              delay: '0',
              duration: '2',
              ease: '',
            },
          },
        },
      }),
      'gsap'
    );
    const from = getChild(gsap, 'from');

    expect(findDescendant(from, 'x').defaultValue).toBe(12);
    expect(findDescendant(from, 'y').defaultValue).toBeNull();
    expect(findDescendant(from, 'rotationX').defaultValue).toBeNull();
    expect(findDescendant(from, 'rotationY').defaultValue).toBe(0);
    expect(findDescendant(from, 'scaleX').defaultValue).toBe(1.25);
    expect(findDescendant(from, 'scaleY').defaultValue).toBeNull();
    expect(findDescendant(from, 'skewX').defaultValue).toBe(-3);
    expect(findDescendant(from, 'skewY').defaultValue).toBeNaN();
    expect(findDescendant(from, 'opacity').defaultValue).toBe(0.5);
    expect(findDescendant(from, 'delay').defaultValue).toBe(0);
    expect(findDescendant(from, 'duration').defaultValue).toBe(2);
    expect(findDescendant(from, 'ease').defaultValue).toBe('');
  });

  it('keeps GSAP trigger defaults and action option order', () => {
    const gsap = getChild(
      getAnimateGroup({
        animate: {
          gsap: {
            trigger: {
              onEnter: '',
              onLeave: '',
              onEnterBack: '',
              onLeaveBack: '',
              start: '',
              end: '',
              scrub: true,
              markers: true,
            },
          },
        },
      }),
      'gsap'
    );
    const trigger = getChild(gsap, 'trigger');
    const onEnter = findDescendant(trigger, 'onEnter');
    const onLeave = findDescendant(trigger, 'onLeave');

    expect(onEnter.defaultValue).toBe('restart');
    expect(onLeave.defaultValue).toBe('pause');
    expect(findDescendant(trigger, 'onEnterBack').defaultValue).toBe('');
    expect(findDescendant(trigger, 'onLeaveBack').defaultValue).toBe('');
    expect(findDescendant(trigger, 'start').defaultValue).toBe('');
    expect(findDescendant(trigger, 'end').defaultValue).toBe('');
    expect(findDescendant(trigger, 'scrub').defaultValue).toBe(true);
    expect(findDescendant(trigger, 'markers').defaultValue).toBe(true);
    expect(onEnter.props?.options).toBe(onLeave.props?.options);
    expect((onEnter.props?.options as any[]).map(option => option.value)).toEqual([
      'restart',
      'none',
      'play',
      'pause',
      'resume',
      'reverse',
      'reset',
      'complete',
    ]);
    const nextTrigger = getChild(getChild(getAnimateGroup(), 'gsap'), 'trigger');
    expect(onEnter.props?.options).not.toBe(findDescendant(nextTrigger, 'onEnter').props?.options);
  });

  it('keeps AOS and GSAP detail groups hidden until their own mode is enabled', () => {
    const animate = getAnimateGroup();
    const aos = getChild(animate, 'aos');
    const gsap = getChild(animate, 'gsap');
    const aosAnimationHide = getChild(aos, 'animation').expressions?.hide as (
      field: FormlyFieldConfig
    ) => boolean;
    const aosBehaviourHide = getChild(aos, 'behaviour').expressions?.hide as (
      field: FormlyFieldConfig
    ) => boolean;
    const gsapFromHide = getChild(gsap, 'from').expressions?.hide as (
      field: FormlyFieldConfig
    ) => boolean;
    const gsapTriggerHide = getChild(gsap, 'trigger').expressions?.hide as (
      field: FormlyFieldConfig
    ) => boolean;
    const enabled = { parent: { model: { enable: true } } } as FormlyFieldConfig;
    const disabled = { parent: { model: { enable: false } } } as FormlyFieldConfig;

    expect(aosAnimationHide(enabled)).toBe(false);
    expect(aosBehaviourHide(disabled)).toBe(true);
    expect(gsapFromHide(enabled)).toBe(false);
    expect(gsapTriggerHide(disabled)).toBe(true);
  });

  it('keeps AOS and GSAP mutually exclusive through the existing hook', () => {
    const animate = getAnimateGroup();
    const valueChanges = new Subject<any>();
    const aosPatchValue = vi.fn();
    const gsapPatchValue = vi.fn();
    const form = {
      valueChanges,
      get: vi.fn((path: string[]) => {
        return path[1] === 'aos' ? { patchValue: aosPatchValue } : { patchValue: gsapPatchValue };
      }),
    };
    const onInit = animate.hooks?.onInit as (field: FormlyFieldConfig) => Observable<unknown>;
    const subscription = onInit({ form } as unknown as FormlyFieldConfig).subscribe();

    valueChanges.next({ animate: { aos: { enable: true }, gsap: { enable: false } } });
    expect(gsapPatchValue).toHaveBeenCalledWith(false, {
      onlySelf: true,
      emitEvent: true,
    });
    expect(aosPatchValue).not.toHaveBeenCalled();

    valueChanges.next({ animate: { aos: { enable: false }, gsap: { enable: true } } });
    expect(aosPatchValue).toHaveBeenCalledWith(false, {
      onlySelf: true,
      emitEvent: true,
    });

    subscription.unsubscribe();
  });
});
