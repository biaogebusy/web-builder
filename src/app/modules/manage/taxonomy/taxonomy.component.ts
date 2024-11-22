import {
  Component,
  ChangeDetectionStrategy,
  Input,
  OnInit,
  inject,
  ChangeDetectorRef,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IUser } from '@core/interface/IUser';
import { ITaxonomy } from '@core/interface/manage/ITaxonomy';
import { NodeService } from '@core/service/node.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { USER } from '@core/token/token-providers';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-taxonomy',
  templateUrl: './taxonomy.component.html',
  styleUrl: './taxonomy.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaxonomyComponent implements OnInit {
  @Input() content: ITaxonomy;
  items$: Observable<any>;
  loading = false;
  showForm = false;
  nodeService = inject(NodeService);
  util = inject(UtilitiesService);
  cd = inject(ChangeDetectorRef);
  user$ = inject(USER);
  form = new FormGroup({});
  model: any = {};
  fields: FormlyFieldConfig[] = [
    {
      key: 'name',
      type: 'input',
      props: {
        label: '名称',
        placeholder: '请输入名称',
        required: true,
      },
    },
  ];

  ngOnInit(): void {
    this.getItems('');
  }

  getItems(params: string): void {
    this.loading = true;
    const {
      params: { api },
    } = this.content;
    this.items$ = this.nodeService.fetch(api, params).pipe(
      tap(() => {
        this.loading = false;
        this.cd.detectChanges();
      })
    );
  }

  onNew(value: any, user: any): void {
    if (!user) {
      this.util.openSnackbar('请登录！', 'ok');
      return;
    }
    const {
      params: { api },
    } = this.content;
    this.nodeService.addEntify(api, value, user.csrf_token).subscribe(res => {
      console.log(res);
      this.getItems('noCache=true');
      this.form.reset();
      this.showForm = false;
      this.cd.detectChanges();
    });
  }

  onDelete(item: any, user: any): void {
    if (!user) {
      this.util.openSnackbar('请登录！', 'ok');
      return;
    }
    const {
      params: { api },
    } = this.content;
    this.nodeService.deleteEntity(api, item.id, user.csrf_token).subscribe(res => {
      this.util.openSnackbar('删除成功！', 'ok');
      this.getItems('noCache=true');
    });
  }
}
