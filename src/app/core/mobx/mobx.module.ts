import {
  LOCALE_ID,
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MobxAngularModule } from 'mobx-angular';
import { UserState } from './user/UserState';
import { BrandingState } from './BrandingStare';

const states = [UserState, BrandingState];

@NgModule({
  declarations: [],
  imports: [CommonModule, MobxAngularModule],
  exports: [MobxAngularModule],
})
export class MobxModule {
  constructor(@Optional() @SkipSelf() parentModule: MobxModule) {
    if (parentModule) {
      throw new Error('MobxModule is already loaded.');
    }
  }

  public static forRoot(): ModuleWithProviders<MobxModule> {
    return {
      ngModule: MobxModule,
      providers: [...states],
    };
  }
}
