import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ComponentService } from '@core/service/component.service';

@Component({
  selector: 'app-preload-test',
  template: '',
})
class PreloadTestComponent {}

describe('ComponentService', () => {
  it('preloads unique registered component types recursively', async () => {
    const service = TestBed.inject(ComponentService);
    const getComponentType = vi
      .spyOn(service, 'getComponentType')
      .mockResolvedValue(PreloadTestComponent);

    await service.preloadComponentTypes({
      body: [
        { type: 'article', actions: [{ type: 'btn' }] },
        { type: 'article' },
        { type: 'not-registered' },
      ],
    });

    expect(getComponentType).toHaveBeenCalledTimes(2);
    expect(getComponentType).toHaveBeenCalledWith('article');
    expect(getComponentType).toHaveBeenCalledWith('btn');
  });
});
