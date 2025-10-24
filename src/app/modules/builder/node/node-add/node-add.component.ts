import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from '@core/interface/IUser';
import { NodeService } from '@core/service/node.service';
import { TagsService } from '@core/service/tags.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { USER } from '@core/token/token-providers';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-node-add',
  standalone: false,
  templateUrl: './node-add.component.html',
  styleUrl: './node-add.component.scss',
})
export class NodeAddComponent implements OnInit {
  private nodeService = inject(NodeService);
  private tagsService = inject(TagsService);
  private activateRoute = inject(ActivatedRoute);
  public user$ = inject(USER);
  private util = inject(UtilitiesService);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  public type = signal<string>('');
  public form: UntypedFormGroup = new UntypedFormGroup({});
  public fields = signal<FormlyFieldConfig[]>([]);

  ngOnInit(): void {
    this.activateRoute.params.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(params => {
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

  onSubmit(value: any, user: IUser | any): void {
    console.log(value);
    if (!user) {
      this.util.openSnackbar('请登录后再试！', 'ok');
      return;
    }
    const type = this.type();
    switch (type) {
      case 'json':
        const { title, body } = value;
        this.nodeService
          .addEntity(
            `/api/v1/node/${type}`,
            {
              title,
              status: true,
              body: JSON.stringify(body),
            },
            user.csrf_token
          )
          .subscribe(() => {
            this.router.navigate(['/builder/settings']);
          });
        break;
    }
  }
}
