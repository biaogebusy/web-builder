import { DatepickerComponent } from './datepicker/datepicker.component';
import { DateRangeComponent } from './formly-type/date-range/date-range.component';
import { ImgPickerComponent } from './formly-type/img-picker/img-picker.component';
import { MatSelectComponent } from './formly-type/mat-select/mat-select.component';
import { RepeatTypeComponent } from './formly-type/repeat.type';
import { RichTextComponent } from './formly-type/rich-text/rich-text.component';
import { SliderComponent } from './formly-type/slider/slider.component';
import { TabsTypeComponent } from './formly-type/tabs/tabs.component';
import { FormlyComponent } from './formly/formly.component';
import { TermsServiceComponent } from './terms-service/terms-service.component';
import { RichEditorComponent } from './formly-type/rich-editor/rich-editor.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { DialogRepeatComponent } from './formly-type/dialog-repeat/dialog-repeat.component';

export const FORM_IMPORTS = [
  SliderComponent,
  FormlyComponent,
  RichTextComponent,
  TabsTypeComponent,
  ImgPickerComponent,
  MatSelectComponent,
  DateRangeComponent,
  RichEditorComponent,
  RepeatTypeComponent,
  DatepickerComponent,
  DynamicFormComponent,
  TermsServiceComponent,
  DialogRepeatComponent,
] as const;

export {
  DatepickerComponent,
  DateRangeComponent,
  ImgPickerComponent,
  MatSelectComponent,
  RepeatTypeComponent,
  RichTextComponent,
  SliderComponent,
  TabsTypeComponent,
  FormlyComponent,
  TermsServiceComponent,
  RichEditorComponent,
  DynamicFormComponent,
  DialogRepeatComponent,
};
