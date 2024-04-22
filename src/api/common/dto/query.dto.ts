import { IQuery } from '../interfaces/query.interface';

export class QueryDto<IdType = string> implements IQuery<IdType> {
  search?: string;
  elementsPerPage?: number;
  page?: number;
  lastElementId?: IdType;

  constructor(query: IQuery<IdType>) {
    this.search = query.search;
    this.elementsPerPage = query.elementsPerPage;
    this.page = query.page;
    this.lastElementId = query.lastElementId;
  }
}
