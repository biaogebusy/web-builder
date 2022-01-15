import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleCommentListComponent } from './article-comment-list.component';

describe('ArticleCommentListComponent', () => {
  let component: ArticleCommentListComponent;
  let fixture: ComponentFixture<ArticleCommentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleCommentListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleCommentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
