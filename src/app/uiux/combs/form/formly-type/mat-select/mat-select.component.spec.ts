import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UntypedFormControl } from '@angular/forms';
import { provideRouter } from '@angular/router';
import { provideUiuxMocks } from '@uiux/testing/mocks';
import { HttpTestingController } from '@angular/common/http/testing';
import { firstValueFrom } from 'rxjs';
import { MatIconTestingModule } from '@angular/material/icon/testing';

import { MatSelectComponent } from './mat-select.component';

describe('MatSelectComponent', () => {
  let component: MatSelectComponent;
  let fixture: ComponentFixture<MatSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatSelectComponent, MatIconTestingModule],
      providers: [provideRouter([]), ...provideUiuxMocks()],
    }).compileComponents();

    fixture = TestBed.createComponent(MatSelectComponent);
    component = fixture.componentInstance;
    component.field = {
      key: 'k',
      props: { options: [] },
      formControl: new UntypedFormControl(),
      formState: {},
      options: { showError: () => false },
    } as any;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  afterEach(() => TestBed.inject(HttpTestingController).verify());

  it('keeps ordinary select options local', async () => {
    component.field.props = { options: [{ label: 'One', value: 'one' }] };
    await fixture.whenStable();

    expect(component.matOptions()).toEqual([{ label: 'One', value: 'one' }]);
    TestBed.inject(HttpTestingController).expectNone('/assets/svg-icons/names.json');
  });

  it('loads names for icon fields and applies a search entered while loading', async () => {
    component.field.props = { type: 'icon', search: true };
    component.field.defaultValue = 'home';
    await fixture.whenStable();
    expect(component.formControl.value).toBe('home');
    component.searchCtrl.setValue('ACCOUNT');
    component.formControl.setValue('account');
    TestBed.inject(HttpTestingController)
      .expectOne('/assets/svg-icons/names.json').flush(['home', 'account', 'account-circle']);
    await fixture.whenStable();

    expect(component.formControl.value).toBe('account');
    expect(await firstValueFrom(component.filteredOptions)).toEqual([
      { label: 'account', value: 'account' },
      { label: 'account-circle', value: 'account-circle' },
    ]);
  });

  it('preserves custom saved values when the catalog is unavailable', async () => {
    component.field.props = { type: 'icon', search: true };
    component.formControl.setValue('dark_mode');
    await fixture.whenStable();
    TestBed.inject(HttpTestingController).expectOne('/assets/svg-icons/names.json').flush('', {
      status: 503, statusText: 'Unavailable',
    });
    await fixture.whenStable();

    expect(component.formControl.value).toBe('dark_mode');
    expect(await firstValueFrom(component.filteredOptions)).toEqual([
      { label: 'dark_mode', value: 'dark_mode' },
    ]);
  });
});
