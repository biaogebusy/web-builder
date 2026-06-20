import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonFieldType } from './json.component';

describe('JsonComponent', () => {
  let component: JsonFieldType;
  let fixture: ComponentFixture<JsonFieldType>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JsonFieldType],
    }).compileComponents();

    fixture = TestBed.createComponent(JsonFieldType);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
