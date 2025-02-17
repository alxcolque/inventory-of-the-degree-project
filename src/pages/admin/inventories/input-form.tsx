import { Button } from "@nextui-org/react"
import { Input, SelectItem, Select } from "@nextui-org/react"
import { DynamicBreadcrumbs } from "../../../components/ui/dynamic-breadcrumbs"
import { useEffect } from "react"
import { useAuthStore, useProductsStore, useSupplierStore } from "../../../stores"

export const InputForm = () => {
    const token = useAuthStore(state => state.token);
    const products = useProductsStore(state => state.products);
    const getProducts = useProductsStore(state => state.getProducts);
    const suppliers = useSupplierStore(state => state.suppliers);
    const getSuppliers = useSupplierStore(state => state.getSuppliers);
    useEffect(() => {
        getProducts(token as string);
        getSuppliers(token as string);
    }, []);

    return (
        <div className="my-2 px-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">

            <DynamicBreadcrumbs />
            <h2>Registrar Entrada</h2>
            {/* Formulario para registrar entrada */}
            <div className="flex flex-col gap-4">
                <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                    {/* Input para seleccionar producto */}
                    <Select label="Producto" size="sm">
                        {products.map((product) => (
                            <SelectItem key={product.id} value={product.id}>{product.name}</SelectItem>
                        ))}
                    </Select>
                    {/* input para seleccionar el proveedor */}
                    <Select label="Proveedor" size="sm">
                        {suppliers.map((supplier) => (
                            <SelectItem key={supplier.id} value={supplier.id}>{supplier.name}</SelectItem>
                        ))}
                    </Select>

                </div>

                <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                    <Input
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
                    <Select label="Unidad de medida" size="sm">
                        <SelectItem value="U">Unidad</SelectItem>
                        <SelectItem value="CA">Caja</SelectItem>
                        <SelectItem value="KG">Kilogramo</SelectItem>
                        <SelectItem value="G">Gramo</SelectItem>
                    </Select>
                    {/* Cantidad */}
                    <Input
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
            </div>
            <Button className="w-fit" color="primary" variant="shadow">Registrar</Button>
        </div>
    )
}
