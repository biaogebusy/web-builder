import { Injectable, Injector, NgModuleRef, Type, createNgModule, inject } from '@angular/core';
import { BaseModule } from '@uiux/base/base.module';

// 定义类型
type ModuleType = Type<any>;
type ModuleLoader = () => Promise<ModuleType>;

// 模块配置接口
interface ModuleConfig {
  module: string;
  components: string[];
}

@Injectable({
  providedIn: 'root',
})
export class ComponentService {
  private readonly moduleLoaders = new Map<string, ModuleLoader>();
  private readonly moduleCache = new Map<string, Promise<NgModuleRef<any>>>();
  private readonly injector = inject(Injector);

  private readonly MODULE_CONFIG: ModuleConfig[] = [
    {
      module: 'WidgetsModule',
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
        'accordion',
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
      components: ['chart', 'chart-box'],
    },
    {
      module: 'CalendarModule',
      components: ['full-calendar'],
    },
    {
      module: 'CalculatorModule',
      components: ['lottery'],
    },
    {
      module: 'CarouselModule',
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
      components: ['hero-1v1', 'hero-1v2', 'hero-1v4', 'hero-2v1', 'hero-2v2', 'hero-2v3'],
    },
    {
      module: 'ListModule',
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
      components: ['map', 'location', 'map-list-v1', 'view-map'],
    },
    {
      module: 'MasonryModule',
      components: ['shuffle'],
    },
    {
      module: 'NodeModule',
      components: ['article', 'question', 'report', 'banner-simple', 'breadcrumb'],
    },
    {
      module: 'FormModule',
      components: ['formly', 'datepicker', 'contact-us'],
    },
    {
      module: 'OtherModule',
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
      components: ['user-pay', 'profile-1v1', 'user-center', 'user-profile', 'user-favorite'],
    },
    {
      module: 'SearchModule',
      components: ['search'],
    },
    {
      module: 'ShowcaseModule',
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
      components: ['tab-1v1', 'tab'],
    },
    {
      module: 'VideoModule',
      components: ['video-bg', 'video'],
    },
    {
      module: 'DashboardModule',
      components: ['dashboard', 'dashboard-box'],
    },
    {
      module: 'BuilderModule',
      components: [
        'json',
        'card-page',
        'card-list',
        'inline-editor',
        'page-setting',
        'btn-generater',
        'widget-picker',
        'layout-setting',
        'builder-template',
        'builder-generater',
      ],
    },
    {
      module: 'ManageModule',
      components: ['manage-media', 'upload-media', 'taxonomy'],
    },
    {
      module: 'UserModule',
      components: ['login', 'user-setting'],
    },
  ];

  registerDynamicComponent(): void {
    this.MODULE_CONFIG.forEach(config => {
      const loader = this.createModuleLoader(config.module);
      config.components.forEach(component => {
        this.moduleLoaders.set(component, loader);
      });
    });
  }

  private createModuleLoader(moduleName: string): ModuleLoader {
    return async () => {
      let module: any;
      switch (moduleName) {
        case 'WidgetsModule':
          module = await import('@uiux/widgets/widgets.module');
          break;
        case 'ChartModule':
          module = await import('@uiux/combs/chart/chart.module');
          break;
        case 'CalendarModule':
          module = await import('@uiux/combs/calendar/calendar.module');
          break;
        case 'CalculatorModule':
          module = await import('@uiux/combs/calculator/calculator.module');
          break;
        case 'CarouselModule':
          module = await import('@uiux/combs/carousel/carousel.module');
          break;
        case 'HeroModule':
          module = await import('@uiux/combs/hero/hero.module');
          break;
        case 'ListModule':
          module = await import('@uiux/combs/list/list.module');
          break;
        case 'MapModule':
          module = await import('@uiux/combs/map/map.module');
          break;
        case 'MasonryModule':
          module = await import('@uiux/combs/masonry/masonry.module');
          break;
        case 'NodeModule':
          module = await import('@uiux/combs/node/node.module');
          break;
        case 'FormModule':
          module = await import('@uiux/combs/form/form.module');
          break;
        case 'OtherModule':
          module = await import('@uiux/combs/other/other.module');
          break;
        case 'ProfileModule':
          module = await import('@uiux/combs/profile/profile.module');
          break;
        case 'SearchModule':
          module = await import('@uiux/combs/search/search.module');
          break;
        case 'ShowcaseModule':
          module = await import('@uiux/combs/showcase/showcase.module');
          break;
        case 'TabModule':
          module = await import('@uiux/combs/tab/tab.module');
          break;
        case 'VideoModule':
          module = await import('@uiux/combs/video/video.module');
          break;
        case 'DashboardModule':
          module = await import('@uiux/combs/dashboard/dashboard.module');
          break;
        case 'BuilderModule':
          module = await import('@modules/builder/builder.module');
          break;
        case 'ManageModule':
          module = await import('@modules/manage/manage.module');
          break;
        case 'UserModule':
          module = await import('@modules/user/user.module');
          break;
        default:
          throw new Error(`Unknown module: ${moduleName}`);
      }
      return module[moduleName];
    };
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
      throw new Error(`No module loader found for component ${type}`);
    }

    // 使用缓存避免重复加载
    const cacheKey = type;
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

  // 清理缓存的方法
  clearCache(type?: string): void {
    if (type) {
      this.moduleCache.delete(type);
    } else {
      this.moduleCache.clear();
    }
  }
}
