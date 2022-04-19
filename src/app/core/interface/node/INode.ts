export interface IBaseNode {
  title: string;
  body: string;
  banner?: any;
  meta?: any[];
  params?: {
    comment?: ICommentPrams;
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

export interface ICommentPrams {
  type: string;
  attributes: {
    entity_type: string;
    field_name: string;
  };
  relationships: {
    comment_type: {
      data: {
        type: string;
        id: string;
      };
    };
    entity_id: {
      data: {
        type: string;
        id: string;
      };
    };
  };
}

export interface IQuestion extends IBaseNode {
  topic: any[];
}

export interface ICase extends IBaseNode {
  date: any[];
  block: any[];
}
