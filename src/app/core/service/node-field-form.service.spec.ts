import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { describe, expect, it, beforeEach, vi } from 'vitest';
import { NodeFieldFormService } from './node-field-form.service';
import { NodeService } from './node.service';

describe('NodeFieldFormService', () => {
  let service: NodeFieldFormService;
  const nodeServiceMock = {
    fetch: vi.fn().mockReturnValue(of({ data: [] })),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: NodeService, useValue: nodeServiceMock }],
    });
    service = TestBed.inject(NodeFieldFormService);
  });

  describe('buildForm', () => {
    it('should map drupal field configs to formly fields', () => {
      const configs = [
        {
          attributes: {
            field_name: 'field_summary',
            field_type: 'string',
            label: 'Summary',
            required: true,
            settings: {},
          },
        },
        {
          attributes: {
            field_name: 'body',
            field_type: 'text_with_summary',
            label: 'Body',
            required: false,
            settings: {},
          },
        },
        {
          attributes: {
            field_name: 'field_tags',
            field_type: 'entity_reference',
            label: 'Tags',
            required: false,
            settings: {
              handler: 'default:taxonomy_term',
              handler_settings: { target_bundles: { tags: 'tags' } },
            },
          },
        },
        {
          attributes: {
            field_name: 'field_cover',
            field_type: 'entity_reference',
            label: 'Cover',
            required: false,
            settings: {
              handler: 'default:media',
              handler_settings: { target_bundles: { image: 'image' } },
            },
          },
        },
        {
          attributes: {
            field_name: 'data',
            field_type: 'text_long',
            label: 'Data',
            required: false,
            settings: {},
            dependencies: {
              config: ['field.storage.node.data', 'filter.format.json', 'node.type.component'],
            },
          },
        },
      ];
      const storages = [
        {
          attributes: {
            field_name: 'field_tags',
            cardinality: -1,
            settings: { target_type: 'taxonomy_term' },
          },
        },
        {
          attributes: {
            field_name: 'field_cover',
            cardinality: 1,
            settings: { target_type: 'media' },
          },
        },
      ];

      const { fields, meta } = service.buildForm(configs, storages);

      expect(fields.length).toBe(5);
      expect(fields[0].type).toBe('input');
      expect(fields[0].props?.required).toBe(true);
      expect(fields[1].type).toBe('tiptap');
      expect(fields[2].type).toBe('select');
      expect(fields[2].props?.multiple).toBe(true);
      expect(fields[3].type).toBe('img-picker');
      expect(fields[3].props?.['valueIsUUID']).toBe(true);
      // Fields bound to the json text format use the JSON editor, not rich text
      expect(fields[4].type).toBe('json');
      expect(meta.find(m => m.key === 'data')?.jsonFormat).toBe(true);
      expect(meta.find(m => m.key === 'body')?.jsonFormat).toBe(false);
      expect(meta.find(m => m.key === 'field_tags')?.targetBundle).toBe('tags');
    });

    it('无法用简单控件表达的字段类型不进表单(避免以纯文本提交)', () => {
      const configs = ['metatag', 'image', 'file', 'link', 'datetime', 'daterange'].map(type => ({
        attributes: { field_name: `field_${type}`, field_type: type, label: type, settings: {} },
      }));
      const { fields, meta } = service.buildForm(configs, []);
      expect(fields.length).toBe(0);
      expect(meta.length).toBe(0);
    });

    it('传入表单显示白名单时,禁用字段不进 fields 也不进 meta', () => {
      const configs = [
        {
          attributes: { field_name: 'field_summary', field_type: 'string', label: 'S', settings: {} },
        },
        {
          attributes: { field_name: 'field_tags', field_type: 'string', label: 'T', settings: {} },
        },
      ];
      const { fields, meta } = service.buildForm(configs, [], new Set(['title', 'field_summary']));
      expect(fields.map(f => f.key)).toEqual(['field_summary']);
      expect(meta.map(m => m.key)).toEqual(['field_summary']);
    });
  });

  describe('buildPayload', () => {
    it('should split values into attributes and relationships', () => {
      const meta = [
        { key: 'field_summary', fieldType: 'string' },
        { key: 'body', fieldType: 'text_with_summary' },
        {
          key: 'field_tags',
          fieldType: 'entity_reference',
          targetType: 'taxonomy_term',
          targetBundle: 'tags',
          multiple: true,
        },
        {
          key: 'field_cover',
          fieldType: 'entity_reference',
          targetType: 'media',
          targetBundle: 'image',
          multiple: false,
        },
      ];
      const value = {
        field_summary: 'hello',
        body: '<p>content</p>',
        field_tags: ['uuid-1', 'uuid-2'],
        field_cover: 'uuid-3',
      };

      const { attributes, relationships } = service.buildPayload(meta, value);

      expect(attributes['field_summary']).toBe('hello');
      expect(attributes['body']).toEqual({ value: '<p>content</p>', format: 'full_html' });
      expect(relationships['field_tags']).toEqual({
        data: [
          { type: 'taxonomy_term--tags', id: 'uuid-1' },
          { type: 'taxonomy_term--tags', id: 'uuid-2' },
        ],
      });
      expect(relationships['field_cover']).toEqual({
        data: { type: 'media--image', id: 'uuid-3' },
      });
    });

    it('should skip empty values', () => {
      const meta = [
        { key: 'field_summary', fieldType: 'string' },
        {
          key: 'field_tags',
          fieldType: 'entity_reference',
          targetType: 'taxonomy_term',
          targetBundle: 'tags',
        },
      ];
      const { attributes, relationships } = service.buildPayload(meta, {
        field_summary: '',
        field_tags: null,
      });
      expect(Object.keys(attributes).length).toBe(0);
      expect(Object.keys(relationships).length).toBe(0);
    });

    it('should submit json-format text fields as json string', () => {
      const meta = [{ key: 'data', fieldType: 'text_long', jsonFormat: true }];
      const { attributes } = service.buildPayload(meta, { data: { a: 1 } });
      expect(attributes['data']).toEqual({ value: '{"a":1}', format: 'json' });
    });

    it('编辑时沿用原文本格式并保留摘要', () => {
      const meta = [
        { key: 'body', fieldType: 'text_with_summary' },
        { key: 'field_desc', fieldType: 'text_long' },
      ];
      const original = {
        attributes: {
          body: { value: '<p>old</p>', format: 'basic_html', summary: '摘要' },
          field_desc: { value: 'old', format: 'restricted_html' },
        },
      };
      const { attributes } = service.buildPayload(
        meta,
        { body: '<p>new</p>', field_desc: 'new' },
        original
      );
      expect(attributes['body']).toEqual({
        value: '<p>new</p>',
        format: 'basic_html',
        summary: '摘要',
      });
      // text_long has no summary concept, only the format is carried over
      expect(attributes['field_desc']).toEqual({ value: 'new', format: 'restricted_html' });
    });

    it('编辑时清空的字段提交显式 null / 空 data 以真正清除', () => {
      const meta = [
        { key: 'field_summary', fieldType: 'string' },
        {
          key: 'field_tags',
          fieldType: 'entity_reference',
          targetType: 'taxonomy_term',
          targetBundle: 'tags',
          multiple: true,
        },
        {
          key: 'field_cover',
          fieldType: 'entity_reference',
          targetType: 'media',
          targetBundle: 'image',
          multiple: false,
        },
      ];
      const original = { attributes: { field_summary: 'old' }, relationships: {} };
      const { attributes, relationships } = service.buildPayload(
        meta,
        { field_summary: '', field_tags: null, field_cover: '' },
        original
      );
      expect(attributes['field_summary']).toBeNull();
      expect(relationships['field_tags']).toEqual({ data: [] });
      expect(relationships['field_cover']).toEqual({ data: null });
    });

    it('编辑时引用字段回带原 meta(如图片 alt),目标变化则不带', () => {
      const meta = [
        {
          key: 'field_cover',
          fieldType: 'entity_reference',
          targetType: 'media',
          targetBundle: 'image',
          multiple: false,
        },
        {
          key: 'field_gallery',
          fieldType: 'entity_reference',
          targetType: 'media',
          targetBundle: 'image',
          multiple: true,
        },
      ];
      const original = {
        relationships: {
          field_cover: { data: { type: 'media--image', id: 'uuid-3', meta: { alt: '封面' } } },
          field_gallery: {
            data: [{ type: 'media--image', id: 'uuid-4', meta: { alt: '图一' } }],
          },
        },
      };
      const { relationships } = service.buildPayload(
        meta,
        { field_cover: 'uuid-3', field_gallery: ['uuid-4', 'uuid-5'] },
        original
      );
      expect(relationships['field_cover'].data).toEqual({
        type: 'media--image',
        id: 'uuid-3',
        meta: { alt: '封面' },
      });
      expect(relationships['field_gallery'].data).toEqual([
        { type: 'media--image', id: 'uuid-4', meta: { alt: '图一' } },
        { type: 'media--image', id: 'uuid-5' },
      ]);
    });
  });

  describe('buildModel', () => {
    it('should map node data back to form model', () => {
      const meta = [
        { key: 'field_summary', fieldType: 'string' },
        { key: 'body', fieldType: 'text_with_summary' },
        {
          key: 'field_tags',
          fieldType: 'entity_reference',
          targetType: 'taxonomy_term',
          targetBundle: 'tags',
          multiple: true,
        },
        {
          key: 'field_cover',
          fieldType: 'entity_reference',
          targetType: 'media',
          targetBundle: 'image',
          multiple: false,
        },
      ];
      const node = {
        attributes: {
          field_summary: 'hello',
          body: { value: '<p>content</p>', format: 'full_html' },
        },
        relationships: {
          field_tags: { data: [{ type: 'taxonomy_term--tags', id: 'uuid-1' }] },
          field_cover: { data: { type: 'media--image', id: 'uuid-3' } },
        },
      };

      const model = service.buildModel(meta, node);

      expect(model['field_summary']).toBe('hello');
      expect(model['body']).toBe('<p>content</p>');
      expect(model['field_tags']).toEqual(['uuid-1']);
      expect(model['field_cover']).toBe('uuid-3');
    });

    it('should parse json-format text fields back to objects', () => {
      const meta = [{ key: 'data', fieldType: 'text_long', jsonFormat: true }];
      const node = {
        attributes: { data: { value: '{"a":1}', format: 'json' } },
      };
      const model = service.buildModel(meta, node);
      expect(model['data']).toEqual({ a: 1 });
    });
  });

  describe('getTermOptions', () => {
    it('should follow links.next and merge all pages', () => {
      nodeServiceMock.fetch.mockReset();
      nodeServiceMock.fetch
        .mockReturnValueOnce(
          of({
            data: [{ id: 'uuid-1', attributes: { name: '前端' } }],
            links: {
              next: {
                href: 'https://base.builder.design/api/v1/taxonomy_term/tags?page%5Boffset%5D=50&page%5Blimit%5D=50',
              },
            },
          })
        )
        .mockReturnValueOnce(
          of({
            data: [{ id: 'uuid-2', attributes: { name: '后端' } }],
            links: {},
          })
        );

      let result: { label: string; value: string }[] | undefined;
      service.getTermOptions('tags').subscribe(r => (result = r));

      expect(result).toEqual([
        { label: '前端', value: 'uuid-1' },
        { label: '后端', value: 'uuid-2' },
      ]);
      expect(nodeServiceMock.fetch).toHaveBeenCalledTimes(2);
      // next is an absolute URL, so it must be converted back to a relative path and
      // re-sent through apiUrl (the dev proxy)
      expect(nodeServiceMock.fetch.mock.calls[1][0]).toBe(
        '/api/v1/taxonomy_term/tags?page%5Boffset%5D=50&page%5Blimit%5D=50'
      );
    });
  });

  describe('getForm', () => {
    it('should emit empty form when apis return no data', () => {
      nodeServiceMock.fetch.mockReset();
      nodeServiceMock.fetch.mockReturnValue(of({ data: [] }));

      let result: any;
      service.getForm('article').subscribe(r => (result = r));

      expect(result).toEqual({ fields: [], meta: [] });
    });

    const fieldConfigs = [
      {
        attributes: {
          field_name: 'field_summary',
          field_type: 'string',
          label: 'Summary',
          settings: {},
        },
      },
      {
        attributes: {
          field_name: 'field_tags',
          field_type: 'entity_reference',
          label: 'Tags',
          settings: {
            handler: 'default:taxonomy_term',
            handler_settings: { target_bundles: { tags: 'tags' } },
          },
        },
      },
    ];

    const mockApis = (formDisplayRes: any) => {
      nodeServiceMock.fetch.mockReset();
      nodeServiceMock.fetch.mockImplementation((api: string) => {
        if (api.startsWith('/api/v1/field_config')) {
          return of({ data: fieldConfigs });
        }
        if (api.startsWith('/api/v1/entity_form_display')) {
          return of(formDisplayRes);
        }
        return of({ data: [] });
      });
    };

    it('表单显示(管理表单显示)中禁用的字段不渲染,也不再加载其词汇表', () => {
      mockApis({
        data: [
          {
            attributes: {
              targetEntityType: 'node',
              bundle: 'article',
              mode: 'default',
              content: { title: { type: 'string_textfield' }, field_summary: { type: 'string_textfield' } },
              hidden: { field_tags: true },
            },
          },
        ],
      });

      let result: any;
      service.getForm('article').subscribe(r => (result = r));

      expect(result.fields.map((f: any) => f.key)).toEqual(['field_summary']);
      expect(result.meta.map((m: any) => m.key)).toEqual(['field_summary']);
      expect(
        nodeServiceMock.fetch.mock.calls.some(call =>
          (call[0] as string).includes('/taxonomy_term/')
        )
      ).toBe(false);
    });

    it('表单显示配置不可用时(如无权限)不过滤,保持全部字段', () => {
      mockApis({ data: [] });

      let result: any;
      service.getForm('article').subscribe(r => (result = r));

      expect(result.fields.map((f: any) => f.key)).toEqual(['field_summary', 'field_tags']);
    });
  });
});
