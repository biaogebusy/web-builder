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

export function buildHeaderConfig(
  header: IHeader,
  paramsValue: Partial<IHeader['params']>,
  logoValue: HeaderLogoValue,
  menuItems: IMainMenu[],
  searchValue: Partial<IHeader['search']>,
  actionsValue: HeaderActionsValue
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

  return {
    ...header,
    params: { ...header.params, ...paramsValue },
    logo,
    mainMenu: menuItems,
    search: { ...header.search, ...searchValue },
    actions: actionsValue.actions ?? header.actions ?? [],
  };
}

export function buildFooterConfig(
  footer: IFooter,
  paramsValue: Partial<IFooter['params']>,
  brandValue: FooterBrandValue,
  socialValue: FooterSocialValue,
  newsletterValue: FooterNewsletterValue,
  bottomValue: FooterBottomValue,
  menuItems: NonNullable<IFooter['mainMenu']>,
  mobileMenuItems: NonNullable<IFooter['mobileMenu']>
): IFooter {
  return {
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
    footerNewsletter: {
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
    },
    footerBottom: {
      ...footer.footerBottom,
      left: bottomValue.left,
      right: bottomValue.right ?? footer.footerBottom?.right ?? [],
    },
  };
}
