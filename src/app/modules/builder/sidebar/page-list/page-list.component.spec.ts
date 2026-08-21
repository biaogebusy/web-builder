import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { BuilderService } from '@core/service/builder.service';
import { NodeService } from '@core/service/node.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { BuilderState } from '@core/state/BuilderState';
import {
  createBuilderServiceMock,
  createBuilderStateMock,
  createNodeServiceMock,
  createUtilitiesServiceMock,
} from '@core/testing/mocks';
import { provideBuilderMocks } from '@modules/builder/testing/mocks';

import { PageListComponent } from './page-list.component';

describe('PageListComponent', () => {
  let component: PageListComponent;
  let fixture: ComponentFixture<PageListComponent>;
  const builderState = createBuilderStateMock();
  const builderService = createBuilderServiceMock();
  const nodeService = createNodeServiceMock();
  const util = createUtilitiesServiceMock();

  beforeEach(async () => {
    vi.clearAllMocks();
    await TestBed.configureTestingModule({
      imports: [PageListComponent],
      providers: [
        provideRouter([]),
        ...provideBuilderMocks(),
        { provide: BuilderState, useValue: builderState },
        { provide: BuilderService, useValue: builderService },
        { provide: NodeService, useValue: nodeService },
        { provide: UtilitiesService, useValue: util },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PageListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('loads the pending page queued by the builder on init', () => {
    builderState.consumePageLoad.mockReturnValueOnce({ nid: '9', langcode: 'en' });

    component.ngOnInit();

    expect(builderService.loadPage).toHaveBeenCalledWith({ nid: '9', langcode: 'en' });
  });

  it('warns instead of loading when the page misses its nid', () => {
    component.loadPage({ langcode: 'en' });

    expect(util.openSnackbar).toHaveBeenCalledWith('BUILDER.PAGE_LIST.CHECK_LANDING_VIEW', 'ok');
    expect(builderService.loadPage).not.toHaveBeenCalled();
  });

  it('loads the selected page into the builder', () => {
    component.loadPage({ nid: '12', langcode: 'zh-hans' });

    expect(builderService.loadPage).toHaveBeenCalledWith({ nid: '12', langcode: 'zh-hans' });
  });
});
