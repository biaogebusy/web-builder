export interface IArticleAccess {
  canAccess: boolean;
  isReqRule: boolean;
  isPayed: boolean;
  reqMoney: number;
  payUrl: string;
}
