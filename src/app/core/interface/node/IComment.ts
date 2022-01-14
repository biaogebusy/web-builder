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
  attributes: {
    entity_type: string;
    field_name: string;
    comment_body: {
      value: any;
      format: string;
    };
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
