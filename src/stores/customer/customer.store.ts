import { create, StateCreator } from "zustand";

import { isAxiosError } from "axios";
import { toast } from "sonner";

import { customers } from "../../api/systemdata";
import { ICustomersResponse } from "../../interface/customer/customers-response";

interface CustomersState {
  customers: ICustomersResponse[];
}
interface Actions {
  getCustomers: (token: string) => void;
}

const storeApi: StateCreator<CustomersState & Actions> = (set) => ({
  customers: [],
  getCustomers: async (token: string) => {
    // todo:: get categories from api
    try {
      /* const response = await axios.get(`${import.meta.env.VITE_API_URL}/categories`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }); */
      const response = customers;
      console.log(token);
      set({ customers: response as any });
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
  },
});

export const useCustomerStore = create<CustomersState & Actions>()(storeApi);
