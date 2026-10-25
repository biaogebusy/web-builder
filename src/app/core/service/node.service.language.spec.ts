import { HttpClient } from '@angular/common/http';
import { computed, DOCUMENT, ElementRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { BuilderPageState } from '@core/state/BuilderPageState';
import { BuilderState } from '@core/state/BuilderState';
import { API_URL } from '@core/token/token-providers';
import { CommentService } from './comment.service';
import { MediaUploadService } from './media-upload.service';
import { NodeService } from './node.service';

 describe('NodeService language without builder initialization', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: API_URL, useValue: '' },
        { provide: DOCUMENT, useValue: { location: { pathname: '/about', search: '' } } },
        { provide: HttpClient, useValue: {} },
        { provide: CommentService, useValue: {} },
        { provide: MediaUploadService, useValue: {} },
        { provide: BuilderState, useFactory: () => { throw new Error('Builder must stay lazy'); } },
      ],
    });
  });

  afterEach(() => TestBed.resetTestingModule());

  it('uses public URL language without creating or populating drafts', () => {
    const service = TestBed.inject(NodeService);
    const drafts = TestBed.inject(BuilderPageState);
    expect(service.resolveLangCode()).toBeUndefined();
    expect(drafts.version()).toEqual([]);
    TestBed.inject(DOCUMENT).location.pathname = '/en/about';
    expect(service.resolveLangCode()).toBe('en');
  });

  it('tracks draft language reactively only inside a canvas', () => {
    const service = TestBed.inject(NodeService);
    const drafts = TestBed.inject(BuilderPageState);
    const canvas = document.createElement('div');
    canvas.className = 'component-item';
    const language = computed(() => service.resolveLangCode(new ElementRef(canvas)));
    expect(language()).toBeUndefined();
    drafts.version.set([{ title: 'English', body: [], langcode: 'en', current: true }]);
    expect(language()).toBe('en');
    expect(service.resolveLangCode()).toBeUndefined();
    drafts.version.set([{ title: 'Default', body: [], langcode: 'zh-hans', current: true }]);
    expect(language()).toBeUndefined();
  });
});
