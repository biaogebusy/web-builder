import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { MatIconTestingModule } from '@angular/material/icon/testing';
import { provideRouter } from '@angular/router';
import type { IPage } from '@core/interface/IAppConfig';
import { provideCoreMocks } from '@core/testing/mocks';
import { PAGE_CONTENT, USER } from '@core/token/token-providers';

import { PageComponent } from './page.component';

describe('PageComponent', () => {
  let component: PageComponent;
  let fixture: ComponentFixture<PageComponent>;
  const pageContent = signal<IPage | undefined>(undefined);

  beforeEach(async () => {
    pageContent.set(undefined);
    await TestBed.configureTestingModule({
      imports: [PageComponent, MatIconTestingModule],
      providers: [
        provideRouter([]), ...provideCoreMocks(),
        { provide: PAGE_CONTENT, useValue: pageContent },
        { provide: USER, useValue: signal({ uid: '1' }) },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PageComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows the default notice only when no custom 404 body is available', () => {
    pageContent.set({ title: '', body: [], unavailable: true });
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.public-unavailable')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('.public-unavailable app-text .text-body'))
      .not.toBeNull();

    pageContent.set({ title: 'Not found', body: [{ type: 'text' }], unavailable: true, nid: '404' });
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.public-unavailable')).toBeNull();
    expect(fixture.nativeElement.querySelector('app-dynamic-component')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('.page-toolbar')).toBeNull();
  });

  it('retains editing on a normal direct visit to the published /404 page', () => {
    pageContent.set({ title: 'Not found', body: [], nid: '404' });
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.page-toolbar')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('.public-unavailable')).toBeNull();
  });
});
