import { isAxiosError } from "axios";
import { toast } from "sonner";
import { create, StateCreator } from "zustand";
import { IProductResponse } from "../../interface";
import { appDB } from "../../api";


interface ProductState {
    products: IProductResponse[];
    product: IProductResponse;
}
interface Action {
    getProducts: (token: string) => Promise<void>;
    getProduct: (id: number, token: string) => Promise<void>;
    createProduct: (product: IProductResponse, token: string) => Promise<void>;
    updateProduct: (id: number, product: IProductResponse, token: string) => Promise<void>;
    deleteProduct: (id: number, token: string) => Promise<void>;
}

const storeApi: StateCreator<ProductState & Action> = (set, get) => ({
    products: [],
    product: {} as IProductResponse,
    getProducts: async (token: string) => {  
        try {
            const response = await appDB.get('/products', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            set({ products: response.data as any });
        } catch (error) {
            if (isAxiosError(error)) {
                toast.error(error.response?.data.message);
            }
        }
    },
    getProduct: async (id: number, token: string) => {
        try {
            const response = appDB.get(`/products/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            set({ product: response as any });
        } catch (error) {
            if (isAxiosError(error)) {
                toast.error(error.response?.data.message);
            }
        }
    },
    createProduct: async (product: IProductResponse, token: string) => {
        try {
            const response = await appDB.post('/products', product, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            toast.success(response.data.message);
            get().getProducts(token);
        } catch (error) {
            if (isAxiosError(error)) {
                toast.error(error.response?.data.message);
            }
        }
    },
    updateProduct: async (id: number, product: IProductResponse, token: string) => {
        try {
            const response = await appDB.put(`/products/${id}`, product, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            toast.success(response.data.message);
            get().getProducts(token);
        } catch (error) {
            if (isAxiosError(error)) {
                toast.error(error.response?.data.message);
            }
        }
    },
    deleteProduct: async (id: number, token: string) => {
        try {
            const response = await appDB.delete(`/products/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            toast.success(response.data.message);
            get().getProducts(token);
        } catch (error) {
            if (isAxiosError(error)) {
                toast.error(error.response?.data.message);
            }
        }
    }
});

export const useProductsStore = create<ProductState & Action>()(storeApi);
