import { create, StateCreator } from "zustand";
import { IOrdersResponse } from "../../interface";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import { orders } from "../../api/systemdata";

interface OrdersState {
  orders: IOrdersResponse[];
}
interface Actions{
    getOrders: (token: string) => void;
}

const storeApi: StateCreator<OrdersState & Actions> = (set) => ({
  orders: [],
  getOrders: async (token: string) => {
    // todo:: get inventories from api
    try {   
        /* const response = await axios.get(`${import.meta.env.VITE_API_URL}/categories`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }); */
        const response = orders;
        console.log(token);
        set({ orders: response as any });
    } catch (error) {
        if (isAxiosError(error)) {
            toast.error(error.response?.data.message);
        }
    }
  },
});

export const useOrdersStore = create<OrdersState & Actions>()(storeApi);
