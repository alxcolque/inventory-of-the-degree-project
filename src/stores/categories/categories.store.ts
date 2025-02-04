import { create, StateCreator } from "zustand";
import { ICategoriesResponse } from "../../interface";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import { categories } from "../../api/systemdata";

interface CategoriesState {
  categories: ICategoriesResponse[];
}
interface Actions{
    getCategories: (token: string) => void;
}

const storeApi: StateCreator<CategoriesState & Actions> = (set) => ({
  categories: [],
  getCategories: async (token: string) => {
    // todo:: get categories from api
    try {   
        /* const response = await axios.get(`${import.meta.env.VITE_API_URL}/categories`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }); */
        const response = categories;
        console.log(token);
        set({ categories: response as any });
    } catch (error) {
        if (isAxiosError(error)) {
            toast.error(error.response?.data.message);
        }
    }
  },
});

export const useCategoriesStore = create<CategoriesState & Actions>()(storeApi);
