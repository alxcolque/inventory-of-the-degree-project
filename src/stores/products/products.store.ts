import { isAxiosError } from "axios";
import { toast } from "sonner";
import { create, StateCreator } from "zustand";
import { IProductResponse } from "../../interface";
import { products } from "../../api/systemdata";


interface ProductState {
    products: IProductResponse[];
}
interface Action {
    getProducts: (token: string) => Promise<void>;
}

const storeApi: StateCreator<ProductState & Action> = (set) => ({
    products: [],
    getProducts: async (token: string) => {  
        try {
            /* const response = await axios.get('https://api.example.com/products', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data; */
            console.log(token);
            const response = products;
            set({ products: response as any });
        } catch (error) {
            if (isAxiosError(error)) {
                toast.error(error.response?.data);
            }
        }
    }
});

export const useProductsStore = create<ProductState & Action>()(storeApi);
