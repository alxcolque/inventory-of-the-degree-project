import { create, StateCreator } from "zustand";

import { isAxiosError } from "axios";
import { toast } from "sonner";

import { suppliers } from "../../api/systemdata";

import { ISuppliersResponse } from "../../interface/suppliers/suppliers-response";

interface SuppliersState {
  suppliers: ISuppliersResponse[];
}
interface Actions {
  getSuppliers: (token: string) => void;
}

const storeApi: StateCreator<SuppliersState & Actions> = (set) => ({
  suppliers: [],
  getSuppliers: async (token: string) => {
    // todo:: get categories from api
    try {
      /* const response = await axios.get(`${import.meta.env.VITE_API_URL}/categories`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }); */
      const response = suppliers;
      console.log(token);
      set({ suppliers: response as any });
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
  },
});

export const useSupplierStore = create<SuppliersState & Actions>()(storeApi);
