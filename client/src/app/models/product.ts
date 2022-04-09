export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    pictureUrl: string;
    type?: string; //to make the property optional
    brand: string;
    quantityInStock?: number;
}

export interface ProductParams {
    orderBy: string;
    searchTerm?: string;
    brands?: string[];
    types?: string[];
    pageNumber: number;
    pageSize: number;
}