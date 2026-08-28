import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { provideUiuxMocks } from '@uiux/testing/mocks';
import type { MockInstance } from 'vitest';

import type { ILanguage } from '@core/interface/IEnvironment';
import { LangSwitchComponent } from './lang-switch.component';

describe('LangSwitchComponent', () => {
  let component: LangSwitchComponent;
  let fixture: ComponentFixture<LangSwitchComponent>;
  let navigateByUrl: MockInstance<typeof Router.prototype.navigateByUrl>;

  // environment.langs: zh-hans is the default (no prefix), en is prefixed
  const langOf = (langCode: string) => component.langs!.find(lang => lang.langCode === langCode)!;

  const switchFrom = (pathname: string, langCode: string): string => {
    history.pushState({}, '', pathname);
    component.onSwitchLanguage(langOf(langCode));
    return navigateByUrl.mock.calls.at(-1)![0] as string;
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LangSwitchComponent],
      providers: [provideRouter([]), ...provideUiuxMocks()],
    }).compileComponents();

    fixture = TestBed.createComponent(LangSwitchComponent);
    component = fixture.componentInstance;
    navigateByUrl = vi
      .spyOn(TestBed.inject(Router), 'navigateByUrl')
      .mockResolvedValue(true);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('adds the prefix of the language being switched to', () => {
    expect(switchFrom('/about', 'en')).toBe('/en/about');
  });

  // The switcher only swaps prefixes, so the rest of the path has to survive verbatim:
  // dropping the leading slash turned `/zh-hant` + `about` into `/zh-hantabout`
  it('keeps the leading slash when replacing one prefix with another', () => {
    expect(switchFrom('/en/about', 'zh-hans')).toBe('/about');
    expect(component.removeLangPrefix('/en/about')).toBe('/about');
  });

  it('leaves a path that merely starts with a language code alone', () => {
    expect(switchFrom('/entertainment', 'en')).toBe('/en/entertainment');
  });

  it('switches the language of the front page', () => {
    expect(switchFrom('/en', 'zh-hans')).toBe('/');
    expect(switchFrom('/', 'en')).toBe('/en');
  });

  it('keeps the query string when switching', () => {
    expect(switchFrom('/en/about?page=2&sort=title', 'zh-hans')).toBe('/about?page=2&sort=title');
    expect(switchFrom('/?foo=bar', 'en')).toBe('/en?foo=bar');
  });

  // The deployment test env runs three languages with en as the default, so the two
  // Chinese variants can be switched between directly without passing through the
  // default language — the case that exposed the missing-slash bug
  it('swaps one non-default prefix for another', () => {
    component.langs = [
      { label: 'English', langCode: 'en', default: true },
      { label: '简体中文', langCode: 'zh-hans' },
      { label: '繁體中文', langCode: 'zh-hant' },
    ] as ILanguage[];

    expect(switchFrom('/zh-hans/about', 'zh-hant')).toBe('/zh-hant/about');
    expect(switchFrom('/zh-hant/about', 'zh-hans')).toBe('/zh-hans/about');
    expect(switchFrom('/zh-hans/about', 'en')).toBe('/about');
    expect(switchFrom('/about', 'zh-hant')).toBe('/zh-hant/about');
    expect(switchFrom('/zh-hans', 'zh-hant')).toBe('/zh-hant');
  });
});
