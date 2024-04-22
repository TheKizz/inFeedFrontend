import { IQuery } from './query.interface';

export interface IPaginatedResult<IdType, Entity> {
  query: IQuery<IdType>;
  result: Entity[];
  actualPage: number;
  lastPage: number;
  firstPage: number;
  totalPages: number;
  totalElements: number;
}
