import { IQuery } from "../interfaces/query.interface";

export function buildQueryParams<IdType = string>(query: IQuery<IdType>) {
  return Object.entries(query)
    .map(([key, value]) => (value ? `${key}=${value}` : ""))
    .join("&");
}
