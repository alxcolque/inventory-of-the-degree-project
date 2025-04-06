import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { DynamicBreadcrumbs } from "../../../components";
import { useAuthStore, useCustomerStore } from "../../../stores";
export const ShowCustomers = () => {
    const { id } = useParams();
    const token = useAuthStore(state => state.token);
    const customer = useCustomerStore(state => state.customer);
    const getCustomer = useCustomerStore(state => state.getCustomer);

    const handleGetCustomer = () => {
        if (id && token) {
            getCustomer(Number(id), token);
        }
    }

    useEffect(() => {
        handleGetCustomer();
    }, []);

    

    return (
        <div className="my-2 px-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
            <DynamicBreadcrumbs />
            <div className="flex flex-col">
                <div className="flex flex-wrap gap-2">
                    <h3 className="text-lg font-medium">ID: </h3>
                    <p>{customer?.id}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                    <h3 className="text-lg font-medium">CI/NIT: </h3>
                    <p>{customer?.cinit}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                    <h3 className="text-lg font-medium">Nombre: </h3>
                    <p>{customer?.name}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                    <h3 className="text-lg font-medium">Correo: </h3>
                    <p>{customer?.email}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                    <h3 className="text-lg font-medium">Teléfono: </h3>
                    <p>{customer?.phone}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                    <h3 className="text-lg font-medium">Dirección: </h3>
                    <p>{customer?.address}</p>
                </div>
                
            </div>

        </div>
    )
}
