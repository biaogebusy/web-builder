export interface DrupalNode {
  type: string;
  id: string;
  attributes: {
    title: string;
    body?: {
      value: string;
      format: string;
    };
    created: string;
    changed?: string;
  };
  relationships?: {
    [key: string]: {
      data: {
        type: string;
        id: string;
      };
    };
  };
}

export interface DrupalResponse {
  data: DrupalNode[];
  links?: {
    next?: {
      href: string;
    };
  };
  included?: any[];
}

export interface SubmissionItem {
  id: string;
  status: boolean;
  type: string;
  title: string;
  body: string;
  nid: string;
  created: string;
  langcode: string;
  attributes: {
    title: string;
    body: {
      value: string;
      format: 'full_html';
    };
  };
}
