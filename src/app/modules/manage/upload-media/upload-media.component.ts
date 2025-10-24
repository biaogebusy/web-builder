import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IUser } from '@core/interface/IUser';
import { IMediaAttr } from '@core/interface/manage/IManage';
import { ManageService } from '@core/service/manage.service';
import { NodeService } from '@core/service/node.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { USER } from '@core/token/token-providers';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { Observable, lastValueFrom, of } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Component({
  selector: 'app-upload-media',
  templateUrl: './upload-media.component.html',
  styleUrl: './upload-media.component.scss',
  standalone: false,
})
export class UploadMediaComponent {
  private user$ = inject<Observable<IUser>>(USER);

  public files = signal<IMediaAttr[]>([]);
  public filesEntry = signal<NgxFileDropEntry[]>([]);
  private util = inject(UtilitiesService);
  private nodeService = inject(NodeService);
  private destroyRef = inject(DestroyRef);
  private manageService = inject(ManageService);
  user: IUser;

  constructor() {
    this.user$.pipe(takeUntilDestroyed()).subscribe(user => {
      this.user = user;
    });
  }

  async dropped(files: NgxFileDropEntry[]): Promise<void> {
    this.filesEntry.set(files);
    if (!this.user) {
      this.util.openSnackbar('请先登录', 'ok');
      return;
    }
    for (const droppedFile of files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        try {
          const file = await new Promise<File>((resolve, reject) => {
            fileEntry.file((entry: File) => resolve(entry));
          });

          if (file) {
            const data = await this.manageService.readFileAsArrayBuffer(file);

            const imgAttr = await lastValueFrom(
              this.nodeService.uploadImage(file.name, data, this.user.csrf_token).pipe(
                catchError(error => {
                  this.util.openSnackbar(`上传异常：${error.statusText}`, 'ok');
                  return of(false);
                }),
                retry(2),
                takeUntilDestroyed(this.destroyRef)
              )
            );

            if (imgAttr) {
              this.files.set([...this.files(), imgAttr as IMediaAttr]);
            }
          }
        } catch (error) {
          console.error('文件读取或上传失败:', error);
          this.util.openSnackbar('文件读取或上传失败', 'ok');
        }
      } else {
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log('不支持上传目录:', droppedFile.relativePath, fileEntry);
        this.util.openSnackbar('不支持上传目录', 'ok');
      }
    }
  }
  onCopy(url: string): void {
    this.util.copy(url);
    this.util.openSnackbar('已复制图片地址', 'ok');
  }
}
