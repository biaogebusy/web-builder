import type { IDynamicInputs } from '../IAppConfig';

export type IComponentToolbar = object & {
  type?: string;
  path?: string;
  content?: IDynamicInputs;
};
