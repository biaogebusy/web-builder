import { Type } from '@angular/core';

export abstract class BaseModule {
  private selectorToComponentMap: Record<string, Type<any>>;
  protected dynamicComponents: Type<any>[];

  public getComponentClass(selector: string): Type<any> | null {
    if (!this.selectorToComponentMap) {
      this.populateRegistry();
    }
    return this.selectorToComponentMap[`app-${selector}`] || null;
  }

  private populateRegistry(): void {
    this.selectorToComponentMap = {};
    this.dynamicComponents.forEach(componentType => {
      // 直接使用组件类的 selectors 属性
      const [selector] = (componentType as any).ɵcmp?.selectors[0];
      if (selector) {
        this.selectorToComponentMap[selector] = componentType;
      }
    });
  }
}
