import {
  Compiler,
  ComponentRef,
  Injectable,
  Injector,
  NgModuleFactory,
} from '@angular/core';
import { BaseModule } from '@uiux/base/base.module';

@Injectable({
  providedIn: 'root',
})
export class ComponentService {
  private moduleLists: { [key: string]: () => Promise<any> } = {};
  constructor(private injector: Injector) {}

  initUiuxModuleLoad(): void {
    [
      'bg',
      'img',
      'tab',
      'map',
      'box',
      'btn',
      'text',
      'card',
      'link',
      'icon',
      'flag',
      'shape',
      'panel',
      'title',
      'share',
      'player',
      'swiper',
      'divider',
      'spacer',
      'iframe',
      'bg-img',
      'spinner',
      'stepper',
      'card-1v1',
      'card-1v2',
      'card-1v4',
      'card-1v5',
      'card-1v6',
      'calendar',
      'chart-box',
      'accordion',
      'user-card',
      'btn-video',
      'view-list',
      'text-hero',
      'menu-list',
      'line-year',
      'chip-list',
      'chart',
      'input',
      'formly',
      'media-list',
      'select',
      'feature-box',
      'content-box',
      'testimonial',
      'progress-bar',
      'media-object',
      'media-meta',
      'textarea',
      'checkbox',
      'download',
      'dynamic-table',
      'dropdown-menu',
      'number-animate',
      'search-action',
      'progress-group',
      'datepicker',
      'inline-lightbox',
      'media-object-group',
      'content-text-center',
      'github-star',
    ].forEach((type) =>
      this.setModule(type, () =>
        import('@uiux/widgets/widgets.module').then((m) => m.WidgetsModule)
      )
    );
    ['action-1v1'].forEach((type) =>
      this.setModule(type, () =>
        import('@uiux/combs/action/action.module').then((m) => m.ActionModule)
      )
    );

    ['banner-simple'].forEach((type) =>
      this.setModule(type, () =>
        import('@uiux/combs/banner/banner.module').then((m) => m.BannerModule)
      )
    );

    ['lottery'].forEach((type) =>
      this.setModule(type, () =>
        import('@uiux/combs/calculator/calculator.module').then(
          (m) => m.CalculatorModule
        )
      )
    );

    ['full-calendar'].forEach((type) =>
      this.setModule(type, () =>
        import('@uiux/combs/calendar/calendar.module').then(
          (m) => m.CalendarModule
        )
      )
    );

    [
      'carousel-1v1',
      'carousel-1v2',
      'carousel-1v3',
      'carousel-2v1',
      'carousel-2v1',
      'carousel-2v2',
    ].forEach((type) =>
      this.setModule(type, () =>
        import('@uiux/combs/carousel/carousel.module').then(
          (m) => m.CarouselModule
        )
      )
    );

    [
      'hero-1v1',
      'hero-1v2',
      'hero-1v3',
      'hero-1v4',
      'hero-2v1',
      'hero-2v2',
      'hero-2v3',
    ].forEach((type) =>
      this.setModule(type, () =>
        import('@uiux/combs/hero/hero.module').then((m) => m.HeroModule)
      )
    );

    [
      'dynamic-card-list',
      'dynamic-card-list-1v1',
      'dynamic-media-list',
      'dynamic-text-list',
      'list',
      'list-thin',
      'taxonomy-list',
      'taxonomy-thin-list',
      'tree-list',
    ].forEach((type) =>
      this.setModule(type, () =>
        import('@uiux/combs/list/list.module').then((m) => m.ListModule)
      )
    );

    ['location', 'map-list-v1', 'view-map'].forEach((type) =>
      this.setModule(type, () =>
        import('@uiux/combs/map/map.module').then((m) => m.MapModule)
      )
    );

    ['packery', 'shuffle'].forEach((type) =>
      this.setModule(type, () =>
        import('@uiux/combs/masonry/masonry.module').then(
          (m) => m.MasonryModule
        )
      )
    );

    ['article', 'question', 'report', 'relate'].forEach((type) =>
      this.setModule(type, () =>
        import('@uiux/combs/node/node.module').then((m) => m.NodeModule)
      )
    );

    ['contact-us', 'contact-us-1v1'].forEach((type) =>
      this.setModule(type, () =>
        import('@uiux/combs/form/form.module').then((m) => m.FormModule)
      )
    );

    ['autoclose', 'dynamic-form', '404', 'jsoneditor', 'theme-preview'].forEach(
      (type) =>
        this.setModule(type, () =>
          import('@uiux/combs/other/other.module').then((m) => m.OtherModule)
        )
    );

    [
      'profile-1v1',
      'user-center',
      'user-favorite',
      'user-pay',
      'user-profile',
    ].forEach((type) =>
      this.setModule(type, () =>
        import('@uiux/combs/profile/profile.module').then(
          (m) => m.ProfileModule
        )
      )
    );

    ['search'].forEach((type) =>
      this.setModule(type, () =>
        import('@uiux/combs/search/search.module').then((m) => m.SearchModule)
      )
    );
    [
      'showcase-1v1',
      'showcase-1v3',
      'showcase-1v4',
      'showcase-2v1',
      'showcase-2v2',
      'showcase-2v4',
      'showcase-2v5',
      'showcase-2v6',
      'showcase-3v2',
      'showcase-3v3',
      'showcase-3v4',
      'showcase-3v5',
      'showcase-3v6',
      'showcase-3v7',
      'showcase-3v9',
      'showcase-4v1',
    ].forEach((type) =>
      this.setModule(type, () =>
        import('@uiux/combs/showcase/showcase.module').then(
          (m) => m.ShowcaseModule
        )
      )
    );

    ['tab-1v1'].forEach((type) =>
      this.setModule(type, () =>
        import('@uiux/combs/tab/tab.module').then((m) => m.TabModule)
      )
    );

    ['video-bg'].forEach((type) =>
      this.setModule(type, () =>
        import('@uiux/combs/video/video.module').then((m) => m.VideoModule)
      )
    );

    ['dashboard'].forEach((type) =>
      this.setModule(type, () =>
        import('@uiux/combs/dashboard/dashboard.module').then(
          (m) => m.DashboardModule
        )
      )
    );

    [
      'layout-builder',
      'builder-template',
      'custom-template',
      'builder-generater',
      'btn-generater',
      'inline-editor',
      'widget-picker',
      'layout-setting',
    ].forEach((type) =>
      this.setModule(type, () =>
        import('@modules/builder/builder.module').then((m) => m.BuilderModule)
      )
    );

    ['manage-media', 'manage-block'].forEach((type) =>
      this.setModule(type, () =>
        import('@modules/manage/manage.module').then((m) => m.ManageModule)
      )
    );
    ['login'].forEach((type) =>
      this.setModule(type, () =>
        import('@modules/user/user.module').then((m) => m.UserModule)
      )
    );
  }

  setModule(type: string, loadModule: () => Promise<any>): void {
    this.moduleLists[type] = loadModule;
  }

  async getComponent(
    type: string
  ): Promise<ComponentRef<unknown> | ComponentRef<any> | undefined> {
    return this.getModuleFactory(type)
      .then((factory: any) => {
        const module = factory.create(this.injector);
        if (module.instance instanceof BaseModule) {
          const componentFactory = module.instance.getComponentFactory(type);
          return componentFactory.create(module.injector, [], null, module);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async getModuleFactory(type: string) {
    if (!this.moduleLists[type]) {
      throw new Error(`组件不存在！`);
    }
    const ngModuleOrNgModuleFactory = await this.moduleLists[type]();
    let factory = null;
    if (ngModuleOrNgModuleFactory instanceof NgModuleFactory) {
      factory = ngModuleOrNgModuleFactory;
    } else {
      factory = await this.injector
        .get(Compiler)
        .compileModuleAsync(ngModuleOrNgModuleFactory);
    }

    return factory;
  }
}
