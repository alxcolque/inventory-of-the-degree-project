import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useShopsStore } from "../../../stores/shops/shops.store";
import { DynamicBreadcrumbs } from "../../../components";
import { useAuthStore } from "../../../stores";

export const ShowShops = () => {
    const { id } = useParams();
    const token = useAuthStore(state => state.token);
    const shop = useShopsStore(state => state.shop);
    const getShop = useShopsStore(state => state.getShop);

    const handleGetShop = () => {
        if (id && token) {
            getShop(Number(id), token);
        }
    }

    useEffect(() => {
        handleGetShop();
    }, []);

    return (
        <div className="my-2 px-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
            <DynamicBreadcrumbs />
            <div className="flex flex-col">
                
                <div className="flex flex-wrap gap-2">
                    <h3 className="text-lg font-medium">Nombre: </h3>
                    <p>{shop?.name}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                    <h3 className="text-lg font-medium">Slug: </h3>
                    <p>{shop?.slug}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                    <h3 className="text-lg font-medium">Ubicación: </h3>
                    <p>{shop?.location}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                    <h3 className="text-lg font-medium">Dirección: </h3>
                    <p>{shop?.address}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                    <h3 className="text-lg font-medium">Teléfono: </h3>
                    <p>{shop?.phone}</p>
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="text-lg font-medium">Store Front: </h3>
                    <img src={shop?.front_image} alt={shop?.name} className="w-1/2 h-1/2" />
                </div>
            </div>
        
        </div>
    )
}
