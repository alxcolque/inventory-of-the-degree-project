import { useParams } from "react-router-dom";
import { useAuthStore } from "../../stores";
import { Product } from "../../components";
import { useNavigate } from "react-router-dom";
import { Button } from "@nextui-org/react";

export const ShowProduct = () => {
    const { slug } = useParams();
    const token = useAuthStore((state) => state.token);
    const navigate = useNavigate();
    return (
        <div className="my-2 px-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-2">
          {/* Boton para volver */}
          <Button
            variant="bordered"
            color="primary"
            onPress={() => navigate("/tienda")}
          >
            Volver
          </Button>
          <Product slug={slug || ""} token={token || ""} />
        </div>
      )
}