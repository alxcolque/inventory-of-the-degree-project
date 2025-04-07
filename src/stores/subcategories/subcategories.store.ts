import { create, StateCreator } from "zustand";
import { ISubcategoriesResponse, ISubcategoryResponse } from "../../interface";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import { appDB } from "../../api/appDB";

interface SubcategoriesState {
  subcategories: ISubcategoryResponse[];
  subcategory: {};
}
interface Actions {
  getSubcategories: (token: string) => void;
  getSubcategory: (id: number, token: string) => void;
  createSubcategory: (subcategory: [], token: string) => void;
  updateSubcategory: (id: number, subcategory: ISubcategoriesResponse, token: string) => void;
  deleteSubcategory: (id: number, token: string) => void;
}

const storeApi: StateCreator<SubcategoriesState & Actions> = (set, get) => ({
  subcategories: [],
  subcategory: {},
  getSubcategories: async (token: string) => {
    // todo:: get categories from api
    try {
      const response = await appDB.get('/subcategories', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      set({ subcategories: response.data.subCategories as any });
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
  },
  getSubcategory: async (id: number, token: string) => {
    try {
      const response = await appDB.get(`/categories/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({ subcategory: response.data as any });
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
  },
  createSubcategory: async (subcategory: [], token: string) => {
    try {
      const response = await appDB.post('/subcategories', subcategory, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      get().getSubcategories(token);
      toast.success(response.data.message);
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
  },
  updateSubcategory: async (id: number, subcategory: ISubcategoriesResponse, token: string) => {
    try {
      const response = await appDB.put(`/subcategories/${id}`, subcategory, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      get().getSubcategories(token);
      toast.success(response.data.message);
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
  },
  deleteSubcategory: async (id: number, token: string) => {
    try {
      const response = await appDB.delete(`/subcategories/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      get().getSubcategories(token);
      toast.success(response.data.message);
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
  }
});

export const useSubcategoriesStore = create<SubcategoriesState & Actions>()(storeApi);
