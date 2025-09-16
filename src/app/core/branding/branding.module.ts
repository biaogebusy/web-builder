import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ShareModule } from '@share/share.module';
import { MenuComponent } from './header/menu/menu.component';
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
import { FixBarComponent } from './footer/fix-bar/fix-bar.component';
import { FixBarPopupComponent } from './footer/fix-bar/fix-bar-popup/fix-bar-popup.component';
import { HoverMenuComponent } from './header/menu/item-menu/hover-menu/hover-menu.component';
import { FormModule } from '@uiux/combs/form/form.module';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    ItemMenuComponent,
    SubMenuComponent,
    MenuItemComponent,
    HeaderTopComponent,
    LightComponent,
    InverseComponent,
    SearchBoxComponent,
    HeaderBannerComponent,
    MegaMenuComponent,
    FixBarComponent,
    FixBarPopupComponent,
    HoverMenuComponent,
  ],
  imports: [ShareModule, WidgetsModule, FormModule],
  exports: [
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    HeaderBannerComponent,
    HeaderTopComponent,
    LightComponent,
    InverseComponent,
    FixBarComponent,
  ],
})
export class BrandingModule {}
