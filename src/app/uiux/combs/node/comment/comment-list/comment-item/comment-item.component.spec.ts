import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ScreenService } from '@core/service/screen.service';
import { createScreenServiceMock } from '@core/testing/mocks';
import { provideUiuxMocks } from '@uiux/testing/mocks';

import { CommentItemComponent } from './comment-item.component';

describe('CommentItemComponent', () => {
  let component: CommentItemComponent;
  let fixture: ComponentFixture<CommentItemComponent>;
  const screenService = createScreenServiceMock();

  beforeEach(async () => {
    vi.clearAllMocks();
    await TestBed.configureTestingModule({
      imports: [CommentItemComponent],
      providers: [
        provideRouter([]),
        ...provideUiuxMocks(),
        { provide: ScreenService, useValue: screenService },
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
});
