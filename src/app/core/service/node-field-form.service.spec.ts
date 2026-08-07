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
      expect(fields[1].type).toBe('rich-editor');
      expect(fields[2].type).toBe('select');
      expect(fields[2].props?.multiple).toBe(true);
      expect(fields[3].type).toBe('img-picker');
      expect(fields[3].props?.['valueIsUUID']).toBe(true);
      // 绑定 json 文本格式的字段用 JSON 编辑器而非富文本
      expect(fields[4].type).toBe('json');
      expect(meta.find(m => m.key === 'data')?.jsonFormat).toBe(true);
      expect(meta.find(m => m.key === 'body')?.jsonFormat).toBe(false);
      expect(meta.find(m => m.key === 'field_tags')?.targetBundle).toBe('tags');
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
      // next 为绝对地址,须转回相对路径经 apiUrl(开发代理)重发
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
  });
});
