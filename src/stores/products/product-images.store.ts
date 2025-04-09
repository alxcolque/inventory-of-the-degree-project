import { isAxiosError } from "axios";
import { toast } from "sonner";
import { create, StateCreator } from "zustand";
import { appDB } from "../../api";


interface ProductImageState {
    productImages: [];
    productImage: {} | any;
}
interface Action {
    getProductImages: (productId: number, token: string) => Promise<void>;
    createProductImage: (data: any, token: string) => Promise<void>;
    deleteProductImage: (productId: number, id: number, token: string) => Promise<void>;
}

const storeApi: StateCreator<ProductImageState & Action> = (set, get) => ({
    productImages: [],
    productImage: {},
    getProductImages: async (id: number, token: string) => {  
        try {
            const response = await appDB.get(`/product-images/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            set({ productImages: response.data as any });
        } catch (error) {
            if (isAxiosError(error)) {
                toast.error(error.response?.data.message);
            }
        }
    },
    
    createProductImage: async (data: any, token: string) => {
        try {
            const response = await appDB.post(`/product-images`, data, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            toast.success(response.data.message);
            get().getProductImages(data.product_id, token);
        } catch (error) {
            if (isAxiosError(error)) {
                toast.error(error.response?.data.message);
            }
        }
    },

    deleteProductImage: async (productId: number, id: number, token: string) => {
        try {
            const response = await appDB.delete(`/product-images/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            toast.success(response.data.message);
            get().getProductImages(productId, token);
        } catch (error) {
            if (isAxiosError(error)) {
                toast.error(error.response?.data.message);
            }
        }
    }
});

export const useProductImagesStore = create<ProductImageState & Action>()(storeApi);
