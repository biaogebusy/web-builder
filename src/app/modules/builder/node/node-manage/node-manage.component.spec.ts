import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { vi } from 'vitest';
import { provideBuilderMocks } from '@modules/builder/testing/mocks';
import { NodeManageComponent } from './node-manage.component';

describe('NodeManageComponent', () => {
  let component: NodeManageComponent;
  let fixture: ComponentFixture<NodeManageComponent>;

  const setup = async () => {
    await TestBed.configureTestingModule({
      imports: [NodeManageComponent],
      providers: [provideRouter([]), ...provideBuilderMocks()],
    }).compileComponents();
    fixture = TestBed.createComponent(NodeManageComponent);
    component = fixture.componentInstance;
    vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
  };

  it('编辑入口携带行的语言参数,默认语言不带参数', async () => {
    await setup();
    const row = {
      type: 'news',
      uuid: 'u1',
      title: 't',
      status: true,
      langcode: 'en',
      changed: '',
      path: '',
    };

    component.onEdit(row);
    expect(TestBed.inject(Router).navigate).toHaveBeenCalledWith(
      ['/builder/node/edit', 'news', 'u1'],
      { queryParams: { lang: 'en' } }
    );

    // The default language needs no param: the prefix-less edit URL serves it
    component.onEdit({ ...row, langcode: 'zh-hans' });
    expect(TestBed.inject(Router).navigate).toHaveBeenLastCalledWith(
      ['/builder/node/edit', 'news', 'u1'],
      { queryParams: {} }
    );
  });
});
