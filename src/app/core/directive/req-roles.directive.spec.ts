import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ReqRolesDirective } from '@core/directive/req-roles.directive';
import { UserService } from '@core/service/user.service';
import { USER } from '@core/token/token-providers';
import { IUser } from '@core/interface/IUser';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [ReqRolesDirective],
  template: `
    <div *reqRolesIf="content()" class="target">Secret Content</div>
  `,
})
class TestComponent {
  content = signal<any>(null);
}

describe('ReqRolesDirective', () => {
  const createUser = (roles: string[], uid = '42'): IUser =>
    ({
      access_token: 'tok',
      refresh_token: 'ref',
      token_type: 'Bearer',
      expires_in: 3600,
      expires_at: Date.now() + 3600_000,
      current_user: { roles, uid },
      authenticated: true,
      login: 'testuser',
      id: uid,
      roles,
    }) as IUser;

  const setup = (initialUser: IUser | false | null = null) => {
    const userSignal = signal<IUser | false | null>(initialUser);

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        { provide: USER, useValue: userSignal },
        {
          provide: UserService,
          useValue: {
            checkShow: vi.fn((content: any, user: IUser | undefined) => {
              // Replicate the real checkShow logic for testing the directive wiring.
              if (!content) return false;
              const roles = content.params?.reqRoles;
              if (!roles || !roles.length) return true;
              if (!user) return false;
              const currentUserRoles = user.current_user.roles;
              const uid = user.current_user.uid;
              return (
                roles.some((r: string) => currentUserRoles.includes(r)) || uid === '1'
              );
            }),
          },
        },
      ],
    });

    const fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();

    return {
      fixture,
      userSignal,
      component: fixture.componentInstance,
      userService: TestBed.inject(UserService),
      getTarget: () => fixture.debugElement.query(By.css('.target')),
    };
  };

  afterEach(() => {
    vi.restoreAllMocks();
    TestBed.resetTestingModule();
  });

  it('hides content when reqRolesIf is falsy', () => {
    const { getTarget } = setup();
    expect(getTarget()).toBeNull();
  });

  it('shows content when reqRoles points to content with no role restrictions', () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        { provide: USER, useValue: signal(null) },
        { provide: UserService, useValue: { checkShow: vi.fn(() => true) } },
      ],
    });

    const f = TestBed.createComponent(TestComponent);
    f.componentInstance.content.set({ params: {} });
    f.detectChanges();
    f.detectChanges();

    expect(f.debugElement.query(By.css('.target'))).not.toBeNull();
  });

  it('hides content when the user does not have a required role', () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        { provide: USER, useValue: signal(createUser(['viewer'])) },
        { provide: UserService, useValue: { checkShow: vi.fn(() => false) } },
      ],
    });

    const f = TestBed.createComponent(TestComponent);
    f.componentInstance.content.set({ params: { reqRoles: ['admin'] } });
    f.detectChanges();
    f.detectChanges();

    expect(f.debugElement.query(By.css('.target'))).toBeNull();
  });

  it('shows content when the user has a matching role', () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        { provide: USER, useValue: signal(createUser(['admin'])) },
        { provide: UserService, useValue: { checkShow: vi.fn(() => true) } },
      ],
    });

    const f = TestBed.createComponent(TestComponent);
    f.componentInstance.content.set({ params: { reqRoles: ['admin'] } });
    f.detectChanges();
    f.detectChanges();

    expect(f.debugElement.query(By.css('.target'))).not.toBeNull();
  });

  it('shows content for uid "1" (super admin) regardless of role list', () => {
    TestBed.resetTestingModule();
    const userSvc = { checkShow: vi.fn(() => true) };
    TestBed.configureTestingModule({
      providers: [
        { provide: USER, useValue: signal(createUser(['noob'], '1')) },
        { provide: UserService, useValue: userSvc },
      ],
    });

    const f = TestBed.createComponent(TestComponent);
    f.componentInstance.content.set({ params: { reqRoles: ['superadmin'] } });
    f.detectChanges();
    f.detectChanges();

    expect(f.debugElement.query(By.css('.target'))).not.toBeNull();
    expect(userSvc.checkShow).toHaveBeenCalled();
  });

  it('hides content when no user is logged in and roles are required', () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        { provide: USER, useValue: signal(null) },
        { provide: UserService, useValue: { checkShow: vi.fn(() => false) } },
      ],
    });

    const f = TestBed.createComponent(TestComponent);
    f.componentInstance.content.set({ params: { reqRoles: ['admin'] } });
    f.detectChanges();
    f.detectChanges();

    expect(f.debugElement.query(By.css('.target'))).toBeNull();
  });

  it('shows content when reqRoles is an empty array (no restrictions)', () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        { provide: USER, useValue: signal(null) },
        { provide: UserService, useValue: { checkShow: vi.fn(() => true) } },
      ],
    });

    const f = TestBed.createComponent(TestComponent);
    f.componentInstance.content.set({ params: { reqRoles: [] } });
    f.detectChanges();
    f.detectChanges();

    expect(f.debugElement.query(By.css('.target'))).not.toBeNull();
  });

  it('updates the view when the user signal changes', () => {
    TestBed.resetTestingModule();
    const userSignal = signal<IUser | null>(null);
    let showFlag = false;
    TestBed.configureTestingModule({
      providers: [
        { provide: USER, useValue: userSignal },
        {
          provide: UserService,
          useValue: { checkShow: vi.fn(() => showFlag) },
        },
      ],
    });

    const f = TestBed.createComponent(TestComponent);
    f.componentInstance.content.set({ params: { reqRoles: ['admin'] } });
    f.detectChanges();
    f.detectChanges();

    expect(f.debugElement.query(By.css('.target'))).toBeNull();

    // User logs in with admin role
    showFlag = true;
    userSignal.set(createUser(['admin']));
    f.detectChanges();
    f.detectChanges();

    expect(f.debugElement.query(By.css('.target'))).not.toBeNull();
  });

  it('updates the view when the reqRolesIf input changes', () => {
    TestBed.resetTestingModule();
    let result = false;
    const checkShow = vi.fn(() => result);
    TestBed.configureTestingModule({
      providers: [
        { provide: USER, useValue: signal(createUser(['admin'])) },
        { provide: UserService, useValue: { checkShow } },
      ],
    });

    const f = TestBed.createComponent(TestComponent);
    f.componentInstance.content.set({ params: { reqRoles: ['admin'] } });
    result = true;
    f.detectChanges();
    f.detectChanges();

    expect(f.debugElement.query(By.css('.target'))).not.toBeNull();
    expect(checkShow).toHaveBeenCalled();
  });

  it('passes the content and resolved user to userService.checkShow', () => {
    TestBed.resetTestingModule();
    const checkShow = vi.fn(() => true);
    const user = createUser(['editor']);
    TestBed.configureTestingModule({
      providers: [
        { provide: USER, useValue: signal(user) },
        { provide: UserService, useValue: { checkShow } },
      ],
    });

    const f = TestBed.createComponent(TestComponent);
    const content = { params: { reqRoles: ['editor'] } };
    f.componentInstance.content.set(content);
    f.detectChanges();
    f.detectChanges();

    expect(checkShow).toHaveBeenCalledWith(content, user);
  });

  it('treats USER signal value of "false" as no user (passes undefined to checkShow)', () => {
    TestBed.resetTestingModule();
    const checkShow = vi.fn(() => false);
    TestBed.configureTestingModule({
      providers: [
        { provide: USER, useValue: signal(false) },
        { provide: UserService, useValue: { checkShow } },
      ],
    });

    const f = TestBed.createComponent(TestComponent);
    f.componentInstance.content.set({ params: { reqRoles: ['admin'] } });
    f.detectChanges();
    f.detectChanges();

    expect(checkShow).toHaveBeenCalledWith(expect.anything(), undefined);
    expect(f.debugElement.query(By.css('.target'))).toBeNull();
  });
});
