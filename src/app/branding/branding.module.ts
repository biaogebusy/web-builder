import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ShareModule } from '../share/share.module';
import { MenuComponent } from './header/menu/menu.component';
import { UserMenuComponent } from './header/menu/user-menu/user-menu.component';
import { SwitchThemeComponent } from './header/menu/switch-theme/switch-theme.component';
import { UiuxModule } from '../uiux/uiux.module';
import { PopupComponent } from './footer/popup/popup.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    UserMenuComponent,
    SwitchThemeComponent,
    PopupComponent,
  ],
  imports: [CommonModule, ShareModule, UiuxModule],
  exports: [HeaderComponent, FooterComponent, MenuComponent],
})
export class BrandingModule {}
