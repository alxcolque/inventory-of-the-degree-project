export interface IListWarehouseResponse {
    id: number;
    name: string;
    slug: string;
    category: string;
    product: IProduct[];
}

export interface IProduct {
    id: number;
    name: string;
    slug: string;
    price: number;
    description: string;
    image: string;
    quantity: number;
    unit: string;
    restockDate: Date;
    brand: string;
}
