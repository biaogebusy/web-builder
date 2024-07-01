import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  inject,
} from '@angular/core';
import { AbstractControl, FormGroup, UntypedFormGroup } from '@angular/forms';
import { IPageItem } from '@core/interface/IBuilder';
import { BuilderService } from '@core/service/builder.service';
import { ScreenService } from '@core/service/screen.service';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-page-setting',
  templateUrl: './page-setting.component.html',
  styleUrl: './page-setting.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageSettingComponent implements OnInit {
  @Input() content: any;
  form = new FormGroup({});
  model: any = {};
  fields: FormlyFieldConfig[];
  cd = inject(ChangeDetectorRef);
  builderService = inject(BuilderService);
  screenService = inject(ScreenService);

  ngOnInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      const { content } = this.content;
      if (content) {
        console.log(content);
        this.fields = [
          {
            key: 'title',
            type: 'input',
            defaultValue: content.title,
            props: {
              label: '标题',
              required: true,
              disabled: true,
            },
            modelOptions: {
              updateOn: 'blur',
            },
          },
          {
            key: 'alias',
            type: 'input',
            defaultValue: content.url,
            props: {
              label: 'url别名',
              disabled: true,
            },
            modelOptions: {
              updateOn: 'blur',
            },
            asyncValidators: {
              checkUrl: {
                expression: (control: AbstractControl) => {
                  return this.builderService.getUrlAlias(content).pipe(
                    map((res) => {
                      console.log(res);
                    }),
                  );
                },
                message: '别名已使用',
              },
            },
          },
          {
            key: 'author',
            type: 'input',
            defaultValue: content.author,
            props: {
              label: '作者',
              disabled: true,
            },
          },
          {
            key: 'changed',
            type: 'input',
            defaultValue: content.changed,
            props: {
              label: '更新时间',
              disabled: true,
            },
          },
          {
            key: 'landcode',
            type: 'input',
            defaultValue: content.langcode,
            props: {
              label: '语言',
              disabled: true,
            },
          },
          {
            key: 'id',
            type: 'input',
            defaultValue: content.id,
            props: {
              label: 'ID',
              disabled: true,
            },
          },
        ];
        this.cd.detectChanges();
      }
    }
  }

  onModelChange(value: any): void {}
}
