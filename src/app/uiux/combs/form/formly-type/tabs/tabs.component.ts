import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { FieldType, FormlyModule } from '@ngx-formly/core';

@Component({
  selector: 'formly-field-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  imports: [MatTabsModule, FormlyModule],
})
export class TabsTypeComponent extends FieldType {}
