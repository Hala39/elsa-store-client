export class ProductParams {
    pageNumber: number = 1;
    pageSize: number = 10;
    categoryId?: number;
    sizeId?: number;
    orderBy?: string;
    searchString?: string;
}