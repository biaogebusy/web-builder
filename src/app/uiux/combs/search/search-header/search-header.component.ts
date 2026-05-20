import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';
import { ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { BgImgComponent } from '@uiux/widgets/bg-img/bg-img.component';
import { TextComponent } from '@uiux/widgets/text/text.component';
import { SpacerComponent } from '@uiux/widgets/spacer/spacer.component';
@Component({
  selector: 'app-search-header',
  templateUrl: './search-header.component.html',
  styleUrls: ['./search-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, BgImgComponent, TextComponent, SpacerComponent],
})
export class SearchHeaderComponent {
  @Input() content: any;
  @Input() filterForm: any;
  @Input() form: UntypedFormGroup;

  formControl: any;

  constructor() {}

}
