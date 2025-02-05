import { create, StateCreator } from "zustand";
import { ISubcategoriesResponse } from "../../interface";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import { subcategories } from "../../api/systemdata";

interface SubcategoriesState {
  subcategories: ISubcategoriesResponse[];
}
interface Actions{
   getSubcategories: (token: string) => void;
}

const storeApi: StateCreator<SubcategoriesState & Actions> = (set) => ({
  subcategories: [],
 getSubcategories: async (token: string) => {
    // todo:: get categories from api
    try {   
        /* const response = await axios.get(`${import.meta.env.VITE_API_URL}/categories`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }); */
        const response = subcategories;
        console.log(token);
        set({ subcategories: response as any });
    } catch (error) {
        if (isAxiosError(error)) {
            toast.error(error.response?.data.message);
        }
    }
  },
});

export const useSubcategoriesStore = create<SubcategoriesState & Actions>()(storeApi);
