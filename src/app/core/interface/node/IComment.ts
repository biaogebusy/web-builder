export interface ICommentParams {
  type: string;
  entityType: string;
  commentTypeUuid: string;
  nodeUuid: string;
  comment_body: {
    value: any;
    format: string;
  };
}

export interface ICommentRequest {
  type: string;
  attributes: any;
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
