import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { describe, expect, it, beforeEach, vi } from 'vitest';
import { NodeFieldFormService } from './node-field-form.service';
import { contentFormFixture } from '@core/testing/content-form.fixture';
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
    it('maps only the authorized descriptors and selects the permitted editor', () => {
      const schema = contentFormFixture({ fields: [
        { key: 'summary', fieldType: 'string', label: 'Summary', required: true, maxLength: 40 },
        { key: 'body', fieldType: 'text_with_summary', label: 'Body', required: true,
          textFormat: 'basic_html', editor: 'rich_text' },
        { key: 'notes', fieldType: 'text_long', label: 'Notes', required: false,
          textFormat: 'plain_text', editor: 'plain_text' },
        { key: 'data', fieldType: 'text_long', label: 'Data', required: false,
          textFormat: 'json', editor: 'json', jsonFormat: true },
        { key: 'category', fieldType: 'entity_reference', label: 'Category', required: false,
          targetType: 'taxonomy_term', targetBundle: 'tags', autoCreate: false },
        { key: 'tags', fieldType: 'entity_reference', label: 'Tags', required: false,
          targetType: 'taxonomy_term', targetBundle: 'tags', multiple: true, autoCreate: true },
      ] });
      const form = service.buildForm(schema);
      expect(form.fields.map(field => field.type)).toEqual([
        'input', 'tiptap', 'textarea', 'json', 'select', 'term-select',
      ]);
      expect(form.fields[0].props).toMatchObject({ required: true, maxLength: 40 });
      expect(form.fields[5].props?.multiple).toBe(true);
      expect(form.schema).toBe(schema);
    });
  });

  describe('buildPayload', () => {
    it('should split values into attributes and relationships', () => {
      const meta = [
        { key: 'field_summary', fieldType: 'string' },
        { key: 'body', fieldType: 'text_with_summary', textFormat: 'full_html' },
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
      const meta = [{ key: 'data', fieldType: 'text_long', jsonFormat: true, textFormat: 'json' }];
      const { attributes } = service.buildPayload(meta, { data: { a: 1 } });
      expect(attributes['data']).toEqual({ value: '{"a":1}', format: 'json' });
    });

    it('编辑时沿用原文本格式并保留摘要', () => {
      const meta = [
        { key: 'body', fieldType: 'text_with_summary', textFormat: 'basic_html' },
        { key: 'field_desc', fieldType: 'text_long', textFormat: 'restricted_html' },
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
        { key: 'body', fieldType: 'text_with_summary', textFormat: 'full_html' },
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
      const meta = [{ key: 'data', fieldType: 'text_long', jsonFormat: true, textFormat: 'json' }];
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
      // sparse fieldset avoids serializing vocabulary fields JSON:API cannot handle
      expect(nodeServiceMock.fetch.mock.calls[0][1]).toBe('fields[taxonomy_term--tags]=name');
      // next is an absolute URL, so it must be converted back to a relative path and
      // re-sent through apiUrl (the dev proxy)
      expect(nodeServiceMock.fetch.mock.calls[1][0]).toBe(
        '/api/v1/taxonomy_term/tags?page%5Boffset%5D=50&page%5Blimit%5D=50'
      );
    });
  });

  describe('getForm', () => {
    it('loads one authorized descriptor for the requested entity and language', () => {
      nodeServiceMock.fetch.mockReset();
      const schema = contentFormFixture();
      nodeServiceMock.fetch.mockReturnValue(of(schema));
      let result: any;
      service.getForm('blog', 'node-uuid', 'en').subscribe(form => result = form);
      expect(nodeServiceMock.fetch).toHaveBeenCalledExactlyOnceWith(
        '/api/v3/node-form/blog/node-uuid', { lang: 'en' }
      );
      expect(result.fields).toEqual([]);
      expect(result.schema).toEqual(schema);
    });

    it('preserves permission and network failures instead of creating a partial form', () => {
      for (const status of [403, 503]) {
        nodeServiceMock.fetch.mockReturnValue(throwError(() => ({ status })));
        const error = vi.fn();
        const next = vi.fn();
        service.getForm('blog').subscribe({ next, error });
        expect(next).not.toHaveBeenCalled();
        expect(error).toHaveBeenCalledWith({ status });
      }
    });

    it('filters the authorized create types through the product configuration', () => {
      nodeServiceMock.fetch.mockReturnValue(of({ data: [
        { value: 'blog', label: 'Blog', desc: '' },
        { value: 'private_type', label: 'Private', desc: '' },
      ] }));
      let result: any;
      service.getAllowedNodeTypes().subscribe(types => result = types);
      expect(result.map((type: any) => type.value)).toEqual(['blog']);
      expect(nodeServiceMock.fetch).toHaveBeenCalledWith('/api/v3/node-form/types');
    });
  });
});
