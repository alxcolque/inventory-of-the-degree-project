import { create, StateCreator } from "zustand";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import { appDB } from "../../api/appDB";

interface OrdersState {
    backup: {};
}
interface Actions {
    getBackup: (token: string) => void;
}

const storeApi: StateCreator<OrdersState & Actions> = (set) => ({
    backup: {},
    getBackup: async (token: string) => {
        try {
            const response = await appDB.get(`/download-backup`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            /* Si mensaje es 404 */
            if (response.data.message === "404") {
                toast.error(response.data.message);
            } else {
                toast.success(response.data.message);
                set({ backup: response.data });
            }
        } catch (error) {
            if (isAxiosError(error)) {
                toast.error(error.response?.data.message);
            }
        }
    }
});

export const useHomeStore = create<OrdersState & Actions>()(storeApi);
