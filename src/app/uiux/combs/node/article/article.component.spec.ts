import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import type { ICoreConfig } from '@core/interface/IAppConfig';
import type { IBaseNode } from '@core/interface/node/INode';
import { NodeService } from '@core/service/node.service';
import { ScreenService } from '@core/service/screen.service';
import { TagsService } from '@core/service/tags.service';
import { UserService } from '@core/service/user.service';
import { ContentState } from '@core/state/ContentState';
import { CORE_CONFIG, USER } from '@core/token/token-providers';
import { NEVER } from 'rxjs';

import { ArticleComponent } from './article.component';

describe('ArticleComponent', () => {
  let fixture: ComponentFixture<ArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticleComponent],
      providers: [
        {
          provide: CORE_CONFIG,
          useValue: { article: { comment: { enable: false } } } as ICoreConfig,
        },
        { provide: USER, useValue: signal(false) },
        { provide: NodeService, useValue: { getCommentsWitchChild: vi.fn() } },
        { provide: ScreenService, useValue: { isPlatformBrowser: () => true } },
        { provide: TagsService, useValue: { highlightCode: vi.fn(), setTitle: vi.fn() } },
        { provide: UserService, useValue: { userSub$: NEVER } },
        { provide: ContentState, useValue: { commentChange: signal(false) } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ArticleComponent);
    fixture.componentRef.setInput('content', {
      body: '<p>Complete article body</p>',
      params: {},
      title: 'Article title',
    } as IBaseNode);
  });

  it('renders the complete body without access-gated preview or login prompt', async () => {
    await fixture.whenStable();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('.article-body .m-y-sm')?.innerHTML).toContain(
      'Complete article body'
    );
    expect(element.querySelector('.shadow')).toBeNull();
    expect(element.querySelector('.auth')).toBeNull();
  });
});
