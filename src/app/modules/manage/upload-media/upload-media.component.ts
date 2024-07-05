import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  inject,
} from '@angular/core';
import { IUser } from '@core/interface/IUser';
import { IMediaAttr } from '@core/interface/manage/IManage';
import { NodeService } from '@core/service/node.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { USER } from '@core/token/token-providers';
import {
  NgxFileDropEntry,
  FileSystemFileEntry,
  FileSystemDirectoryEntry,
} from 'ngx-file-drop';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-upload-media',
  templateUrl: './upload-media.component.html',
  styleUrl: './upload-media.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploadMediaComponent {
  files: IMediaAttr[] = [];
  loading: boolean;

  cd = inject(ChangeDetectorRef);
  util = inject(UtilitiesService);
  nodeService = inject(NodeService);

  constructor(@Inject(USER) private user: IUser) {}

  dropped(files: NgxFileDropEntry[]): void {
    if (!this.user) {
      this.util.openSnackbar('请先登录', 'ok');
    }
    for (const droppedFile of files) {
      this.loading = true;
      this.cd.detectChanges();
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          if (file) {
            const reader = new FileReader();
            reader.onload = (e: any) => {
              const data = e.target.result;
              this.nodeService
                .uploadImage(file.name, data, this.user.csrf_token)
                .pipe(
                  catchError((error) => {
                    this.util.openSnackbar(
                      `上传异常：${error.statusText}`,
                      'ok',
                    );
                    return of(false);
                  }),
                )
                .subscribe((img: IMediaAttr | boolean) => {
                  this.loading = false;
                  this.cd.detectChanges();
                  if (img) {
                    this.files.push(img as IMediaAttr);
                  }
                });
            };
            reader.readAsArrayBuffer(file);
          }
        });
      } else {
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }
  onCopy(url: string): void {
    this.util.copy(url);
    this.util.openSnackbar('已复制图片地址', 'ok');
  }
}
