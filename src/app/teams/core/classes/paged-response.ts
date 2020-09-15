export class PagedResponse<T> {
  items: T[];
  metaData: MetaData;
}
export class MetaData {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalCount: number;
  hasPrevious: boolean;
  hasNext: boolean;
}
