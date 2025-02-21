import { create, StateCreator } from "zustand";
import { IBrandResponse } from "../../interface";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import { brands } from "../../api/systemdata";

interface BrandsState {
  brands: IBrandResponse[];
}
interface Actions{
    getBrands: (token: string) => void;
}

const storeApi: StateCreator<BrandsState & Actions> = (set) => ({
  brands: [],
  getBrands: async (token: string) => {
    // todo:: get categories from api
    try {   
        /* const response = await axios.get(`${import.meta.env.VITE_API_URL}/categories`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }); */
        const response = brands;
        console.log(token);
        set({ brands: response as any });
    } catch (error) {
        if (isAxiosError(error)) {
            toast.error(error.response?.data.message);
        }
    }
  },
});

export const useBrandsStore = create<BrandsState & Actions>()(storeApi);
