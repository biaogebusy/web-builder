import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { NodeService } from '@core/service/node.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { USER } from '@core/token/token-providers';
import {
  createNodeServiceMock,
  createUtilitiesServiceMock,
} from '@core/testing/mocks';
import { provideUiuxMocks } from '@uiux/testing/mocks';
import { throwError } from 'rxjs';

import { CommentFormComponent } from './comment-form.component';

describe('CommentFormComponent', () => {
  let component: CommentFormComponent;
  let fixture: ComponentFixture<CommentFormComponent>;
  const nodeService = createNodeServiceMock();
  const util = createUtilitiesServiceMock();

  beforeEach(async () => {
    vi.clearAllMocks();
    await TestBed.configureTestingModule({
      imports: [CommentFormComponent],
      providers: [
        provideRouter([]),
        ...provideUiuxMocks(),
        { provide: NodeService, useValue: nodeService },
        { provide: UtilitiesService, useValue: util },
        { provide: USER, useValue: signal({ id: 'u-1', access_token: 'tok-1' }) },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CommentFormComponent);
    fixture.componentRef.setInput('content', {
      params: {
        comment: {
          type: 'comment--comment',
          attributes: { field_name: 'comment' },
        },
      },
    });
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('adds a comment with the rich-text body and the user token, then resets the editor', () => {
    component.commentContent.set('<p>草稿</p>');

    component.onSubmit('<p>你好</p>');

    expect(nodeService.addComment).toHaveBeenCalledWith(
      'comment',
      expect.objectContaining({
        type: 'comment--comment',
        attributes: expect.objectContaining({
          comment_body: { value: '<p>你好</p>', format: 'full_html' },
        }),
      }),
      'tok-1'
    );
    expect(component.commentContent()).toBe('');
    expect(component.loading).toBe(false);
    expect(util.openSnackbar).toHaveBeenCalledWith('提交成功！');
  });

  it('replies to the referenced comment through the pid relationship', () => {
    fixture.componentRef.setInput('type', 'reply');
    fixture.componentRef.setInput('commentId', 'comment-9');

    component.onSubmit('<p>回复</p>');

    expect(nodeService.replyComment).toHaveBeenCalledWith(
      'comment',
      expect.objectContaining({
        relationships: expect.objectContaining({
          pid: { data: { type: 'comment--comment', id: 'comment-9' } },
        }),
      }),
      'tok-1'
    );
    expect(util.openSnackbar).toHaveBeenCalledWith('回复成功！');
  });

  it('updates the comment with the author relationship', () => {
    fixture.componentRef.setInput('type', 'update');
    fixture.componentRef.setInput('commentId', 'comment-9');

    component.onSubmit('<p>更新</p>');

    expect(nodeService.updateComment).toHaveBeenCalledWith(
      'comment',
      expect.objectContaining({
        id: 'comment-9',
        relationships: expect.objectContaining({
          uid: { data: { type: 'user--user', id: 'u-1' } },
        }),
      }),
      'comment-9',
      'tok-1'
    );
  });

  it('surfaces the failure and stops loading when adding fails', () => {
    nodeService.addComment.mockReturnValueOnce(throwError(() => new Error('boom')));

    component.onSubmit('<p>你好</p>');

    expect(component.loading).toBe(false);
    expect(util.openSnackbar).toHaveBeenCalledWith('提交失败！');
  });
});
