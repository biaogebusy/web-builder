import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { FieldType, FormlyModule } from '@ngx-formly/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'formly-field-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  imports: [MatTabsModule, FormlyModule],
})
export class TabsTypeComponent extends FieldType {}
