import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ShareModule } from '@share/share.module';
import { MenuComponent } from './header/menu/menu.component';
import { UserMenuComponent } from './header/menu/user-menu/user-menu.component';
import { PopupComponent } from './footer/popup/popup.component';
import { ItemMenuComponent } from './header/menu/item-menu/item-menu.component';
import { SubMenuComponent } from './header/menu/item-menu/sub-menu/sub-menu.component';
import { HeaderTopComponent } from './header/header-top/header-top.component';
import { WidgetsModule } from '@uiux/widgets/widgets.module';
import { LightComponent } from './footer/light/light.component';
import { InverseComponent } from './footer/inverse/inverse.component';
import { MenuItemComponent } from './footer/menu-item/menu-item.component';
import { SearchBoxComponent } from './header/menu/search-box/search-box.component';
import { HeaderBannerComponent } from './header/header-banner/header-banner.component';
import { MegaMenuComponent } from './header/menu/item-menu/mega-menu/mega-menu.component';
import { SpaceBetweenComponent } from './footer/space-between/space-between.component';
import { FixBarComponent } from './footer/fix-bar/fix-bar.component';
import { FixBarPopupComponent } from './footer/fix-bar/fix-bar-popup/fix-bar-popup.component';
import { HoverMenuComponent } from './header/menu/item-menu/hover-menu/hover-menu.component';
import { ManageSidebarComponent } from './manage-sidebar/manage-sidebar.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    UserMenuComponent,
    PopupComponent,
    ItemMenuComponent,
    SubMenuComponent,
    MenuItemComponent,
    HeaderTopComponent,
    LightComponent,
    InverseComponent,
    SearchBoxComponent,
    HeaderBannerComponent,
    MegaMenuComponent,
    SpaceBetweenComponent,
    FixBarComponent,
    FixBarPopupComponent,
    HoverMenuComponent,
    ManageSidebarComponent,
  ],
  imports: [ShareModule, WidgetsModule],
  exports: [
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    ManageSidebarComponent,
    UserMenuComponent,
  ],
})
export class BrandingModule {}
