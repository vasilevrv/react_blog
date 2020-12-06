export interface Pagination {
    limit: number;
    total: number;
    page: number;
    totalPages: number;
}

export interface PaginatedResult<T> {
    meta: Pagination;
    items: T[];
}