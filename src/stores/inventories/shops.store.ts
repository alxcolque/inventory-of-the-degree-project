import { create, StateCreator } from "zustand";
import { IStoreInventoriesResponse } from "../../interface";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import { inventories } from "../../api/systemdata";


interface ShopsState {
  shops: IStoreInventoriesResponse[];
}

interface Actions{
    getShops: (token: string) => void;
}


const storeApi: StateCreator<ShopsState & Actions> = (set) => ({
  shops: [],
  getShops: async (token: string) => {

    // todo:: get inventories from api
    try {   
        /* const response = await axios.get(`${import.meta.env.VITE_API_URL}/categories`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }); */
        const response = inventories;
        console.log(token);
        set({ shops: response as any });

    } catch (error) {
        if (isAxiosError(error)) {
            toast.error(error.response?.data.message);
        }
    }
  },
});

export const useShopsStore = create<ShopsState & Actions>()(storeApi);
