import { Types } from 'mongoose';

export interface IIdParams {
  id: string;
}

export interface IListResponse<Entity> {
  count: number;
  items: Entity[];
}

export interface IPaginationQuery {
  limit: string;
  offset: string;
}

export type DBEntity<Entity> = Entity & {
  _id: Types.ObjectId;
};
