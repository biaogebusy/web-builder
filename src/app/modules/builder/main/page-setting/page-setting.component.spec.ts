import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { provideRouter } from '@angular/router';
import { BuilderService } from '@core/service/builder.service';
import { NodeService } from '@core/service/node.service';
import { ScreenService } from '@core/service/screen.service';
import { UserService } from '@core/service/user.service';
import {
  createBuilderServiceMock,
  createNodeServiceMock,
  createScreenServiceMock,
  createUserServiceMock,
} from '@core/testing/mocks';
import { USER } from '@core/token/token-providers';
import { provideBuilderMocks } from '@modules/builder/testing/mocks';
import { of } from 'rxjs';

import { PageSettingComponent } from './page-setting.component';

describe('PageSettingComponent', () => {
  let component: PageSettingComponent;
  let fixture: ComponentFixture<PageSettingComponent>;
  const userService = createUserServiceMock();
  const builderService = createBuilderServiceMock();
  const nodeService = createNodeServiceMock();
  const screenService = createScreenServiceMock();
  const user = signal<unknown>(false);

  // MatDialog 由组件 standalone imports 内的模块提供,须 spy 实际实例
  const confirmWith = (result: boolean) => {
    const dialog = fixture.debugElement.injector.get(MatDialog);
    return vi
      .spyOn(dialog, 'open')
      .mockReturnValue({ afterClosed: () => of(result) } as unknown as MatDialogRef<unknown>);
  };

  // ngOnInit 只在浏览器端建表单,登录用户才可删除
  const initAs = (langcode: string): void => {
    user.set({ id: 'user-1' });
    screenService.isPlatformBrowser.mockReturnValue(true);
    fixture.componentRef.setInput('content', {
      content: {
        data: {
          id: 'uuid-7',
          type: 'node--landing_page',
          attributes: {
            title: 'Home',
            langcode,
            drupal_internal__nid: 7,
            changed: '2026-08-14',
            path: { alias: '/home' },
            meta_tags: {},
          },
        },
        included: [{ type: 'user--user', attributes: { display_name: 'admin' } }],
      },
    });
    component.ngOnInit();
  };

  beforeEach(async () => {
    vi.clearAllMocks();
    user.set(false);
    screenService.isPlatformBrowser.mockReturnValue(false);
    await TestBed.configureTestingModule({
      imports: [PageSettingComponent],
      providers: [
        provideRouter([]),
        ...provideBuilderMocks(),
        { provide: UserService, useValue: userService },
        { provide: BuilderService, useValue: builderService },
        { provide: NodeService, useValue: nodeService },
        { provide: ScreenService, useValue: screenService },
        { provide: USER, useValue: user },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PageSettingComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('sends signed-out users to the login dialog instead of updating', async () => {
    await component.onUpdate({ type: 'node--landing_page' });

    expect(userService.openLoginDialog).toHaveBeenCalled();
  });

  it('sends signed-out users to the login dialog instead of deleting', () => {
    component.deletePage({ type: 'node--landing_page' });

    expect(userService.openLoginDialog).toHaveBeenCalled();
  });

  it('deletes only the current translation for a non default language page', () => {
    initAs('en');
    confirmWith(true);

    component.deletePage({ type: 'node--landing_page' });

    expect(component.isTranslation).toBe(true);
    expect(builderService.deleteTranslation).toHaveBeenCalledWith(7, 'en');
    expect(nodeService.deleteEntity).not.toHaveBeenCalled();
  });

  it('warns that every language version goes away before deleting the source language', () => {
    initAs('zh-hans');
    const open = confirmWith(true);

    component.deletePage({ type: 'node--landing_page' });

    const config: any = open.mock.calls[0][1];
    expect(config.data.inputData.content.body).toBe('BUILDER.PAGE_SETTING.DELETE_ALL_LANG_CONFIRM');
    expect(component.isTranslation).toBe(false);
    expect(nodeService.deleteEntity).toHaveBeenCalledWith('/api/v1/node/landing_page', 'uuid-7');
    expect(builderService.deleteTranslation).not.toHaveBeenCalled();
  });

  it('keeps the page when the delete dialog is cancelled', () => {
    initAs('zh-hans');
    confirmWith(false);

    component.deletePage({ type: 'node--landing_page' });

    expect(nodeService.deleteEntity).not.toHaveBeenCalled();
    expect(builderService.deleteTranslation).not.toHaveBeenCalled();
  });
});
