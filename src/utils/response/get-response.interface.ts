export interface Pagination {
  total: number;
  totalPages: number;
  page: number;
  perPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface GetResponseInterface<T> {
  data: T[];
  pagination: Pagination;
}
