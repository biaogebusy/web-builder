export interface Button {
  label: string;
  color: string;
}

export interface IShare {
  type: string;
  button: {
    icon: string;
    label: string;
  };
  params: {
    url: string;
  };
}
