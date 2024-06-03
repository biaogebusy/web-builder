import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import type { ISearchLabel } from '@core/interface/combs/ISearch';

@Component({
  selector: 'app-search-sidebar',
  templateUrl: './search-sidebar.component.html',
  styleUrls: ['./search-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchSidebarComponent implements OnInit {
  @Input() content: any[];
  @Input() label: ISearchLabel;
  @Input() form: UntypedFormGroup;
  @Output() modelChange: EventEmitter<any> = new EventEmitter();

  panelOpenState = true;
  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit(): void {}

  onModelChange(event: any): any {
    this.modelChange.emit(event);
  }

  clear(): void {
    this.form.reset();
    this.cd.detectChanges();
  }
}
