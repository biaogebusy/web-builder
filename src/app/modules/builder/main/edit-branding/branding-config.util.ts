import type { IFooter, IHeader, IMainMenu } from '@core/interface/branding/IBranding';

interface HeaderLogoValue {
  label: string;
  href: string;
  version: boolean;
  invert?: string;
  src: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
}

interface HeaderActionsValue {
  actions?: IHeader['actions'];
}

export interface HeaderTopValue {
  left?: { svg?: string; label?: string }[];
  right?: { label?: string; svg?: string; href?: string }[];
}

interface FooterBrandValue {
  src: string;
  alt?: string;
  href?: string;
  classes?: string;
  summary?: string;
}

interface FooterSocialValue {
  social?: NonNullable<IFooter['footerBrand']>['social'];
}

interface FooterNewsletterValue {
  webform_id: string;
  label: string;
  summary: string;
  actionLabel: string;
}

interface FooterBottomValue {
  left: string;
  right?: NonNullable<IFooter['footerBottom']>['right'];
}

export interface FooterFixBarValue {
  fixBar?: NonNullable<IFooter['fixBar']>;
}

export interface FooterDynamicValue {
  enabled: boolean;
  classes: string;
  html: string;
}

export function buildHeaderConfig(
  header: IHeader,
  paramsValue: Partial<IHeader['params']>,
  logoValue: HeaderLogoValue,
  menuItems: IMainMenu[],
  searchValue: Partial<IHeader['search']>,
  actionsValue: HeaderActionsValue,
  topValue?: HeaderTopValue
): IHeader {
  const logo = {
    ...header.logo,
    label: logoValue.label,
    href: logoValue.href,
    version: logoValue.version,
    invert: logoValue.invert,
    img: {
      ...(header.logo?.img ?? {}),
      src: logoValue.src,
      alt: logoValue.alt,
      width: Number(logoValue.width),
      height: Number(logoValue.height),
    },
  };

  const result: IHeader = {
    ...header,
    params: { ...header.params, ...paramsValue },
    logo,
    mainMenu: menuItems,
    search: { ...header.search, ...searchValue },
    actions: actionsValue.actions ?? header.actions ?? [],
  };

  if (topValue) {
    const left = (topValue.left ?? [])
      .filter(row => row.label || row.svg)
      .map(row => ({ icon: { svg: row.svg ?? '', inline: true }, label: row.label ?? '' }));
    const right = (topValue.right ?? [])
      .filter(row => row.label || row.svg || row.href)
      .map(row => ({ label: row.label ?? '', svg: row.svg ?? '', href: row.href ?? '' }));
    if (left.length || right.length) {
      result.top = { ...header.top, banner: { left, right } };
    } else {
      delete result.top;
    }
  }

  return result;
}

export function buildFooterConfig(
  footer: IFooter,
  paramsValue: Partial<IFooter['params']>,
  brandValue: FooterBrandValue,
  socialValue: FooterSocialValue,
  newsletterValue: FooterNewsletterValue,
  bottomValue: FooterBottomValue,
  menuItems: NonNullable<IFooter['mainMenu']>,
  mobileMenuItems: NonNullable<IFooter['mobileMenu']>,
  fixBarValue?: FooterFixBarValue,
  dynamicValue?: FooterDynamicValue
): IFooter {
  const result: IFooter = {
    ...footer,
    params: { ...footer.params, ...paramsValue },
    footerBrand: {
      ...footer.footerBrand,
      logo: {
        ...footer.footerBrand?.logo,
        img: {
          ...(footer.footerBrand?.logo?.img ?? {}),
          src: brandValue.src,
          alt: brandValue.alt,
          href: brandValue.href,
          classes: brandValue.classes,
        },
      },
      summary: brandValue.summary,
      social: socialValue.social ?? footer.footerBrand?.social ?? [],
    },
    mainMenu: menuItems,
    mobileMenu: mobileMenuItems,
  };

  // Only write the newsletter node when the source config had one or the user
  // filled in something — avoid injecting an empty subscribe block on save.
  const hasNewsletterInput = !!(
    newsletterValue.webform_id ||
    newsletterValue.label ||
    newsletterValue.summary ||
    newsletterValue.actionLabel
  );
  if (footer.footerNewsletter || hasNewsletterInput) {
    result.footerNewsletter = {
      ...footer.footerNewsletter,
      form: footer.footerNewsletter?.form ?? [],
      params: {
        ...footer.footerNewsletter?.params,
        webform_id: newsletterValue.webform_id,
      },
      label: newsletterValue.label,
      summary: newsletterValue.summary,
      action: {
        ...footer.footerNewsletter?.action,
        label: newsletterValue.actionLabel,
      },
    };
  } else {
    delete result.footerNewsletter;
  }

  const bottomRight = bottomValue.right ?? footer.footerBottom?.right ?? [];
  if (footer.footerBottom || bottomValue.left || bottomRight.length) {
    const footerBottom = { ...footer.footerBottom, left: bottomValue.left, right: bottomRight };
    if (!bottomValue.left) {
      delete (footerBottom as Partial<typeof footerBottom>).left;
    }
    result.footerBottom = footerBottom as NonNullable<IFooter['footerBottom']>;
  } else {
    delete result.footerBottom;
  }

  if (fixBarValue) {
    const fixBar = fixBarValue.fixBar ?? footer.fixBar ?? [];
    if (fixBar.length) {
      result.fixBar = fixBar;
    } else {
      delete result.fixBar;
    }
  }

  if (dynamicValue) {
    if (dynamicValue.enabled) {
      result.dynamic = {
        ...footer.dynamic,
        classes: dynamicValue.classes,
        content: {
          type: 'custom-template',
          fullWidth: true,
          isAPI: false,
          ...footer.dynamic?.content,
          html: dynamicValue.html,
        },
      };
    } else {
      delete result.dynamic;
    }
  }

  return result;
}
