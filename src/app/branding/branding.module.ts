import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ShareModule } from '../share/share.module';

@NgModule({
  declarations: [HeaderComponent, FooterComponent],
  imports: [CommonModule, ShareModule],
  exports: [HeaderComponent, FooterComponent],
})
export class BrandingModule {}
