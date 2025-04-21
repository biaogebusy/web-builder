import { Component, OnInit, inject, signal } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TagsService } from '@core/service/tags.service';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-node-add',
  standalone: false,
  templateUrl: './node-add.component.html',
  styleUrl: './node-add.component.scss',
})
export class NodeAddComponent implements OnInit {
  private tagsService = inject(TagsService);
  private activateRoute = inject(ActivatedRoute);

  public type = signal<string>('');
  public form: UntypedFormGroup = new UntypedFormGroup({});
  public fields = signal<FormlyFieldConfig[]>([]);
  ngOnInit() {
    this.activateRoute.params.subscribe(params => {
      const type = params['type'];
      this.tagsService.setTitle('创建 ' + type + ' 页面');
      this.type.set(type);

      switch (type) {
        case 'json':
          this.fields.set([
            {
              key: 'title',
              type: 'input',
              props: {
                label: '标题',
                required: true,
              },
            },
            {
              key: 'body',
              type: 'json',
              props: {
                label: 'JSON',
                required: true,
                rows: 10,
              },
            },
          ]);
          break;
      }
    });
  }

  onSubmit(value: any): void {
    console.log(value);
  }
}
