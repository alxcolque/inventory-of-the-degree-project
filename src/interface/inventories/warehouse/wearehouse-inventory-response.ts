export interface IWarehouseInventoryResponse {
    id: number,
    productId: number,
    supplierId: number,
    price: number,
    quantity: number,
    stockQuantity: number,
    unit: string,
    restockDate: Date,
}
