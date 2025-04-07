import { create, StateCreator } from "zustand";
import { IBrandResponse } from "../../interface";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import { appDB } from "../../api/appDB";

interface BrandsState {
  brands: IBrandResponse[];
  brand: IBrandResponse;
}
interface Actions{
    getBrands: (token: string) => void;
    getBrand: (id: number, token: string) => Promise<void>;
    createBrand: (brand: IBrandResponse, token: string) => Promise<void>;
    updateBrand: (id: number, brand: IBrandResponse, token: string) => Promise<void>;
    deleteBrand: (id: number, token: string) => Promise<void>;
}

const storeApi: StateCreator<BrandsState & Actions> = (set, get) => ({
  brands: [],
  brand: {} as IBrandResponse,
  getBrands: async (token: string) => {
    try {
        const response = await appDB.get('/brands', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        set({ brands: response.data as IBrandResponse[] });
    } catch (error) {
        if (isAxiosError(error)) {
            toast.error(error.response?.data.message);
        }
    }
  },
  getBrand: async (id: number, token: string) => {
    try {
        const response = await appDB.get(`/brands/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`, 
            },
        });
        set({ brand: response.data as IBrandResponse });
    } catch (error) {
        if (isAxiosError(error)) {
            toast.error(error.response?.data.message);
        }
    }
  },
  createBrand: async (brand: IBrandResponse, token: string) => {
    try {
        const response = await appDB.post('/brands', brand, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        toast.success(response.data.message);
        get().getBrands(token);
    } catch (error) {
        if (isAxiosError(error)) {
            toast.error(error.response?.data.message);
        }
    }
  },
  updateBrand: async (id: number, brand: IBrandResponse, token: string) => {
    try {
        const response = await appDB.put(`/brands/${id}`, brand, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        toast.success(response.data.message);
        get().getBrands(token);
    } catch (error) {
        if (isAxiosError(error)) {
            toast.error(error.response?.data.message);
        }
    }
  },
  deleteBrand: async (id: number, token: string) => {
    try {
        const response = await appDB.delete(`/brands/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        toast.success(response.data.message);
        get().getBrands(token);
    } catch (error) {
        if (isAxiosError(error)) {
            toast.error(error.response?.data.message);
        }
    }
  }
});

export const useBrandsStore = create<BrandsState & Actions>()(storeApi);
