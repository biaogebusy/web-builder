import { DOCUMENT, Injectable, inject } from '@angular/core';
import type { Type } from '@angular/core';
import { DYNAMIC_COMPONENT_LOADERS } from '@core/config/dynamic-component-loaders';
import type { ComponentLoader } from '@core/config/dynamic-component-loaders';

@Injectable({
  providedIn: 'root',
})
export class ComponentService {
  private readonly componentLoaders = new Map<string, ComponentLoader>();
  private readonly componentCache = new Map<string, Promise<Type<unknown>>>();
  private readonly doc = inject(DOCUMENT);

  registerDynamicComponent(): void {
    if (this.componentLoaders.size > 0) {
      return;
    }

    Object.entries(DYNAMIC_COMPONENT_LOADERS).forEach(([type, loader]) => {
      this.componentLoaders.set(type, loader);
    });
  }

  async getComponentType(type: string): Promise<Type<unknown>> {
    const loader = this.componentLoaders.get(type);

    if (!loader) {
      const pageUrl = this.doc.location.href;
      const errorMsg = `No component loader found for "${type}" from ${pageUrl}.`;
      console.error(errorMsg);
      throw new Error(errorMsg);
    }

    let componentPromise = this.componentCache.get(type);

    if (!componentPromise) {
      componentPromise = loader().catch(error => {
        this.componentCache.delete(type);
        console.error(`Error loading component ${type}:`, error);
        throw error;
      });
      this.componentCache.set(type, componentPromise);
    }

    return componentPromise;
  }

  clearCache(type?: string): void {
    if (type) {
      this.componentCache.delete(type);
      return;
    }

    this.componentCache.clear();
  }
}
