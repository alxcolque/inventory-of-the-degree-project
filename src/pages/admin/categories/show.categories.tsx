import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { DynamicBreadcrumbs } from "../../../components";
import { useAuthStore, useCategoriesStore } from "../../../stores";
export const ShowCategories = () => {
    const { id } = useParams();
    const token = useAuthStore(state => state.token);
    const category = useCategoriesStore(state => state.category);
    const getCategory = useCategoriesStore(state => state.getCategory);

    const handleGetCategory = () => {
        if (id && token) {
            getCategory(Number(id), token);
        }
    }

    useEffect(() => {
        handleGetCategory();
    }, []);

    

    return (
        <div className="my-2 px-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
            <DynamicBreadcrumbs />
            <div className="flex flex-col">

                <div className="flex flex-wrap gap-2">
                    <h3 className="text-lg font-medium">Nombre: </h3>
                    <p>{category?.name}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                    <h3 className="text-lg font-medium">Slug: </h3>
                    <p>{category?.slug}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                    <h3 className="text-lg font-medium">Color: </h3>
                    <p className="w-fit" style={{ backgroundColor: category?.color }}>{category?.color}</p>
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="text-lg font-medium">Icono: </h3>
                    <img src={category?.icon} alt={category?.name} className="w-1/2" />
                </div>
                
            </div>

        </div>
    )
}
