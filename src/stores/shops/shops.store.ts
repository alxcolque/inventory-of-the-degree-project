import {create, StateCreator} from "zustand";
import { IShopResponse } from "../../interface/shops/shop-response";
import { shops } from "../../api/systemdata";
                                            


interface ShopsState{
    shops: IShopResponse[];
    shop: IShopResponse;
}

interface Actions{
    getShops: ( token: string) => Promise<void>;
    getShop: (token: string, slug: string) => Promise<void>;
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
    },
    getShop: async (token: string, slug: string) => {
        //const response = await api.get<IShopResponse>(`/shops/${id}`);
        //set({ shop: response.data });
        console.log(token);
        const response = shops.find(shop => shop.slug === slug);
        set({ shop: response as any });


    } 
});

export const useShopsStore = create<ShopsState & Actions>()(storeApi);

