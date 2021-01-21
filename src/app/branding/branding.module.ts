import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ShareModule } from '../share/share.module';
import { MenuComponent } from './header/menu/menu.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, MenuComponent],
  imports: [CommonModule, ShareModule],
  exports: [HeaderComponent, FooterComponent, MenuComponent],
})
export class BrandingModule {}
