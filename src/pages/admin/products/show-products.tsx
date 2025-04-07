import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { DynamicBreadcrumbs } from "../../../components";
import { useAuthStore, useProductsStore } from "../../../stores";
export const ShowProducts = () => {
    const { id } = useParams();
    const token = useAuthStore(state => state.token);
    const product = useProductsStore(state => state.product);
    const getProduct = useProductsStore(state => state.getProduct);

    const handleGetProduct = () => {
        if (id && token) {
            getProduct(Number(id), token);
        }
    }

    useEffect(() => {
        handleGetProduct();
    }, []);

    

    return (
        <div className="my-2 px-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
            <DynamicBreadcrumbs />
            <div className="flex flex-col">
                <div className="flex flex-wrap gap-2">
                    <h3 className="text-lg font-medium">ID: </h3>
                    <p>{product?.id}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                    <h3 className="text-lg font-medium">Nombre: </h3>
                    <p>{product?.name}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                    <h3 className="text-lg font-medium">Descripción: </h3>
                    <p>{product?.description}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                    <h3 className="text-lg font-medium">Precio: </h3>
                    <p>{product?.price}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                    <h3 className="text-lg font-medium">Imagen: </h3>
                    <img src={product?.thumbnail} alt={product?.name} className="w-10 h-10 rounded-full" />
                </div>
                
            </div>

        </div>
    )
}
