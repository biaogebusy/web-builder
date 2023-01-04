import {
  ComponentFactory,
  ComponentFactoryResolver,
  Type,
} from '@angular/core';

export abstract class BaseModule {
  private selectorToFactoryMap: { [key: string]: ComponentFactory<any> };
  protected dynamicComponents: Type<any>[];

  constructor(protected componentFactoryResolver: ComponentFactoryResolver) {}

  public getComponentFactory(selector: string): ComponentFactory<any> {
    if (!this.selectorToFactoryMap) {
      this.populateRegistry();
    }

    return this.selectorToFactoryMap[`app-${selector}`];
  }

  private populateRegistry() {
    this.selectorToFactoryMap = {};
    this.dynamicComponents.forEach((type) => {
      const componentFactory: ComponentFactory<any> =
        this.componentFactoryResolver.resolveComponentFactory(type);
      this.selectorToFactoryMap[componentFactory.selector] = componentFactory;
    });
  }
}
