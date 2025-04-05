import {create, StateCreator} from "zustand";
import { IShopResponse } from "../../interface/shops/shop-response";
//import { shops } from "../../api/systemdata";
import { appDB } from "../../api";
import { isAxiosError } from "axios";
import { toast } from "sonner";
                                            


interface ShopsState{
    shops: IShopResponse[];
    shop: IShopResponse;
}

interface Actions{
    getShops: ( token: string) => Promise<void>;
    getShop: (id: number, token: string) => Promise<void>;
    addShop: (shop: [] | any, token: string) => Promise<void>;
    updateShop: (shop: [] | any, id: number, token: string) => Promise<void>;
    deleteShop: (id: number, token: string) => Promise<void>;
}

const storeApi: StateCreator<ShopsState & Actions> = (set, get) => ({
    shops: [],
    shop: {} as IShopResponse,
    getShops: async (token: string) => {
        const response = await appDB.get('/stores', { headers: { Authorization: `Bearer ${token}` } });
        set({ shops: response.data as any });
    },
    getShop: async (id: number, token: string) => {
        try {
            const response = await appDB.get(`/stores/${id}`, { 
                headers: { 
                    Authorization: `Bearer ${token}` 
            } 
        });
        set({ shop: response.data.shop as any });
        } catch (error) {
            if (isAxiosError(error)) {
                toast.error(error.response?.data.message);
            }
        }
    },
    addShop: async (shop: IShopResponse, token: string) => {
        try {
            const response = await appDB.post('/stores', shop, { headers: { Authorization: `Bearer ${token}` } });
            get().getShops(token);
            toast.success(response.data.message);

            
        } catch (error) {
            if (isAxiosError(error)) {
                toast.error(error.response?.data.message);
            }
        }
    },
    updateShop: async (shop: IShopResponse, id: number, token: string) => {
        try {
            const response = await appDB.put(`/stores/${id}`, shop, { headers: { Authorization: `Bearer ${token}` } });
            get().getShops(token);
            toast.success(response.data.message);
        } catch (error) {
            if (isAxiosError(error)) {
                toast.error(error.response?.data.message);
            }
        }
    },
    deleteShop: async (id: number, token: string) => {
        try {
            const response = await appDB.delete(`/stores/${id}`, { 
                headers: { Authorization: `Bearer ${token}` } 
            });

            get().getShops(token);
            toast.success(response.data.message);
            
        } catch (error) {
            if (isAxiosError(error)) {
                toast.error(error.response?.data.message);
            }
        }
    }
});

export const useShopsStore = create<ShopsState & Actions>()(storeApi);

