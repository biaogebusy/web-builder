import { IImg } from '@core/interface/widgets/IImg';
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
    title: any;
    config: any;
    placeholder: string;
    action: any;
    succes: any;
  };
  comment?: ICommentConfig;
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
    comment_body: {
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
    img: IImg;
    id: string;
    title: string;
    subTitle: string | null;
    align: string;
  };
  time: string;
  id: string;
  content: string;
  child: ICommentContent[] | [];
  level: number;
}

export interface ICommentConfig {
  actions: string[];
}

export interface IQuestion extends IBaseNode {
  topic: any[];
}

export interface ICase extends IBaseNode {
  date: any[];
  block: any[];
  form: any[];
}

export interface ICasePrams {
  transaction_level: 'general' | 'important' | 'exigence';
  case_procedure: string;
  lawyer: string;
}
