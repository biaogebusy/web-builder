import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { cmsWriteContext } from '@core/config/cms-http-context';
import type { IManageAssets, IManageImg, MediaCapabilities } from '@core/interface/manage/IManage';
import { ApiService } from './api.service';
import { map } from 'rxjs';

/** Owns authenticated media discovery and writes; public references use a separate projection. */
@Injectable({ providedIn: 'root' })
export class MediaLibraryService extends ApiService {
  private get endpoint(): string { return `${this.apiUrl}/api/v3/media`; }

  /** Reads upload policies and the current account's available scopes. */
  capabilities() {
    return this.http.get<MediaCapabilities>(`${this.endpoint}/capabilities`);
  }

  /** Reads a bounded cursor page without exposing other owners' totals. */
  list(filters: Record<string, unknown>) {
    let params = new HttpParams();
    for (const key of ['cursor', 'name', 'kind', 'purpose', 'scope']) {
      const value = filters[key];
      if (typeof value === 'string' && value) params = params.set(key, value);
    }
    return this.http.get<IManageAssets>(this.endpoint, { params });
  }

  /** Uploads one file atomically; the CMS assigns both media and file identities. */
  upload(bundle: string, filename: string, bytes: ArrayBuffer) {
    return this.http.post<IManageImg>(`${this.endpoint}/${encodeURIComponent(bundle)}/upload`, bytes, {
      headers: {
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': `file; filename="${encodeURIComponent(filename)}"`,
      },
      context: cmsWriteContext(),
    }).pipe(map(media => {
      if (!media?.uuid || !media.fileId || media.uuid === media.fileId || !media.source) {
        throw new Error('Invalid completed media response');
      }
      return media;
    }));
  }

  /** Removes library discovery while preserving existing file and media references. */
  remove(uuid: string) {
    return this.http.delete<void>(`${this.endpoint}/${encodeURIComponent(uuid)}`, {
      context: cmsWriteContext(),
    });
  }

  /** Renames only when the server grants update and name-field access. */
  rename(uuid: string, name: string) {
    return this.http.patch<IManageImg>(`${this.endpoint}/${encodeURIComponent(uuid)}`, { name }, {
      context: cmsWriteContext(),
    });
  }

  /** Resolves an existing public image UUID without granting library membership. */
  display(uuid: string) {
    return this.http.get<{ src: string; alt: string }>(
      `${this.endpoint}/${encodeURIComponent(uuid)}/display`
    );
  }

  /** Uses HttpClient so private downloads receive the shared authentication policy. */
  file(uuid: string) {
    return this.http.get(`${this.endpoint}/${encodeURIComponent(uuid)}/file`, {
      responseType: 'blob',
    });
  }
}
