import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionCommentComponent } from './question-comment.component';

describe('QuestionCommentComponent', () => {
  let component: QuestionCommentComponent;
  let fixture: ComponentFixture<QuestionCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionCommentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
