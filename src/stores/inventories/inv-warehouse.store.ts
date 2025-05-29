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
    getWarehouseProducts: (params: {}, token: string) => Promise<void>;
    addWarehouseProduct: (product: {}, token: string) => Promise<void>;
    deleteWarehouseProduct: (id: number, token: string) => Promise<void>;
    updatePriceQuantity: (id: number, data: {}, token: string) => Promise<void>;
}

const storeApi: StateCreator<WarehouseState & Action> = (set, get) => ({
    categories: [],
    warehouseProducts: [],
    getWarehouseProducts: async (params: {}, token: string) => {
        
        try {
            const response = await appDB.get('/inventory-warehouses', {
                params,
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
            if (isAxiosError(error)) {
                toast.error(error.response?.data.message || 'Error al agregar el producto al almacén');
            }
        }
    },
    deleteWarehouseProduct: async (id: number, token: string) => {
        try {
            const response = await appDB.delete(`/inventory-warehouses/${id}`, { headers: { Authorization: `Bearer ${token}` } });
            toast.success(response.data.message);
            get().getWarehouseProducts("", token);
        } catch (error) {
            if (isAxiosError(error)) {
                toast.error(error.response?.data.message || 'Error al eliminar el producto del almacén');
            }
        }
    },
    updatePriceQuantity: async (id: number, data: {}, token: string) => {
        try {
            const response = await appDB.put(`/inventory-warehouses/${id}`, data, { headers: { Authorization: `Bearer ${token}` } });
            toast.success(response.data.message);
            get().getWarehouseProducts("", token);
        } catch (error) {
            if (isAxiosError(error)) {
                toast.error(error.response?.data.message || 'Error al actualizar el precio o cantidad del producto del almacén');
            }
        }
    }
});


export const useWarehouseStore = create<WarehouseState & Action>()(storeApi);