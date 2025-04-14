import { create, StateCreator } from "zustand";
import { ISaleResponse } from "../../interface";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import { appDB } from "../../api/appDB";

interface OrdersState {
  sales: ISaleResponse[];
}
interface Actions{
    getSales: (token: string) => void;
    /* sales in store */
    getSalesInStore: (slug: string, token: string ) => void;
    createSale: (data: any, token: string) => void;
}

const storeApi: StateCreator<OrdersState & Actions> = (set) => ({
  sales: [],
  getSales: async (token: string) => {
    try {
        const response = await appDB.get('/sales', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        set({ sales: response.data.sales });
    } catch (error) {
        if (isAxiosError(error)) {
            toast.error(error.response?.data.message);
        }
    }
  },
  getSalesInStore: async (slug: string, token: string ) => {
    try {
        const response = await appDB.get(`/sales-get-by-store-id/${slug}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        set({ sales: response.data.sales });
    } catch (error) {
        if (isAxiosError(error)) {
            toast.error(error.response?.data.message);
        }
    }
  },

  createSale: async (data: ISaleResponse, token: string) => {
    try {
        const response = await appDB.post('/sales', data, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        toast.success(response.data.message);
        //return response;
      } catch (error) {
        if (isAxiosError(error)) {
          toast.error(error.response?.data.message);
        }
      }
  }
});

export const useOrdersStore = create<OrdersState & Actions>()(storeApi);
