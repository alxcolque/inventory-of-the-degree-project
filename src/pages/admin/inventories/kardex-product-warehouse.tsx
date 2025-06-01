import { useParams } from "react-router-dom";
import { DynamicBreadcrumbs, Product } from "../../../components";
import {
  useAuthStore,
} from "../../../stores";

export const KardexProductWarehouse = () => {
  const { slug } = useParams();
  const token = useAuthStore((state) => state.token);
  return (
    <div className="my-2 px-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-2">
      <DynamicBreadcrumbs />
      <Product slug={slug || ""} token={token || ""} />
    </div>
  )
};
