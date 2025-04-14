import { create, StateCreator } from "zustand";
import { IStoreInventoriesResponse } from "../../interface";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import { appDB } from "../../api";


interface ShopsState {
  shops: IStoreInventoriesResponse[];
  products: [];
  storeProducts: [];
  categories: [];
}

interface Actions {
  getStoreProducts: (storeId: number, token: string) => void;
  getProducts: (token: string) => void;
  /* DB */
  createOutput: (data: any, token: string) => void;
}


const storeApi: StateCreator<ShopsState & Actions> = (set) => ({
  shops: [],
  products: [],
  storeProducts: [],
  categories: [],
  getStoreProducts: async (storeId: number, token: string) => {
    //console.log(storeId);
    
    try {
      const response = await appDB.get(`/inventory-stores-get-by-store-id/${storeId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      //console.log(response.data);
      set({ storeProducts: response.data.products });
      set({ categories: response.data.categories });
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message || 'Error al obtener los productos de la tienda');
      }
    }
  },
  getProducts: async (token: string) => {
    // todo:: get products from api
    try {
      const response = await appDB.get('/inventory-stores', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      set({ products: response.data.products });
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
      //return response;
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
  }
});

export const useStockStore = create<ShopsState & Actions>()(storeApi);
