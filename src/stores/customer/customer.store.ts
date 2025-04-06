import { create, StateCreator } from "zustand";

import { isAxiosError } from "axios";
import { toast } from "sonner";

//import { customers } from "../../api/systemdata";
import { ICustomersResponse } from "../../interface/customer/customers-response";
import { appDB } from "../../api/appDB";
import { ICustomerResponse } from "../../interface/customer/customer-response";

interface CustomersState {
  customers: ICustomersResponse[];
  customer: ICustomerResponse;
}
interface Actions {
  getCustomers: (token: string) => void;
  getCustomer: (id: number, token: string) => void;
  createCustomer: (customer: ICustomersResponse, token: string) => void;
  updateCustomer: (id: number, customer: [], token: string) => void;
  deleteCustomer: (id: number, token: string) => void;
}

const storeApi: StateCreator<CustomersState & Actions> = (set, get) => ({
  customers: [],
  customer: {} as ICustomerResponse,
  getCustomers: async (token: string) => {
    // todo:: get categories from api
    try {
      const response = await appDB.get('/customers', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({ customers: response.data as any });
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
  },
  getCustomer: async (id: number, token: string) => {
    try {
      const response = await appDB.get(`/customers/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({ customer: response.data as any });
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
  },
  createCustomer: async (customer: ICustomersResponse, token: string) => {
    try {
      const response = await appDB.post('/customers', customer, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success(response.data.message);
      get().getCustomers(token);
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
  },
  updateCustomer: async (id: number, customer: [], token: string) => {
    try {
      const response = await appDB.put(`/customers/${id}`, customer, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success(response.data.message);
      get().getCustomers(token);
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
  },
  deleteCustomer: async (id: number, token: string) => {
    try {
      const response = await appDB.delete(`/customers/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(response.data.message);
      get().getCustomers(token);
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
  },
});

export const useCustomerStore = create<CustomersState & Actions>()(storeApi);
