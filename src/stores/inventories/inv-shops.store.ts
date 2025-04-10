import { create, StateCreator } from "zustand";
import { IListStoreResponse, IStoreInventoriesResponse } from "../../interface";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import { inventories, stockStore } from "../../api/systemdata";
import { appDB } from "../../api";


interface ShopsState {
  shops: IStoreInventoriesResponse[];
  products: IListStoreResponse[];
}

interface Actions{
    getShops: (token: string) => void;
    getProducts: (token: string) => void;
    /* DB */
    createOutput: (data: any, token: string) => void;
}


const storeApi: StateCreator<ShopsState & Actions> = (set) => ({
  shops: [],
  products: [],
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
  getProducts: async (token: string) => {
    // todo:: get products from api
    try {
      /* const response = await axios.get(`${import.meta.env.VITE_API_URL}/categories`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }); */
      const response = stockStore;
      console.log(token);
      set({ products: response as any });
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
  },
  createOutput: async (data: any, token: string) => {
    // todo:: create output from api
    try {
      const response = await appDB.post('/inventory-stores', data, { 
        headers: { 
            Authorization: `Bearer ${token}` 
        } 
      });
      toast.success(response.data.message);
      return response;
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
  }
});

export const useStockStore = create<ShopsState & Actions>()(storeApi);
