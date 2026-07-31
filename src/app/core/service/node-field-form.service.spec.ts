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

      expect(fields.length).toBe(4);
      expect(fields[0].type).toBe('input');
      expect(fields[0].props?.required).toBe(true);
      expect(fields[1].type).toBe('rich-editor');
      expect(fields[2].type).toBe('select');
      expect(fields[2].props?.multiple).toBe(true);
      expect(fields[3].type).toBe('img-picker');
      expect(fields[3].props?.['valueIsUUID']).toBe(true);
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
  });
});
