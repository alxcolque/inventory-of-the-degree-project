import { create, StateCreator } from "zustand";
import { ICategoryResponse } from "../../interface";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import { appDB } from "../../api/appDB";

interface CategoriesState {
  categories: ICategoryResponse[];
  category: ICategoryResponse;
}
interface Actions{
    getCategories: (token: string) => void;
    getCategory: (id: number, token: string) => void;
    createCategory: (data: ICategoryResponse, token: string) => void;
    updateCategory: (id: number, data: ICategoryResponse, token: string) => void;
    deleteCategory: (id: number, token: string) => void;
}

const storeApi: StateCreator<CategoriesState & Actions> = (set, get) => ({
  categories: [],
  category: {} as ICategoryResponse,
  getCategories: async (token: string) => {
    // todo:: get categories from api
    try {   
        const response = await appDB.get('/categories', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        
        set({ categories: response.data as any });
    } catch (error) {
        if (isAxiosError(error)) {
            toast.error(error.response?.data.message);
        }
    }
  },
  getCategory: async (id: number, token: string) => {
    // todo:: get category from api
    try {
        const response = await appDB.get(`/categories/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        set({ category: response.data as ICategoryResponse });
    } catch (error) {
        if (isAxiosError(error)) {
            toast.error(error.response?.data.message);
        }
    }
  },
  createCategory: async (data: ICategoryResponse, token: string) => {
    // todo:: create category from api
    try {
        const response = await appDB.post('/categories', data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        toast.success(response.data.message);
        get().getCategories(token);
    } catch (error) {
        if (isAxiosError(error)) {
            toast.error(error.response?.data.message);
        }
    }
  },
  updateCategory: async (id: number, data: ICategoryResponse, token: string) => {
    // todo:: update category from api
    try {
        const response = await appDB.put(`/categories/${id}`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        toast.success(response.data.message);
        get().getCategories(token);
    } catch (error) {
        if (isAxiosError(error)) {
            toast.error(error.response?.data.message);
        }
    }
  },
  deleteCategory: async (id: number, token: string) => {
    // todo:: delete category from api
    try {
        const response = await appDB.delete(`/categories/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        toast.success(response.data.message);
        get().getCategories(token);
    } catch (error) {
        if (isAxiosError(error)) {
            toast.error(error.response?.data.message);
        }
    }
  },
});

export const useCategoriesStore = create<CategoriesState & Actions>()(storeApi);
