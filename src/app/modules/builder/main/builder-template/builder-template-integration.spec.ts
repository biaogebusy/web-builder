import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ComponentService } from '@core/service/component.service';
import { ScreenService } from '@core/service/screen.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { provideBuilderMocks } from '@modules/builder/testing/mocks';
import { DynamicComponentComponent } from '@uiux/widgets/builder/dynamic-component/dynamic-component.component';

import { BuilderTemplateComponent } from './builder-template.component';

// The template picker only ever reaches the screen through the dynamic renderer
// (BuilderState.onNewPage opens it in a dialog), which assigns the dialog's
// `content` payload onto the instance. Rendering it directly hides that.
describe('BuilderTemplateComponent via dynamic renderer', () => {
  let fixture: ComponentFixture<DynamicComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicComponentComponent],
      providers: [
        provideRouter([]),
        ...provideBuilderMocks(),
        {
          provide: ComponentService,
          useValue: {
            getCachedComponentType: (type: string) =>
              type === 'builder-template' ? BuilderTemplateComponent : undefined,
            getComponentType: () => Promise.resolve(BuilderTemplateComponent),
          },
        },
        { provide: ScreenService, useValue: { isPlatformBrowser: () => true } },
        { provide: UtilitiesService, useValue: { initAnimate: () => undefined } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DynamicComponentComponent);
    // Exactly the payload BuilderState.onNewPage() sends through the dialog
    fixture.componentRef.setInput('inputs', { content: { type: 'builder-template' } });
  });

  it('renders without the injected content payload clobbering component state', async () => {
    await fixture.whenStable();
    fixture.detectChanges();
    await fixture.whenStable();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('.builder-template')).toBeTruthy();
  });
});
