import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { DynamicBreadcrumbs } from "../../../components";
import { useAuthStore, useBrandsStore } from "../../../stores";
export const ShowBrands = () => {
    const { id } = useParams();
    const token = useAuthStore(state => state.token);
    const brand = useBrandsStore(state => state.brand);
    const getBrand = useBrandsStore(state => state.getBrand);

    const handleGetBrand = () => {
        if (id && token) {
            getBrand(Number(id), token);
        }
    }

    useEffect(() => {
        handleGetBrand();
    }, []);

    

    return (
        <div className="my-2 px-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
            <DynamicBreadcrumbs />
            <div className="flex flex-col">

                <div className="flex flex-wrap gap-2">
                    <h3 className="text-lg font-medium">Nombre: </h3>
                    <p>{brand?.name}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                    <h3 className="text-lg font-medium">Slug: </h3>
                    <p>{brand?.slug}</p>
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="text-lg font-medium">Imagen: </h3>
                    <img src={brand?.image} alt={brand?.name} className="w-1/2" />
                </div>
                
            </div>

        </div>
    )
}
