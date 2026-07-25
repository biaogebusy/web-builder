import { computed } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { of, Subject } from 'rxjs';
import { vi } from 'vitest';
import { NodeService } from '@core/service/node.service';
import { DynamicMenuState } from './dynamic-menu.state';

describe('DynamicMenuState', () => {
  const nodeOf = (value: object) => ({
    data: { attributes: { body: { value: JSON.stringify(value) } } },
  });

  it('在 computed 中首读、响应同步回放(水合 TransferState 场景)时不抛 NG0600', () => {
    const fetch = vi.fn(() => of(nodeOf({ title: 'menu' })));
    TestBed.configureTestingModule({
      providers: [{ provide: NodeService, useValue: { fetch } }],
    });
    const state = TestBed.inject(DynamicMenuState);

    const content = computed(() => state.getContent('uuid-1')());

    expect(content()).toEqual({ title: 'menu' });
  });

  it('异步响应到达后更新 signal,同一 uuid 只请求一次', () => {
    const response$ = new Subject<any>();
    const fetch = vi.fn(() => response$);
    TestBed.configureTestingModule({
      providers: [{ provide: NodeService, useValue: { fetch } }],
    });
    const state = TestBed.inject(DynamicMenuState);

    const sig = state.getContent('uuid-2');
    expect(sig()).toEqual({});

    response$.next(nodeOf({ title: 'async' }));
    expect(sig()).toEqual({ title: 'async' });

    state.getContent('uuid-2');
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
