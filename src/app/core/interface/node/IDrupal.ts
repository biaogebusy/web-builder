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
  attributes: {
    title: string;
    body: {
      value: string;
      format: 'full_html';
    };
  };
}
