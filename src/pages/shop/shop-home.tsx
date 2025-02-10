import { useParams } from "react-router-dom";
import { useAuthStore } from "../../stores";
import { useShopsStore } from "../../stores/shops/shops.store";
import { useEffect } from "react";

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
        <div>
            <p>{shop.name}</p>
            <p>{shop.slug}</p>
            <p>{shop.address}</p>
            <p>{shop.location}</p>
            <p>{shop.phone}</p>
            <img src={shop.storeFront} alt={shop.name} />
        </div>


    )


}
