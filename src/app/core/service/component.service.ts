import {
  DOCUMENT,
  Injectable,
  Injector,
  NgModuleRef,
  Type,
  createNgModule,
  inject,
} from '@angular/core';
import { BaseModule } from '@uiux/base/base.module';

// 定义类型
type ModuleLoader = () => Promise<Type<any>>;

// 模块配置接口
interface ModuleConfig {
  module: string;
  loader: ModuleLoader;
  components: string[];
}

@Injectable({
  providedIn: 'root',
})
export class ComponentService {
  private readonly moduleLoaders = new Map<string, ModuleLoader>();
  private readonly componentToModule = new Map<string, string>();
  private readonly moduleCache = new Map<string, Promise<NgModuleRef<any>>>();
  private readonly injector = inject(Injector);
  private doc = inject(DOCUMENT);

  private readonly MODULE_CONFIG: ModuleConfig[] = [
    {
      module: 'WidgetsModule',
      loader: () => import('@uiux/widgets/widgets.module').then(m => m.WidgetsModule),
      components: [
        'bg',
        'img',
        'box',
        'btn',
        'text',
        'card',
        'link',
        'icon',
        'shape',
        'panel',
        'title',
        'divider',
        'spacer',
        'bg-img',
        'spinner',
        'card-1v1',
        'card-1v2',
        'card-1v4',
        'card-1v5',
        'card-1v6',
        'user-card',
        'btn-video',
        'view-list',
        'text-hero',
        'menu-list',
        'media-list',
        'feature-box',
        'media-meta',
        'content-box',
        'github-star',
        'progress-bar',
        'media-object',
        'dynamic-table',
        'dropdown-menu',
        'layout-builder',
        'number-animate',
        'progress-group',
        'inline-lightbox',
        'media-object-group',
        'content-text-center',
      ],
    },
    {
      module: 'ChartModule',
      loader: () => import('@uiux/combs/chart/chart.module').then(m => m.ChartModule),
      components: ['chart', 'chart-box'],
    },
    {
      module: 'CalendarModule',
      loader: () => import('@uiux/combs/calendar/calendar.module').then(m => m.CalendarModule),
      components: ['full-calendar'],
    },
    {
      module: 'CalculatorModule',
      loader: () =>
        import('@uiux/combs/calculator/calculator.module').then(m => m.CalculatorModule),
      components: ['lottery'],
    },
    {
      module: 'CarouselModule',
      loader: () => import('@uiux/combs/carousel/carousel.module').then(m => m.CarouselModule),
      components: [
        'swiper',
        'carousel-1v1',
        'carousel-1v2',
        'carousel-1v3',
        'carousel-2v1',
        'carousel-2v1',
        'carousel-2v2',
      ],
    },
    {
      module: 'HeroModule',
      loader: () => import('@uiux/combs/hero/hero.module').then(m => m.HeroModule),
      components: ['hero-1v1', 'hero-1v2', 'hero-1v4', 'hero-2v1', 'hero-2v2', 'hero-2v3'],
    },
    {
      module: 'ListModule',
      loader: () => import('@uiux/combs/list/list.module').then(m => m.ListModule),
      components: [
        'dynamic-card-list',
        'dynamic-card-list-1v1',
        'dynamic-media-list',
        'dynamic-text-list',
        'list',
        'list-thin',
        'taxonomy-list',
        'taxonomy-thin-list',
      ],
    },
    {
      module: 'MapModule',
      loader: () => import('@uiux/combs/map/map.module').then(m => m.MapModule),
      components: ['map', 'location', 'map-list-v1', 'view-map'],
    },
    {
      module: 'MasonryModule',
      loader: () => import('@uiux/combs/masonry/masonry.module').then(m => m.MasonryModule),
      components: ['shuffle'],
    },
    {
      module: 'NodeModule',
      loader: () => import('@uiux/combs/node/node.module').then(m => m.NodeModule),
      components: ['article', 'question', 'report', 'banner-simple', 'breadcrumb'],
    },
    {
      module: 'FormModule',
      loader: () => import('@uiux/combs/form/form.module').then(m => m.FormModule),
      components: ['formly', 'datepicker', 'dynamic-form'],
    },
    {
      module: 'OtherModule',
      loader: () => import('@uiux/combs/other/other.module').then(m => m.OtherModule),
      components: [
        'flag',
        'iframe',
        'stepper',
        'download',
        'chip-list',
        'autoclose',
        'jsoneditor',
        'code-editor',
        'custom-template',
      ],
    },
    {
      module: 'ProfileModule',
      loader: () => import('@uiux/combs/profile/profile.module').then(m => m.ProfileModule),
      components: ['user-pay', 'profile-1v1', 'user-center', 'user-profile', 'user-favorite'],
    },
    {
      module: 'SearchModule',
      loader: () => import('@uiux/combs/search/search.module').then(m => m.SearchModule),
      components: ['search'],
    },
    {
      module: 'ShowcaseModule',
      loader: () => import('@uiux/combs/showcase/showcase.module').then(m => m.ShowcaseModule),
      components: [
        'showcase-1v1',
        'showcase-1v3',
        'showcase-1v4',
        'showcase-2v1',
        'showcase-2v2',
        'showcase-2v4',
        'showcase-2v6',
        'showcase-3v3',
        'showcase-3v4',
        'showcase-3v5',
        'showcase-3v6',
        'showcase-3v7',
        'showcase-3v9',
        'showcase-4v1',
      ],
    },
    {
      module: 'TabModule',
      loader: () => import('@uiux/combs/tab/tab.module').then(m => m.TabModule),
      components: ['tab-1v1', 'tab'],
    },
    {
      module: 'VideoModule',
      loader: () => import('@uiux/combs/video/video.module').then(m => m.VideoModule),
      components: ['video-bg', 'video'],
    },
    {
      module: 'DashboardModule',
      loader: () => import('@uiux/combs/dashboard/dashboard.module').then(m => m.DashboardModule),
      components: ['dashboard', 'dashboard-box'],
    },
    {
      module: 'BuilderModule',
      loader: () => import('@modules/builder/builder.module').then(m => m.BuilderModule),
      components: [
        'json',
        'card-page',
        'card-list',
        'inline-editor',
        'page-setting',
        'widget-picker',
        'layout-setting',
        'builder-template',
      ],
    },
    {
      module: 'ManageModule',
      loader: () => import('@modules/manage/manage.module').then(m => m.ManageModule),
      components: ['manage-media', 'upload-media', 'taxonomy'],
    },
    {
      module: 'UserModule',
      loader: () => import('@modules/user/user.module').then(m => m.UserModule),
      components: ['login', 'user-setting'],
    },
  ];

  registerDynamicComponent(): void {
    this.MODULE_CONFIG.forEach(config => {
      config.components.forEach(component => {
        this.moduleLoaders.set(component, config.loader);
        this.componentToModule.set(component, config.module);
      });
    });
  }

  async getComponentType(type: string): Promise<Type<unknown>> {
    try {
      const moduleRef = await this.getModuleRef(type);

      if (!(moduleRef.instance instanceof BaseModule)) {
        throw new Error(`Module for component ${type} does not extend BaseModule`);
      }
      // 直接获取组件类（不再通过工厂）
      const componentClass = moduleRef.instance.getComponentClass(type);

      if (!componentClass) {
        throw new Error(`Component class for ${type} not found`);
      }

      return componentClass;
    } catch (error) {
      console.error(`Error creating component ${type}:`, error);
      throw error;
    }
  }

  private async getModuleRef(type: string): Promise<NgModuleRef<any>> {
    const loader = this.moduleLoaders.get(type);

    if (!loader) {
      const pageUrl = this.doc.location.href;
      throw new Error(`No module loader found for component ${type} from ${pageUrl}`);
    }

    // 使用模块名作为缓存 key，同一模块只创建一个 NgModuleRef
    const cacheKey = this.componentToModule.get(type) || type;
    let moduleRefPromise = this.moduleCache.get(cacheKey);

    if (!moduleRefPromise) {
      moduleRefPromise = loader()
        .then(moduleType => createNgModule(moduleType, this.injector))
        .catch(error => {
          this.moduleCache.delete(cacheKey);
          throw error;
        });

      this.moduleCache.set(cacheKey, moduleRefPromise);
    }

    return moduleRefPromise;
  }

  // 清理缓存的方法（支持组件名或模块名）
  clearCache(type?: string): void {
    if (type) {
      const moduleName = this.componentToModule.get(type) || type;
      this.moduleCache.delete(moduleName);
    } else {
      this.moduleCache.clear();
    }
  }
}
