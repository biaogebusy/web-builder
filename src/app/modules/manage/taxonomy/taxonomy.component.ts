import {
  Component,
  ChangeDetectionStrategy,
  Input,
  OnInit,
  inject,
  DestroyRef,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup } from '@angular/forms';
import { ITaxonomy } from '@core/interface/manage/ITaxonomy';
import { NodeService } from '@core/service/node.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { USER } from '@core/token/token-providers';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-taxonomy',
  templateUrl: './taxonomy.component.html',
  styleUrl: './taxonomy.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaxonomyComponent implements OnInit {
  @Input() content: ITaxonomy;
  items$: Observable<any>;

  nodeService = inject(NodeService);
  util = inject(UtilitiesService);
  user$ = inject(USER);
  destroyRef = inject(DestroyRef);

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
    const {
      params: { api },
    } = this.content;
    this.items$ = this.nodeService.fetch(api, params).pipe(takeUntilDestroyed(this.destroyRef));
  }

  onNew(value: any, user: any): void {
    if (!user) {
      this.util.openSnackbar('请登录！', 'ok');
      return;
    }
    const {
      params: { api },
    } = this.content;
    this.nodeService
      .addEntify(api, value, user.csrf_token)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(res => {
        console.log(res);
        this.getItems('noCache=true');
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
    this.nodeService
      .deleteEntity(api, item.id, user.csrf_token)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(res => {
        this.util.openSnackbar('删除成功！', 'ok');
        this.getItems('noCache=true');
      });
  }
}
