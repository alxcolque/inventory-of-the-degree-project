import { useParams } from "react-router-dom";
import { useAuthStore } from "../../stores";
import { useShopsStore } from "../../stores/shops/shops.store";
import { useEffect } from "react";
import { DynamicBreadcrumbs } from "../../components";

export const ShopHome = () => {
    const token = useAuthStore(state => state.token);
    //const navigate = useNavigate();
    const params = useParams();
    const shop = useShopsStore(state => state.shop);
    const getShop = useShopsStore(state => state.getShop);
    useEffect(() => {
        getShop(token as string, params.slug as string);
    }, []);

    return (
        <div className="my-2 px-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col">
            <DynamicBreadcrumbs />
            <h2>Usuarios</h2>
            <p>{shop.name}</p>
            <p>{shop.slug}</p>
            <p>{shop.address}</p>
            <p>{shop.location}</p>
            <p>{shop.phone}</p>
            <img src={shop.storeFront} alt={shop.name} />
        </div>


    )


}
