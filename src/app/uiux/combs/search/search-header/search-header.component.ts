import {
  ChangeDetectionStrategy,
  Component,
  input
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
  readonly content = input<any>();
  readonly filterForm = input<any>();
  readonly form = input.required<UntypedFormGroup>();

  formControl: any;

  constructor() {}

}
