export interface MetaData {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    totalCount: number;
}

export class PaginatedResopnse<T> {
    items: T;
    meteData: MetaData;

    constructor(items: T, metaData: MetaData) {
        this.items = items;
        this.meteData = metaData;
    }
}