import { ComponentFactoryResolver, Type, inject } from '@angular/core';

export abstract class BaseModule {
  private selectorToFactoryMap: { [key: string]: any };
  protected dynamicComponents: Type<any>[];
  protected componentFactoryResolver = inject(ComponentFactoryResolver);

  public getComponentFactory(selector: string): any {
    if (!this.selectorToFactoryMap) {
      this.populateRegistry();
    }

    return this.selectorToFactoryMap[`app-${selector}`];
  }

  private populateRegistry() {
    this.selectorToFactoryMap = {};
    this.dynamicComponents.forEach((type) => {
      const componentFactory: any =
        this.componentFactoryResolver.resolveComponentFactory(type);
      this.selectorToFactoryMap[componentFactory.selector] = componentFactory;
    });
  }
}
