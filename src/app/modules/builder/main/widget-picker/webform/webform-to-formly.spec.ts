import { webformElementsToFormly } from './webform-to-formly';

describe('webformElementsToFormly', () => {
  it('maps a plain textfield with its label and required flag', () => {
    const { fields, warnings } = webformElementsToFormly({
      name: { '#type': 'textfield', '#title': '姓名', '#required': true },
    });

    expect(warnings).toEqual([]);
    expect(fields).toEqual([
      { key: 'name', type: 'input', props: { label: '姓名', required: true } },
    ]);
  });

  it('gives email/tel/number inputs their html input type and numeric bounds', () => {
    const { fields } = webformElementsToFormly({
      mail: { '#type': 'email', '#title': 'Email' },
      phone: { '#type': 'tel', '#title': 'Phone' },
      age: { '#type': 'number', '#title': 'Age', '#min': 1, '#max': 120, '#step': 1 },
    });

    expect(fields[0].props).toEqual({ label: 'Email', type: 'email' });
    expect(fields[1].props).toEqual({ label: 'Phone', type: 'tel' });
    expect(fields[2].props).toEqual({ label: 'Age', type: 'number', min: 1, max: 120, step: 1 });
  });

  it('carries description, placeholder, length limits and pattern onto props', () => {
    const { fields } = webformElementsToFormly({
      subject: {
        '#type': 'textfield',
        '#title': 'Subject',
        '#description': 'Keep it short',
        '#placeholder': 'Type here',
        '#minlength': 2,
        '#maxlength': 40,
        '#pattern': '^[a-z]+$',
      },
    });

    expect(fields[0].props).toEqual({
      label: 'Subject',
      description: 'Keep it short',
      placeholder: 'Type here',
      minLength: 2,
      maxLength: 40,
      pattern: '^[a-z]+$',
    });
  });

  it('maps a textarea with its row count', () => {
    const { fields } = webformElementsToFormly({
      message: { '#type': 'textarea', '#title': 'Message', '#rows': 6 },
    });

    expect(fields[0]).toEqual({
      key: 'message',
      type: 'textarea',
      props: { label: 'Message', rows: 6 },
    });
  });

  it('converts #options into formly options and keeps multiple selects', () => {
    const { fields } = webformElementsToFormly({
      city: {
        '#type': 'select',
        '#title': 'City',
        '#options': { bj: '北京', sh: '上海' },
        '#multiple': true,
      },
    });

    expect(fields[0]).toEqual({
      key: 'city',
      type: 'select',
      props: {
        label: 'City',
        options: [
          { value: 'bj', label: '北京' },
          { value: 'sh', label: '上海' },
        ],
        multiple: true,
      },
    });
  });

  it('flattens optgroup options one level', () => {
    const { fields } = webformElementsToFormly({
      city: {
        '#type': 'select',
        '#title': 'City',
        '#options': { China: { bj: '北京' }, Japan: { tk: '东京' } },
      },
    });

    expect(fields[0].props?.options).toEqual([
      { value: 'bj', label: '北京' },
      { value: 'tk', label: '东京' },
    ]);
  });

  it('maps checkbox / checkboxes / radios / date to their formly counterparts', () => {
    const { fields } = webformElementsToFormly({
      agree: { '#type': 'checkbox', '#title': 'Agree' },
      tags: { '#type': 'checkboxes', '#title': 'Tags', '#options': { a: 'A' } },
      plan: { '#type': 'radios', '#title': 'Plan', '#options': { free: 'Free' } },
      when: { '#type': 'date', '#title': 'When' },
    });

    expect(fields.map(field => field.type)).toEqual([
      'checkbox',
      'multicheckbox',
      'radio',
      'datepicker',
    ]);
  });

  it('makes checkboxes submit an array, which is what the drupal element expects', () => {
    const { fields } = webformElementsToFormly({
      tags: { '#type': 'checkboxes', '#title': 'Tags', '#options': { a: 'A', b: 'B' } },
    });

    expect(fields[0].props).toEqual({
      label: 'Tags',
      options: [
        { value: 'a', label: 'A' },
        { value: 'b', label: 'B' },
      ],
      type: 'array',
    });
  });

  it('reports an entity backed select without options instead of guessing an input', () => {
    const { fields, warnings } = webformElementsToFormly({
      author: { '#type': 'entity_autocomplete', '#title': 'Author' },
    });

    // A text input would look right and then fail every submission
    expect(fields).toEqual([]);
    expect(warnings).toEqual([
      { key: 'author', type: 'entity_autocomplete', reason: 'unsupported' },
    ]);
  });

  it('treats a numeric #multiple of 1 as a single value select', () => {
    const { fields } = webformElementsToFormly({
      city: { '#type': 'select', '#title': 'City', '#options': { bj: '北京' }, '#multiple': 1 },
      tags: { '#type': 'select', '#title': 'Tags', '#options': { a: 'A' }, '#multiple': 3 },
    });

    expect(fields[0].props?.multiple).toBeUndefined();
    expect(fields[1].props?.multiple).toBe(true);
  });

  it('keeps the default value but drops empty ones', () => {
    const { fields } = webformElementsToFormly({
      country: { '#type': 'textfield', '#title': 'Country', '#default_value': 'CN' },
      city: { '#type': 'textfield', '#title': 'City', '#default_value': '' },
    });

    expect(fields[0].defaultValue).toBe('CN');
    expect(fields[1].defaultValue).toBeUndefined();
  });

  it('turns containers into field groups and recurses into their children', () => {
    const { fields } = webformElementsToFormly({
      contact: {
        '#type': 'details',
        '#title': 'Contact',
        'mail': { '#type': 'email', '#title': 'Email' },
      },
    });

    expect(fields).toEqual([
      {
        props: { label: 'Contact' },
        fieldGroup: [{ key: 'mail', type: 'input', props: { label: 'Email', type: 'email' } }],
      },
    ]);
  });

  it('drops containers that end up empty', () => {
    const { fields } = webformElementsToFormly({
      wrapper: { '#type': 'fieldset', '#title': 'Empty' },
    });

    expect(fields).toEqual([]);
  });

  it('renders markup elements through the formly template', () => {
    const { fields } = webformElementsToFormly({
      intro: { '#type': 'webform_markup', '#markup': '<p>hi</p>' },
    });

    expect(fields).toEqual([{ template: '<p>hi</p>' }]);
  });

  it('silently skips actions, hidden and access-denied elements', () => {
    const { fields, warnings } = webformElementsToFormly({
      actions: { '#type': 'webform_actions' },
      token: { '#type': 'hidden', '#default_value': 'abc' },
      secret: { '#type': 'textfield', '#title': 'Secret', '#access': false },
    });

    expect(fields).toEqual([]);
    expect(warnings).toEqual([]);
  });

  it('reports unknown element types as unsupported instead of guessing', () => {
    const { fields, warnings } = webformElementsToFormly({
      cv: { '#type': 'managed_file', '#title': 'CV' },
      sign: { '#type': 'webform_signature', '#title': 'Sign' },
    });

    expect(fields).toEqual([]);
    expect(warnings).toEqual([
      { key: 'cv', type: 'managed_file', reason: 'unsupported' },
      { key: 'sign', type: 'webform_signature', reason: 'unsupported' },
    ]);
  });

  it('keeps a field with #states but reports the dropped conditional logic', () => {
    const { fields, warnings } = webformElementsToFormly({
      other: {
        '#type': 'textfield',
        '#title': 'Other',
        '#states': { visible: [{ ':input[name="plan"]': { value: 'pro' } }] },
      },
    });

    expect(fields).toHaveLength(1);
    expect(warnings).toEqual([{ key: 'other', type: 'textfield', reason: 'conditional' }]);
  });

  it('ignores render array keys and tolerates an empty payload', () => {
    const { fields, warnings } = webformElementsToFormly({
      '#form_id': 'contact',
      'name': { '#type': 'textfield', '#title': 'Name' },
    });

    expect(fields).toHaveLength(1);
    expect(warnings).toEqual([]);
    expect(webformElementsToFormly({})).toEqual({ fields: [], warnings: [] });
  });

  it('falls back to the element key when the webform has no title', () => {
    const { fields } = webformElementsToFormly({ notes: { '#type': 'textfield' } });

    expect(fields[0].props?.label).toBe('notes');
  });
});
