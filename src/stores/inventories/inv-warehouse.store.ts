import { create, StateCreator } from "zustand";
import { IListWarehouseResponse } from "../../interface/inventories/warehouse/list-warehouse-response";
//import { stockWarehouse } from "../../api/systemdata";
import { appDB } from "../../api/appDB";
import { toast } from "sonner";
import { isAxiosError } from "axios";
interface WarehouseState {
    warehouseProducts: IListWarehouseResponse[];
    categories: [];
}

interface Action {
    getWarehouseProducts: (slug: string, token: string) => Promise<void>;
    addWarehouseProduct: (product: {}, token: string) => Promise<void>;
    deleteWarehouseProduct: (id: number, token: string) => Promise<void>;
}

const storeApi: StateCreator<WarehouseState & Action> = (set, get) => ({
    categories: [],
    warehouseProducts: [],
    getWarehouseProducts: async (slug: string, token: string) => {
        try {
            const response = await appDB.get('/inventory-warehouses', {params: {slug},
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            set({ warehouseProducts: response.data.products });
            set({ categories: response.data.categories });
        } catch (error) {
            if (isAxiosError(error)) {
                toast.error(error.response?.data.message || 'Error al obtener los productos del almacén');
            }
        }
    },
    addWarehouseProduct: async (product: {}, token: string) => {
        try {
            const response = await appDB.post('/inventory-warehouses', product, { 
                headers: { 
                    Authorization: `Bearer ${token}` 
                } 
            });
            toast.success(response.data.message);
        } catch (error) {
            console.log(error);
        }
    },
    deleteWarehouseProduct: async (id: number, token: string) => {
        try {
            const response = await appDB.delete(`/inventory-warehouses/${id}`, { headers: { Authorization: `Bearer ${token}` } });
            toast.success(response.data.message);
            get().getWarehouseProducts("", token);
        } catch (error) {
            console.log(error);
        }
    },
});


export const useWarehouseStore = create<WarehouseState & Action>()(storeApi);