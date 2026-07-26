import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ContentState } from '@core/state/ContentState';
import { USER } from '@core/token/token-providers';
import { provideUiuxMocks } from '@uiux/testing/mocks';

import { CommentActionsComponent } from './comment-actions.component';

describe('CommentActionsComponent', () => {
  let component: CommentActionsComponent;
  let fixture: ComponentFixture<CommentActionsComponent>;

  beforeEach(async () => {
    vi.clearAllMocks();
    await TestBed.configureTestingModule({
      imports: [CommentActionsComponent],
      providers: [
        provideRouter([]),
        ...provideUiuxMocks(),
        { provide: USER, useValue: signal({ id: 'u-1' }) },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CommentActionsComponent);
    fixture.componentRef.setInput('config', {});
    fixture.componentRef.setInput('item', { id: 'c-1', author: { id: 'u-1' } });
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('emits the comment for updating and replying', () => {
    const updated = vi.fn();
    const replied = vi.fn();
    component.update.subscribe(updated);
    component.reply.subscribe(replied);

    component.onUpdate();
    component.onReply();

    expect(updated).toHaveBeenCalledWith({ item: { id: 'c-1', author: { id: 'u-1' } } });
    expect(replied).toHaveBeenCalledWith({ item: { id: 'c-1', author: { id: 'u-1' } } });
  });

  it('emits the id of the comment to delete', () => {
    const deleted = vi.fn();
    component.delete.subscribe(deleted);

    component.onDelete('c-1');

    expect(deleted).toHaveBeenCalledWith('c-1');
  });

  it('pushes the comment into the quote stream', () => {
    const contentState = TestBed.inject(ContentState);
    const quoted = vi.fn();
    contentState.commentQuote$.subscribe(quoted);

    component.onQuote();

    expect(quoted).toHaveBeenCalledWith({ id: 'c-1', author: { id: 'u-1' } });
  });

  it('marks only own comments that are not being edited as mine', () => {
    expect(component.isMy()).toBe(true);

    fixture.componentRef.setInput('currentId', 'c-1');
    expect(component.isMy()).toBe(false);

    fixture.componentRef.setInput('currentId', '');
    fixture.componentRef.setInput('item', { id: 'c-1', author: { id: 'u-2' } });
    expect(component.isMy()).toBe(false);
  });
});
