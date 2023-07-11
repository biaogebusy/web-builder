export interface IUserCenter {
  type: string;
  params: {
    showProfile: boolean;
    showDetails: boolean;
  };
  main?: any;
  left: any[];
  right: any[];
}
