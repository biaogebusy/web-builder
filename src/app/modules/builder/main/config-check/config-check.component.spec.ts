import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigCheckComponent } from './config-check.component';

describe('ConfigCheckComponent', () => {
  let component: ConfigCheckComponent;
  let fixture: ComponentFixture<ConfigCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigCheckComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
