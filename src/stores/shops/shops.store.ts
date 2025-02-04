import {create, StateCreator} from "zustand";
import { IShopResponse, IShopsResponse } from "../../interface";
import { shops } from "../../api/systemdata";

interface ShopsState{
    shops: IShopsResponse[];
    shop: IShopResponse;
}
interface Actions{
    getShops: ( token: string) => Promise<void>;
    //getShop: (id: string, token: string) => Promise<void>;
}

const storeApi: StateCreator<ShopsState & Actions> = (set) => ({
    shops: [],
    shop: {} as IShopResponse,
    getShops: async (token: string) => {

        //const response = await api.get<IShopsResponse>("/shops");
        //set({ shops: response.data.shops });

        const response = shops;
        console.log(token);
        set({ shops: response as any });
    }
    /* getShop: async (id: string, token: string) => {
        //const response = await api.get<IShopResponse>(`/shops/${id}`);
        //set({ shop: response.data });

        const response = shops.find(shop => shop.id === id);
        set({ shop: response });
    } 
    */ 
});

export const useShopsStore = create<ShopsState & Actions>()(storeApi);

