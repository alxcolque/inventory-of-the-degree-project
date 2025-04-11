export interface ISaleResponse {
    id: number,
    customer: {
        name: string,
        email: string,
        phone: string,
        address: string,
    },
    shop: string,
    total: number,
    status: string,
    date: string,
    created_at: string,
}
