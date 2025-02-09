import { useNavigate, useParams } from "react-router-dom";
import { useAuthStore } from "../../stores";
import { useShopsStore } from "../../stores/shops/shops.store";
import { useEffect } from "react";

export const ShopIndex = () => {
    const token = useAuthStore(state => state.token);
    const navigate = useNavigate();
    const shops = useShopsStore(state => state.shops);
    const getShops = useShopsStore(state => state.getShops);
    useEffect(() => {
        getShops(token as string);
    }, []);
    return (
        <div>
            {shops.map((shop) => (
                <div key={shop.id} className="flex flex-col items-center justify-center cursor-pointer" onClick={() => navigate(`/tienda/${shop.slug}`)}>
                    <h1 className="text-2xl font-bold">{shop.name}</h1>
                    <p className="text-sm text-gray-500">{shop.slug}</p>
                </div>
            ))}

        </div>


    )

}
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
