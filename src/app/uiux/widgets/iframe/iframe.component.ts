import {
  Component,
  Input,
  OnInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Inject,
} from '@angular/core';
import type { IUser } from '@core/interface/IUser';
import type { IIframe } from '@core/interface/widgets/IWidgets';
import { USER } from '@core/token/token-providers';

@Component({
  selector: 'app-iframe',
  templateUrl: './iframe.component.html',
  styleUrls: ['./iframe.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IframeComponent implements OnInit {
  @Input() content: IIframe;
  url: string;
  constructor(
    private cd: ChangeDetectorRef,
    @Inject(USER) private user: IUser
  ) {}

  ngOnInit(): void {
    if (!this.content?.url.includes(':id')) {
      this.url = this.content.url;
      this.cd.detectChanges();
      return;
    }
    if (this.user) {
      const id = this.user.current_user.uid;
      this.url = this.content.url.replace(':id', id);
    }
  }
}
