import { create, StateCreator } from "zustand";
import { IOrdersResponse, ISaleResponse } from "../../interface";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import { orders, sales } from "../../api/systemdata";

interface OrdersState {
  orders: IOrdersResponse[];
  sales: ISaleResponse[];
}
interface Actions{
    getOrders: (token: string) => void;
}

const storeApi: StateCreator<OrdersState & Actions> = (set) => ({
  orders: [],
  sales: [],
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
  getSales: async (token: string) => {
    // todo:: get inventories from api
    console.log(token);
    try {
        const response = sales;
        set({ sales: response as any });
    } catch (error) {
        if (isAxiosError(error)) {
            toast.error(error.response?.data.message);
        }
    }
  },
});

export const useOrdersStore = create<OrdersState & Actions>()(storeApi);
