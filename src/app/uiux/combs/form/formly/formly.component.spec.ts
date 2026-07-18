import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormlyConfig } from '@ngx-formly/core';
import { TranslateModule } from '@ngx-translate/core';

import { FormlyComponent } from './formly.component';

describe('FormlyComponent', () => {
  let component: FormlyComponent;
  let fixture: ComponentFixture<FormlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormlyComponent, TranslateModule.forRoot()],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it.each([
    'datepicker',
    'toggle',
    'rich-text',
    'rich-editor',
    'mat-select',
    'date-range',
    'repeat',
    'dialog-repeat',
    'tabs',
    'img-picker',
    'slider',
    'json',
  ])('registers the "%s" field type', type => {
    const config = fixture.debugElement.injector.get(FormlyConfig);

    expect(() => config.getType(type)).not.toThrow();
  });
});
