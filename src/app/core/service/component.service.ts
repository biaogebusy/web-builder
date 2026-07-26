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
  private readonly resolvedComponents = new Map<string, Type<unknown>>();
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
    this.registerDynamicComponent();
    const resolvedComponent = this.resolvedComponents.get(type);
    if (resolvedComponent) {
      return resolvedComponent;
    }

    const loader = this.componentLoaders.get(type);

    if (!loader) {
      const pageUrl = this.doc.location.href;
      const errorMsg = `No component loader found for "${type}" from ${pageUrl}.`;
      console.error(errorMsg);
      throw new Error(errorMsg);
    }

    let componentPromise = this.componentCache.get(type);

    if (!componentPromise) {
      componentPromise = loader()
        .then(componentType => {
          this.resolvedComponents.set(type, componentType);
          return componentType;
        })
        .catch(error => {
          this.componentCache.delete(type);
          console.error(`Error loading component ${type}:`, error);
          throw error;
        });
      this.componentCache.set(type, componentPromise);
    }

    return componentPromise;
  }

  getCachedComponentType(type: string): Type<unknown> | undefined {
    return this.resolvedComponents.get(type);
  }

  async preloadComponentTypes(content: unknown): Promise<void> {
    this.registerDynamicComponent();
    const componentTypes = this.collectComponentTypes(content);
    await Promise.allSettled(componentTypes.map(type => this.getComponentType(type)));
  }

  clearCache(type?: string): void {
    if (type) {
      this.componentCache.delete(type);
      this.resolvedComponents.delete(type);
      return;
    }

    this.componentCache.clear();
    this.resolvedComponents.clear();
  }

  private collectComponentTypes(value: unknown): string[] {
    const types = new Set<string>();
    const visited = new Set<object>();

    const visit = (current: unknown): void => {
      if (!current || typeof current !== 'object' || visited.has(current)) {
        return;
      }
      visited.add(current);

      if (Array.isArray(current)) {
        current.forEach(visit);
        return;
      }

      const record = current as Record<string, unknown>;
      if (typeof record['type'] === 'string' && this.componentLoaders.has(record['type'])) {
        types.add(record['type']);
      }
      Object.values(record).forEach(visit);
    };

    visit(value);
    return [...types];
  }
}
