import { create, StateCreator } from "zustand";

import { isAxiosError } from "axios";
import { toast } from "sonner";

//import { suppliers } from "../../api/systemdata";

import { ISupplierResponse } from "../../interface/suppliers/supplier-response";
import { appDB } from "../../api";

interface SuppliersState {
  suppliers: ISupplierResponse[];
  supplier: ISupplierResponse;
}
interface Actions {
  getSuppliers: (token: string) => void;
  getSupplier: (id: number, token: string) => Promise<void>;
  createSupplier: (supplier: ISupplierResponse, token: string) => Promise<void>;
  updateSupplier: (id: number, supplier: ISupplierResponse, token: string) => Promise<void>;
  deleteSupplier: (id: number, token: string) => Promise<void>;
}

const storeApi: StateCreator<SuppliersState & Actions> = (set, get) => ({
  suppliers: [],
  supplier: {} as ISupplierResponse,
  getSuppliers: async (token: string) => {
    try {
      const response = await appDB.get('/suppliers', {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
      set({ suppliers: response.data as any });
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
  },
  getSupplier: async (id: number, token: string)=> {
    const response = await appDB.get(`/suppliers/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    set({ supplier: response.data as ISupplierResponse });
  },
  createSupplier: async (supplier: ISupplierResponse, token: string) => {
    try {
      const response = await appDB.post('/suppliers', supplier, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(response.data.message);
      get().getSuppliers(token);
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
  },
  updateSupplier: async (id: number, supplier: ISupplierResponse, token: string) => {
    try {
      const response = await appDB.put(`/suppliers/${id}`, supplier, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(response.data.message); 
      get().getSuppliers(token);
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
  },
  deleteSupplier: async (id: number, token: string) => {
    try {
      const response = await appDB.delete(`/suppliers/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },  
      });
      toast.success(response.data.message);
      get().getSuppliers(token);
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
  } 
});

export const useSupplierStore = create<SuppliersState & Actions>()(storeApi);