export interface IManageAssets {
  rows: IManageImg[];
  nextCursor: string | null;
  scope: 'mine' | 'all';
}

export interface IManageImg {
  title: string;
  thumb?: string;
  source?: string;
  id: string;
  uuid: string;
  src: string;
  vl?: string;
  kind?: MediaKind;
  filename?: string;
  size?: number;
  private?: boolean;
  download?: string;
  canRename?: boolean;
  canRemove?: boolean;
  /** Media bundle, when supplied by the catalog. */
  bundle?: string;
  /** File identity is distinct from the media UUID in uuid. */
  fileId?: string;
  /** Server-reported MIME type of the source file, never its thumbnail. */
  mimeType?: string;
}

/** Limits selection by the consuming component, independently of upload support. */
export type MediaSelectionPurpose = 'web-image' | 'image-media' | 'raster-image';

export interface IManageMedia {
  type: 'manage-media';
  time: Date;
  mode?: 'manage';
  /** Defaults to web images; entity references and model inputs use narrower purposes. */
  purpose?: MediaSelectionPurpose;
}

export interface IMediaSelect {
  src: string;
  alt: string;
  fileName: string;
  tag: 'img';
  uuid: string;
  /** Source identity and format accompany the original URL for downstream validation. */
  fileId?: string;
  bundle?: string;
  mimeType?: string;
}

export interface ISelectedMedia {
  img: IMediaSelect;
  value: IManageMedia;
  time?: Date;
}

export interface IMediaAttr {
  changed?: string;
  created?: string;
  drupal_internal__fid?: number;
  filemime: string;
  filename: string;
  filesize: number;
  langcode?: string;
  status?: boolean;
  uri: {
    url: string;
    value: string;
  };
}

/** A completed upload includes both the created media and its source file. */
export interface IMediaUploadResult extends IMediaAttr {
  /** Media UUID, matching media-library selections. */
  uuid: string;
  /** Explicit media identity for consumers that do not use the image selection shape. */
  mediaId: string;
  /** Source file UUID, used to pin references to the uploaded file. */
  fileId: string;
}

/** Supported catalog categories; business attachment stores keep their own authority. */
export type MediaKind = 'image' | 'vector' | 'document' | 'audio' | 'video';

/** Server-advertised upload policy for one configured media source. */
export interface MediaTypeCapability {
  bundle: string;
  kind: MediaKind;
  label: string;
  extensions: string[];
  maxBytes: number;
  scheme: string;
  canUpload: boolean;
}

/** Capabilities describe the current authenticated account, never a role-name heuristic. */
export interface MediaCapabilities {
  types: MediaTypeCapability[];
  canViewAll: boolean;
}
