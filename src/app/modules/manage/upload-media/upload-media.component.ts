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
import { Observable, Subject, of } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-upload-media',
  templateUrl: './upload-media.component.html',
  styleUrl: './upload-media.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploadMediaComponent {
  files: IMediaAttr[] = [];
  filesEntry: NgxFileDropEntry[];
  destroy$: Subject<boolean> = new Subject<boolean>();
  cd = inject(ChangeDetectorRef);
  util = inject(UtilitiesService);
  nodeService = inject(NodeService);
  user: IUser;
  constructor(@Inject(USER) private user$: Observable<IUser>) {
    this.user$.pipe(takeUntil(this.destroy$)).subscribe((user) => {
      this.user = user;
    });
  }

  dropped(files: NgxFileDropEntry[]): void {
    this.filesEntry = files;
    this.cd.detectChanges();
    if (!this.user) {
      this.util.openSnackbar('请先登录', 'ok');
    }
    for (const droppedFile of files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          if (file) {
            const reader = new FileReader();
            reader.onload = async (e: any) => {
              const data = e.target.result;
              const imgAttr = await this.nodeService
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
                .toPromise();

              this.files.push(imgAttr as IMediaAttr);
              this.cd.detectChanges();
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
