import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { provideNgxWebstorage, withLocalStorage } from 'ngx-webstorage';
import { CORE_CONFIG, THEME } from '@core/token/token-providers';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, TranslateModule.forRoot()],
      providers: [
        provideRouter([]),
        provideNgxWebstorage(withLocalStorage()),
        { provide: CORE_CONFIG, useValue: {} },
        { provide: THEME, useValue: 'light' },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
