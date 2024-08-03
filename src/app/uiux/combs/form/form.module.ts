import { NgModule } from '@angular/core';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ShareModule } from '@share/share.module';
import { WidgetsModule } from '@uiux/widgets/widgets.module';
import { BaseModule } from '@uiux/base/base.module';
import { ContactUs1v1Component } from './contact-us1v1/contact-us1v1.component';

const components = [ContactUsComponent, ContactUs1v1Component];
@NgModule({
  declarations: [...components],
  imports: [ShareModule, WidgetsModule],
  exports: [...components],
})
export class FormModule extends BaseModule {
  dynamicComponents = [...components];

  static forStorybook(): any {
    return [...components];
  }
}
