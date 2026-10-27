import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { MediaLibraryService } from './media-library.service';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class ManageService extends ApiService {
  private library = inject(MediaLibraryService);
  public mediaDialogClass = ['close-outside', 'close-icon-white', 'manage-media-dialog'];

  constructor() {
    super();
  }

  /** Removes only the library entry, preserving all historical references. */
  deleteMedia(uuid: string): Observable<void> {
    return this.library.remove(uuid);
  }

  /** Resolves historical public images independently of management ownership. */
  getMediaImage(uuid: string) {
    return this.library.display(uuid);
  }

  /** Renames an authorized catalog asset. */
  updateMediaName(uuid: string, name: string) {
    return this.library.rename(uuid, name);
  }

  /** Loads an authorized image source when a private UUID has no public projection. */
  getMediaFile(uuid: string) {
    return this.library.file(uuid);
  }
}
