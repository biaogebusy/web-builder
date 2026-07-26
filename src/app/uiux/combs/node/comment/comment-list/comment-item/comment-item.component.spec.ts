import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { NodeService } from '@core/service/node.service';
import { ScreenService } from '@core/service/screen.service';
import { UtilitiesService } from '@core/service/utilities.service';
import {
  createNodeServiceMock,
  createScreenServiceMock,
  createUtilitiesServiceMock,
} from '@core/testing/mocks';
import { provideUiuxMocks } from '@uiux/testing/mocks';
import { throwError } from 'rxjs';

import { CommentItemComponent } from './comment-item.component';

describe('CommentItemComponent', () => {
  let component: CommentItemComponent;
  let fixture: ComponentFixture<CommentItemComponent>;
  const screenService = createScreenServiceMock();
  const nodeService = createNodeServiceMock();
  const util = createUtilitiesServiceMock();

  beforeEach(async () => {
    vi.clearAllMocks();
    await TestBed.configureTestingModule({
      imports: [CommentItemComponent],
      providers: [
        provideRouter([]),
        ...provideUiuxMocks(),
        { provide: ScreenService, useValue: screenService },
        { provide: NodeService, useValue: nodeService },
        { provide: UtilitiesService, useValue: util },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CommentItemComponent);
    fixture.componentRef.setInput('content', {});
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('enters reply mode anchored to the picked comment', () => {
    component.onReply({ item: { id: 'c-1' } });

    expect(component.currentId).toBe('c-1');
    expect(component.showComment).toBe(true);
    expect(component.showActions).toBe(false);
    expect(component.type).toBe('reply');
    expect(component.currentData).toBe('');
    expect(screenService.scrollToAnchor).toHaveBeenCalledWith('q-c-1');
  });

  it('enters update mode preloading the comment body', () => {
    component.onUpdate({ item: { id: 'c-2', content: '<p>旧内容</p>' } });

    expect(component.currentId).toBe('c-2');
    expect(component.showComment).toBe(false);
    expect(component.showActions).toBe(false);
    expect(component.type).toBe('update');
    expect(component.currentData).toBe('<p>旧内容</p>');
  });

  it('cancel returns the item to its read-only state', () => {
    component.onUpdate({ item: { id: 'c-2', content: 'x' } });

    component.onCancel();

    expect(component.currentId).toBe('');
    expect(component.showComment).toBe(true);
    expect(component.showActions).toBe(true);
  });

  it('keeps other comments visible while one is being edited', () => {
    component.onUpdate({ item: { id: 'c-2', content: 'x' } });

    expect(component.onShow({ id: 'c-1' })).toBe(true);
    expect(component.onShow({ id: 'c-2' })).toBe(false);
  });

  it('deletes the comment against its field endpoint and confirms', () => {
    fixture.componentRef.setInput('content', {
      params: { comment: { attributes: { field_name: 'comment' } } },
    });

    component.onDelete('c-9');

    expect(nodeService.deleteEntity).toHaveBeenCalledWith('/api/v1/comment/comment', 'c-9');
    expect(component.loading).toBe(false);
    expect(util.openSnackbar).toHaveBeenCalledWith('您的回答已删除！', '√');
  });

  it('hints at the user state when deleting fails', () => {
    fixture.componentRef.setInput('content', {
      params: { comment: { attributes: { field_name: 'comment' } } },
    });
    nodeService.deleteEntity.mockReturnValueOnce(throwError(() => new Error('403')));

    component.onDelete('c-9');

    expect(component.loading).toBe(false);
    expect(util.openSnackbar).toHaveBeenCalledWith('Please check user state.', '√');
  });

  it('skips deleting when the node carries no comment params', () => {
    component.onDelete('c-9');

    expect(nodeService.deleteEntity).not.toHaveBeenCalled();
  });
});
