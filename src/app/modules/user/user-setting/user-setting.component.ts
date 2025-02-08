import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  OnInit,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { IUser } from '@core/interface/IUser';
import { UserService } from '@core/service/user.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { USER } from '@core/token/token-providers';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { LocalStorageService } from 'ngx-webstorage';
import { Observable, catchError, of } from 'rxjs';

@Component({
  selector: 'app-user-setting',
  templateUrl: './user-setting.component.html',
  styleUrl: './user-setting.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserSettingComponent implements OnInit {
  user$ = inject<Observable<IUser>>(USER);

  form = new FormGroup({});
  model: any = {};
  fields: FormlyFieldConfig[];
  loading = true;

  dialog = inject(MatDialog);
  userService = inject(UserService);
  util = inject(UtilitiesService);
  storage = inject(LocalStorageService);
  private cd = inject(ChangeDetectorRef);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.user$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((user: IUser) => {
      this.loading = false;
      if (user) {
        this.fields = [
          {
            type: 'tabs',
            fieldGroup: [
              {
                props: {
                  label: '基础信息',
                },
                fieldGroup: [
                  {
                    key: 'name',
                    type: 'input',
                    defaultValue: user.current_user.name,
                    props: {
                      label: '用户名',
                      placeholder: '输入用户名',
                      min: 2,
                      max: 20,
                    },
                  },
                  {
                    key: 'full_name',
                    type: 'input',
                    defaultValue: user.display_name ?? '',
                    props: {
                      label: '昵称',
                      placeholder: '输入昵称',
                      min: 2,
                    },
                  },
                  {
                    key: 'mail',
                    type: 'input',
                    defaultValue: user.mail ?? '',
                    props: {
                      label: '邮箱',
                      placeholder: '请输入邮箱',
                    },
                    validators: {
                      email: {
                        expression: (control: any) =>
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(control.value),
                        message: (_: any, field: any) =>
                          `"${field.formControl?.value}"不是有效的邮箱格式`,
                      },
                    },
                  },
                  {
                    key: 'pass',
                    fieldGroup: [
                      {
                        key: 'existing',
                        type: 'input',
                        props: {
                          label: '当前密码',
                          placeholder: '请输入当前密码',
                          type: 'password',
                        },
                        validation: {
                          messages: {
                            required: '修改以上信息要求验证密码',
                          },
                        },
                        expressions: {
                          'props.required': (field: FormlyFieldConfig) => {
                            return !(field.parent?.parent?.model?.mail === user.mail);
                          },
                        },
                      },
                    ],
                    expressions: {
                      hide: (field: FormlyFieldConfig) => {
                        return field.parent?.model?.mail === user.mail;
                      },
                    },
                  },
                ],
              },
              {
                props: {
                  label: '密码',
                },
                fieldGroup: [
                  {
                    key: 'pass',
                    fieldGroup: [
                      {
                        key: 'value',
                        type: 'input',
                        props: {
                          label: '新密码',
                          placeholder: '请输入新密码',
                          type: 'password',
                          minLength: 6,
                        },
                        modelOptions: {
                          updateOn: 'blur',
                        },
                      },
                      {
                        key: 'confirm',
                        type: 'input',
                        props: {
                          label: '确认密码',
                          placeholder: '请再次输入新密码',
                          type: 'password',
                        },
                        expressions: {
                          'props.required': (field: FormlyFieldConfig) => {
                            return !!field.parent?.model?.value;
                          },
                        },
                        validators: {
                          fieldMatch: {
                            expression: (control: any) => control.value === this.model.pass?.value,
                            message: '确认密码与新密码不一致。',
                          },
                        },
                      },
                      {
                        key: 'existing',
                        type: 'input',
                        props: {
                          label: '当前密码',
                          placeholder: '请输入当前密码',
                          type: 'password',
                        },
                        validation: {
                          messages: {
                            required: '修改以上信息要求验证密码',
                          },
                        },
                        expressions: {
                          'props.required': (field: FormlyFieldConfig) => {
                            return !!field.parent?.model?.value;
                          },
                        },
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ];
      }
      this.cd.detectChanges();
    });
  }

  onUpdate(value: any, user: IUser): void {
    this.loading = true;
    // remove confirm value
    const formData = Object.assign({}, value);
    delete formData.pass.confirm;
    this.userService
      .editingUser(user, formData)
      .pipe(
        catchError(error => {
          return of(false);
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((res: any) => {
        if (res) {
          this.userService.updateUserBySession();
          this.util.openSnackbar('更新成功！', 'ok');
        } else {
          this.util.openSnackbar('更新失败！', 'ok');
        }
        this.loading = false;
        this.cd.detectChanges();
      });
  }

  onLogout(): void {
    this.loading = true;
    const logoutToken = this.storage.retrieve(this.userService.logoutToken);
    this.userService.logout(logoutToken);
    this.userService.userSub$.subscribe(user => {
      if (!user) {
        this.loading = false;
        this.dialog.closeAll();
      }
    });
  }
}
