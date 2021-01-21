export interface IChipList {
  label: string;
  color: string;
}

export interface IJob {
  title: string;
  locality: string;
  deadline: string;
  number: number;
  salary: {
    from: number,
    to: number
  };
  relate: any;
}
