export interface IBaseNode {
  title: string;
  body: string;
  banner?: any;
  meta?: any[];
  params: {
    pay?: {
      money: number;
    };
    require_rule?: string[];
    comment: ICommentParams;
  };
  editor?: {
    config: any;
    action: any;
    succes: any;
  };
  actions: any[];
  bottom: any[];
  sidebar?: any[];
}

export interface ICommentParams {
  type: string;
  id?: string;
  attributes: {
    entity_type?: string;
    field_name?: string;
    content: {
      value: any;
      format: 'full_html' | 'plain_text';
    };
  };
  relationships: {
    comment_type?: {
      data: {
        type: string;
        id: string;
      };
    };
    entity_id?: {
      data: {
        type: string;
        id: string;
      };
    };
    uid?: {
      data: {
        type: string;
        id: string;
      };
    };
  };
}

export interface ICommentContent {
  author: {
    img: any;
    id: string;
    title: string;
    subTitle: string;
  };
  time: string;
  id: string;
  content: string;
}

export interface IQuestion extends IBaseNode {
  topic: any[];
}

export interface ICase extends IBaseNode {
  date: any[];
  block: any[];
  form: any[];
}
