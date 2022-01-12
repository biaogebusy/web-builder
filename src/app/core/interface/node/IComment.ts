export interface ICommentRequest {
  type: string;
  entityType: string;
  commentTypeUuid: string;
  nodeUuid: string;
  comment_body: {
    value: any;
    format: string;
  };
}
