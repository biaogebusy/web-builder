import { PageSettingComponent } from './page-setting.component';

interface PageSettingPayloadFacade {
  user: () => { id: string };
  getAttributesParams: (value: any) => object;
  getRelationshiopParams: (value: any) => object;
}

function createFacade() {
  const user = vi.fn(() => ({ id: 'user-1' }));
  const component = Object.create(PageSettingComponent.prototype) as PageSettingPayloadFacade;
  component.user = user;

  return { component, user };
}

describe('PageSettingComponent payload façade', () => {
  it('keeps landing page attributes and relationships', () => {
    const { component, user } = createFacade();
    const value = {
      type: 'node--landing_page',
      title: 'Landing page',
      is_transparent: true,
      transparent_style: 'dark',
      page_group: 'group-1',
      ignored: 'value',
    };

    expect(component.getAttributesParams(value)).toEqual({
      title: 'Landing page',
      is_transparent: true,
      transparent_style: 'dark',
    });
    expect(component.getRelationshiopParams(value)).toEqual({
      uid: {
        data: {
          type: 'user--user',
          id: 'user-1',
        },
      },
      group: {
        data: {
          type: 'taxonomy_term--page_group',
          id: 'group-1',
        },
      },
    });
    expect(user).toHaveBeenCalledOnce();
  });

  it('keeps an empty landing page group as a null relationship', () => {
    const { component } = createFacade();

    expect(
      component.getRelationshiopParams({
        type: 'node--landing_page',
        page_group: '',
      })
    ).toEqual({
      uid: {
        data: {
          type: 'user--user',
          id: 'user-1',
        },
      },
      group: {
        data: null,
      },
    });
  });

  it('keeps JSON pages limited to title and author', () => {
    const { component } = createFacade();
    const value = {
      type: 'node--json',
      title: 'JSON page',
      page_group: 'ignored-group',
      is_transparent: true,
    };

    expect(component.getAttributesParams(value)).toEqual({ title: 'JSON page' });
    expect(component.getRelationshiopParams(value)).toEqual({
      uid: {
        data: {
          type: 'user--user',
          id: 'user-1',
        },
      },
    });
  });

  it('keeps unknown node types empty without reading the current user', () => {
    const { component, user } = createFacade();
    const value = { type: 'node--article', title: 'Article' };

    expect(component.getAttributesParams(value)).toEqual({});
    expect(component.getRelationshiopParams(value)).toEqual({});
    expect(user).not.toHaveBeenCalled();
  });
});
