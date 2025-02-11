import { create, StateCreator } from "zustand";
import { IListWarehouseResponse } from "../../interface/inventories/warehouse/list-warehouse-response";
import { stockWarehouse } from "../../api/systemdata";
interface WarehouseState {
    //warehouses: IListWarehouseResponse[];
    warehouseProducts: IListWarehouseResponse[];
}


interface Action {
    getWarehouseProducts: (token: string) => Promise<void>;
}

const storeApi: StateCreator<WarehouseState & Action> = (set) => ({
    warehouseProducts: [],
    getWarehouseProducts: async (token: string) => {
        //const response = await api.get<IListWarehouseResponse[]>('/warehouses', { headers: { Authorization: `Bearer ${token}` } });
        try {
            console.log("token", token);
            const response = stockWarehouse;
            set({ warehouseProducts: response });

        } catch (error) {
            console.log(error);
        }

    },
});


export const useWarehouseStore = create<WarehouseState & Action>()(storeApi);