import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  Injector,
  OnInit,
  effect,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { IDialog } from '@core/interface/IDialog';
import { IUser } from '@core/interface/IUser';
import { UserService } from '@core/service/user.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { readFileAsArrayBuffer } from '@core/util/file.util';
import { USER } from '@core/token/token-providers';
import { FormlyComponent } from '@uiux/combs/form/formly/formly.component';
import { BtnComponent } from '@uiux/widgets/btn/btn.component';
import { DialogComponent } from '@uiux/widgets/dialog/dialog.component';
import { LoadingComponent } from '@uiux/widgets/loading/loading.component';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-user-setting',
  templateUrl: './user-setting.component.html',
  styleUrl: './user-setting.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatTooltipModule, TranslateModule, FormlyComponent, BtnComponent, LoadingComponent],
})
export class UserSettingComponent implements OnInit {
  public user = inject(USER);
  public form = new FormGroup({});
  public model: any = {};
  public fields: FormlyFieldConfig[];
  public options: FormlyFormOptions = {};
  private initialModel: any = {};
  public loading = signal<boolean>(true);

  private translate = inject(TranslateService);
  private dialog = inject(MatDialog);
  private userService = inject(UserService);
  private util = inject(UtilitiesService);
  private cd = inject(ChangeDetectorRef);
  private destroyRef = inject(DestroyRef);
  private injector = inject(Injector);

  ngOnInit(): void {
    effect(() => {
      const user = this.user();
      if (typeof user !== 'object') return;
      this.loading.set(false);
      if (user) {
        const userMail = user.mail;
        this.fields = [
          {
            type: 'tabs',
            fieldGroup: [
              {
                props: {
                  label: this.t('TAB_BASIC'),
                },
                fieldGroup: [
                  {
                    key: 'name',
                    type: 'input',
                    defaultValue: user.current_user.name,
                    props: {
                      label: this.t('USERNAME_LABEL'),
                      placeholder: this.t('USERNAME_PLACEHOLDER'),
                      required: true,
                      minLength: 2,
                      maxLength: 20,
                    },
                  },
                  {
                    key: 'full_name',
                    type: 'input',
                    defaultValue: user.display_name ?? '',
                    props: {
                      label: this.t('FULL_NAME_LABEL'),
                      placeholder: this.t('FULL_NAME_PLACEHOLDER'),
                      min: 2,
                    },
                  },
                  {
                    key: 'mail',
                    type: 'input',
                    defaultValue: user.mail ?? '',
                    props: {
                      label: this.t('MAIL_LABEL'),
                      placeholder: this.t('MAIL_PLACEHOLDER'),
                      required: true,
                    },
                    validators: {
                      email: {
                        expression: (control: any) =>
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(control.value),
                        message: (_: any, field: any) =>
                          this.t('MAIL_INVALID', { value: field.formControl?.value }),
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
                          label: this.t('PASS_CURRENT_LABEL'),
                          placeholder: this.t('PASS_CURRENT_PLACEHOLDER'),
                          type: 'password',
                        },
                        validation: {
                          messages: {
                            required: this.t('PASS_CURRENT_REQUIRED'),
                          },
                        },
                        expressions: {
                          'props.required': (field: FormlyFieldConfig) => {
                            return !(field.parent?.parent?.model?.mail === userMail);
                          },
                        },
                      },
                    ],
                    expressions: {
                      hide: (field: FormlyFieldConfig) => {
                        return field.parent?.model?.mail === userMail;
                      },
                    },
                  },
                ],
              },
              {
                props: {
                  label: this.t('TAB_PASSWORD'),
                },
                fieldGroup: [
                  {
                    key: 'pass',
                    fieldGroup: [
                      {
                        key: 'value',
                        type: 'input',
                        props: {
                          label: this.t('PASS_NEW_LABEL'),
                          placeholder: this.t('PASS_NEW_PLACEHOLDER'),
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
                          label: this.t('PASS_CONFIRM_LABEL'),
                          placeholder: this.t('PASS_CONFIRM_PLACEHOLDER'),
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
                            message: this.t('PASS_MISMATCH'),
                          },
                        },
                      },
                      {
                        key: 'existing',
                        type: 'input',
                        props: {
                          label: this.t('PASS_CURRENT_LABEL'),
                          placeholder: this.t('PASS_CURRENT_PLACEHOLDER'),
                          type: 'password',
                        },
                        validation: {
                          messages: {
                            required: this.t('PASS_CURRENT_REQUIRED'),
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
        // Snapshot the pristine model so reset restores saved values instead of blanking the form
        this.initialModel = {
          name: user.current_user.name,
          full_name: user.display_name ?? '',
          mail: user.mail ?? '',
        };
      }
      this.cd.detectChanges();
    }, { injector: this.injector });
  }

  onUpdate(value: any, user: IUser): void {
    this.loading.set(true);
    // remove confirm value
    const formData = Object.assign({}, value);
    delete formData.pass.confirm;
    this.userService
      .editingUser(user, formData)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          const u = this.user();
          if (typeof u === 'object') {
            this.userService.updateUser(u);
          }
          this.util.openSnackbar(this.t('UPDATE_SUCCESS'), 'ok');
          this.loading.set(false);
          this.cd.detectChanges();
        },
        error: (error: HttpErrorResponse) => {
          // Surface the backend reason (e.g. wrong password, mail taken) instead of a generic banner
          this.util.openSnackbar(this.t('UPDATE_FAILED', { reason: this.getErrorMessage(error) }), 'ok');
          this.loading.set(false);
          this.cd.detectChanges();
        },
      });
  }

  /** Shorthand for USER.SETTING.* translations used by this component */
  private t(key: string, params?: Record<string, unknown>): string {
    return this.translate.instant(`USER.SETTING.${key}`, params);
  }

  /** Restore the form to the last-saved values rather than blanking it out */
  onReset(): void {
    this.options.resetModel?.({ ...this.initialModel, pass: {} });
  }

  private getErrorMessage(error: HttpErrorResponse): string {
    const errors = (error as { error?: { errors?: { detail?: string }[] } })?.error?.errors;
    return errors?.[0]?.detail || this.t('ERROR_NETWORK');
  }

  onLogout(): void {
    // Destructive action: confirm before ending the session (user control and freedom)
    const config: IDialog = {
      title: this.t('LOGOUT_CONFIRM_TITLE'),
      yesLabel: this.t('LOGOUT_CONFIRM_YES'),
      noLabel: this.t('LOGOUT_CONFIRM_NO'),
      inputData: {
        content: {
          type: 'text',
          fullWidth: true,
          body: this.t('LOGOUT_CONFIRM_BODY'),
        },
      },
    };
    this.dialog
      .open(DialogComponent, { width: '360px', data: config })
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(result => {
        if (!result) {
          return;
        }
        this.userService.logout();
        this.dialog.closeAll();
      });
  }

  async handleFileChange(event: Event, user: IUser): Promise<void> {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    // Clear immediately so picking the same file again after a failure still fires change
    input.value = '';
    if (!file) {
      this.util.openSnackbar(this.t('AVATAR_FORMAT_INVALID'), 'ok');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      this.util.openSnackbar(this.t('AVATAR_TOO_LARGE'), 'ok');
      return;
    }

    this.loading.set(true);
    try {
      const data = await readFileAsArrayBuffer(file);
      this.userService
        .uploadUserPicture(user, data)
        .pipe(
          catchError(error => {
            return of(false);
          }),
          takeUntilDestroyed(this.destroyRef)
        )
        .subscribe(res => {
          if (res) {
            const u = this.user();
            if (typeof u === 'object') {
              this.userService.updateUser(u);
            }
            this.util.openSnackbar(this.t('AVATAR_UPLOAD_SUCCESS'), 'ok');
          } else {
            this.util.openSnackbar(this.t('AVATAR_UPLOAD_FAILED'), 'ok');
          }
          this.loading.set(false);
        });
    } catch (error) {
      this.util.openSnackbar(this.t('AVATAR_UPLOAD_FAILED'), 'ok');
      this.loading.set(false);
    }
  }
}
