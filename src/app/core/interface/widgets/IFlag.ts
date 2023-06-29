import { IIcon } from './IIcon';

export interface IFlag {
  type: string;
  label: string;
  icon: IIcon;
  params: Params;
}

export interface Params {
  type: string;
  entity_type: string;
  entity_id: string;
  relationships: Relationships;
}

export interface Relationships {
  flagged_entity: FlaggedEntity;
}

export interface FlaggedEntity {
  type: string;
  id: string;
}
