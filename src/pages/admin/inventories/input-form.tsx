import { Button, Image } from "@nextui-org/react"
import { Input, SelectItem, Select } from "@nextui-org/react"
import { DynamicBreadcrumbs } from "../../../components/ui/dynamic-breadcrumbs"
import { useEffect, useState } from "react"
import { useAuthStore, useProductsStore, useSupplierStore, useWarehouseStore } from "../../../stores"
import { useNavigate } from "react-router-dom";
export const InputForm = () => {
    const navigate = useNavigate();
    const token = useAuthStore(state => state.token);
    const products = useProductsStore(state => state.products);
    const getProducts = useProductsStore(state => state.getProducts);
    const suppliers = useSupplierStore(state => state.suppliers);
    const getSuppliers = useSupplierStore(state => state.getSuppliers);
    const addWarehouseProduct = useWarehouseStore(state => state.addWarehouseProduct);

    const [isDisabled, setIsDisabled] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const [data, setData] = useState({
        product_id: "",
        supplier_id: "",
        price: "",
        unit: "",
        quantity: "",
    });


    /* El boton no se desactiva su los campos estan llenos */
    const handleChange = (e: any) => {
        if (e.target.value !== "" && e.target.name !== "") {
            setData({
                ...data,
                [e.target.name]: e.target.value,
            });
            if (data.product_id !== "" && data.supplier_id !== "" && data.price !== "" && data.unit !== "" && data.quantity !== "") {
                setIsDisabled(false);
            }
        } else {
            setIsDisabled(true);
        }
    }

    useEffect(() => {
        getProducts(token as string);
        getSuppliers(token as string);
    }, []);

    const handleRegisterInput = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        //console.log(data);
        setIsLoading(true);
        await addWarehouseProduct(data, token as string);
        setIsLoading(false);
        navigate("/admin/inventories");
    }

    //console.log(products);

    return (
        <div className="my-2 px-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">

            <DynamicBreadcrumbs />
            <h2>Registrar Entrada</h2>
            {/* Formulario para registrar entrada */}
            <form onSubmit={handleRegisterInput} className="flex flex-col gap-4">
                <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                    {/* Input para seleccionar producto */}
                    <Select
                        classNames={{
                            base: "max-w-xs",
                            trigger: "h-12",
                        }}
                        items={products}
                        label="Producto"
                        name="product_id"
                        size="sm"
                        isRequired
                        onChange={(e) => {
                            handleChange(e as React.ChangeEvent<HTMLSelectElement>);
                        }}
                        renderValue={(items) => {
                            return items.map((item) => (
                                <div key={item.key} className="flex items-center gap-2">
                                    <Image alt={item.data?.name} width={30} height={30} src={item.data?.thumbnail} />
                                    <div className="flex flex-col">
                                        <span>{item.data?.name}</span>
                                        <span className="text-default-500 text-tiny">({item.data?.category}) - {item.data?.subcategory}</span>
                                    </div>
                                </div>
                            ));
                        }}
                    >
                        {(product) => (
                            <SelectItem key={product.id} value={product.id}>
                                <div className="flex gap-2 items-center" key={product.id}>
                                    <Image alt={product.name} width={30} height={30} src={product.thumbnail} />
                                    <div className="flex flex-col">
                                        <span className="text-small">{product.name}</span>
                                        <span className="text-tiny text-default-400">({product.category}) - {product.subcategory}</span>
                                    </div>
                                </div>
                            </SelectItem>
                        )}
                    </Select>
                    {/* input para seleccionar el proveedor */}
                    <Select label="Proveedor" name="supplier_id" size="sm" isRequired onChange={(e) => {
                        handleChange(e as React.ChangeEvent<HTMLSelectElement>);
                    }}>

                        {suppliers.map((supplier) => (
                            <SelectItem key={supplier.id} value={supplier.id}>{supplier.name}</SelectItem>
                        ))}
                    </Select>

                </div>

                <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                    <Input
                        name="price"
                        isRequired
                        onChange={(e) => {
                            handleChange(e as React.ChangeEvent<HTMLInputElement>);
                        }}
                        label="Precio"
                        placeholder="0.00"
                        startContent={
                            <div className="pointer-events-none flex items-center">
                                <span className="text-default-400 text-small">$</span>
                            </div>
                        }
                        type="number"
                    />
                    {/* Unidad de medida select */}
                    <Select label="Unidad de medida" name="unit" size="sm" onChange={(e) => {
                        handleChange(e as React.ChangeEvent<HTMLSelectElement>);
                    }} isRequired>
                        <SelectItem key="U" value="U">Unidad</SelectItem>
                        <SelectItem key="CA" value="CA">Caja</SelectItem>
                        <SelectItem key="KG" value="KG">Kilogramo</SelectItem>
                        <SelectItem key="G" value="G">Gramo</SelectItem>
                    </Select>
                    {/* Cantidad */}
                    <Input
                        name="quantity"
                        onChange={(e) => {
                            handleChange(e as React.ChangeEvent<HTMLInputElement>);
                        }}
                        isRequired
                        label="Cantidad"
                        placeholder="0.00"
                        startContent={
                            <div className="pointer-events-none flex items-center">
                                <span className="text-default-400 text-small">U</span>
                            </div>
                        }
                        type="number"
                    />
                </div>
                <Button type="submit" isLoading={isLoading} isDisabled={isDisabled} className="w-fit" color="primary" variant="shadow">Registrar</Button>
            </form>
        </div>
    )
}
