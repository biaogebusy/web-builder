export interface IArticleAccess {
  canAccess: boolean;
  isReqRoles: boolean;
  isPayed: boolean;
  reqMoney: number;
  payUrl: string;
}
