import { create, StateCreator } from "zustand";
import { IInventoriesResponse } from "../../interface";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import { inventories } from "../../api/systemdata";

interface InventoriesState {
  inventories: IInventoriesResponse[];
}
interface Actions{
    getInventories: (token: string) => void;
}

const storeApi: StateCreator<InventoriesState & Actions> = (set) => ({
  inventories: [],
  getInventories: async (token: string) => {
    // todo:: get inventories from api
    try {   
        /* const response = await axios.get(`${import.meta.env.VITE_API_URL}/categories`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }); */
        const response = inventories;
        console.log(token);
        set({ inventories: response as any });
    } catch (error) {
        if (isAxiosError(error)) {
            toast.error(error.response?.data.message);
        }
    }
  },
});

export const useInventoriesStore = create<InventoriesState & Actions>()(storeApi);
