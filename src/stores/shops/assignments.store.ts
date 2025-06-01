import { create, StateCreator } from "zustand";
import { IShopResponse } from "../../interface/shops/shop-response";
//import { shops } from "../../api/systemdata";
import { appDB } from "../../api";
import { isAxiosError } from "axios";
import { toast } from "sonner";



interface AssignmentsState {
    assignments: IShopResponse[];
}

interface Actions {
    getAssignments: (id: number, token: string) => Promise<void>;
    addAssignment: (shop: [] | any, token: string) => Promise<void>;
    deleteAssignment: (id: number, shopId: number, token: string) => Promise<void>;
}

const storeApi: StateCreator<AssignmentsState & Actions> = (set, get) => ({
    assignments: [],
    getAssignments: async (id: number, token: string) => {
        try {
            const response = await appDB.get(`/assignments-get-by-store-id/${id}`, { headers: { Authorization: `Bearer ${token}` } });
            set({ assignments: response.data.assignments as any });
        } catch (error) {
            if (isAxiosError(error)) {
                toast.error("Error al obtener los trabajadores", {
                    description: error.response?.data.message
                });
            }
        }
    },
    addAssignment: async (shop: IShopResponse, token: string) => {
        try {
            const response = await appDB.post('/assignments', shop, { headers: { Authorization: `Bearer ${token}` } });
            
            toast.success(response.data.message);
        } catch (error) {
            if (isAxiosError(error)) {
                toast.error(error.response?.data.message);
            }
        }
    },
    deleteAssignment: async (id: number, shopId: number, token: string) => {
        try {
            const response = await appDB.delete(`/assignments/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            get().getAssignments(shopId, token);
            toast.success(response.data.message);

        } catch (error) {
            if (isAxiosError(error)) {
                toast.error(error.response?.data.message);
            }
        }
    }
});

export const useAssignmentsStore = create<AssignmentsState & Actions>()(storeApi);

