

import { Button, Card, CardBody, Chip, DatePicker, DateValue, Dropdown, DropdownTrigger, DropdownMenu, Image, Input, DropdownItem } from "@nextui-org/react";
import { DynamicBreadcrumbs } from "../../../components/ui/dynamic-breadcrumbs";
import { useAuthStore } from "../../../stores";
import { useState } from "react";
import { FaEye, FaPencil, FaPlus, FaTrash } from "react-icons/fa6";
import { RiMoreFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

export const IndexInventories = () => {
    const navigate = useNavigate();
    const token = useAuthStore(state => state.token);
    console.log(token);
    const [date, setDate] = useState<DateValue | null>();
    const handleChangeDate = (date: DateValue | null) => {
        setDate(date);
    }

    return (
        <>
            <div className="my-2 px-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">

                <DynamicBreadcrumbs />
                <div className="flex flex-row justify-between items-center">
                    <h2>Inventario de almacén</h2>
                    <Button color="primary" startContent={<FaPlus />} variant="shadow" onClick={() => navigate("/admin/inventories/input")}>Registrar Entrada</Button>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    {/* busqueda */}
                    <div className="flex flex-row items-center gap-2">
                        <Input type="text" placeholder="Buscar producto" />
                        <Button color="primary" variant="shadow">Buscar</Button>
                    </div>
                    {/* Boton de marca */}
                    <Button color="primary" variant="shadow">Marca</Button>
                    {/* date picker */}

                    {/* FEcha actual */}
                    <div className="flex flex-row items-center gap-2">

                        <DatePicker
                            onChange={handleChangeDate}
                            value={date}
                        />
                    </div>
                </div>

                {/* Botones horizontales para listar categorias para filtro, scroll horizontal */}
                <div className="flex gap-2 overflow-x-auto scrollbar-hide">

                    <Button>Todos</Button>

                    <Button>Electrónicos</Button>
                    <Button>Ropa</Button>
                    <Button>Accesorios</Button>
                    <Button>Otros</Button>

                </div>
                <div className="flex flex-col gap-2">
                    <h5 className="text-md font-bold">TODOS LOS PRODUCTOS</h5>
                    <div className="flex flex-col gap-2">
                        <h5 className="text-md font-semibold">Celulares</h5>
                        {/* Cards de celulares */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                            <Card
                                isBlurred
                                className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px]"
                                shadow="sm"
                            >
                                <CardBody>
                                    <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
                                        <div className="relative col-span-6 md:col-span-4">
                                            <Image
                                                alt="Album cover"
                                                className="object-cover"
                                                shadow="md"
                                                src="https://heroui.com/images/album-cover.png"

                                            />
                                        </div>

                                        <div className="flex flex-col col-span-6 md:col-span-8">
                                            <div className="flex justify-between items-start">
                                                <div className="flex flex-col gap-0 w-full">
                                                    <div className="flex flex-row justify-between items-center">
                                                        <h3 className="text-large font-medium">Producto 1 eter</h3>
                                                        <Dropdown>
                                                            <DropdownTrigger>
                                                                <Button
                                                                    isIconOnly

                                                                    className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2"
                                                                    radius="full"
                                                                    variant="light"
                                                                >
                                                                    <RiMoreFill size={25} />
                                                                </Button>

                                                            </DropdownTrigger>
                                                            <DropdownMenu aria-label="Dropdown menu with icons" variant="faded">

                                                                <DropdownItem
                                                                    key="edit"
                                                                    startContent={<FaPencil />}
                                                                >
                                                                    Editar
                                                                </DropdownItem>

                                                                <DropdownItem
                                                                    key="delete"
                                                                    className="text-danger"
                                                                    color="danger"
                                                                    startContent={<FaTrash />}
                                                                >
                                                                    Eliminar
                                                                </DropdownItem>


                                                            </DropdownMenu>
                                                        </Dropdown>
                                                    </div>
                                                    <div className="flex flex-row gap-2">
                                                        <Chip className="font-small" color="warning" variant="bordered">
                                                            Categoria 1
                                                        </Chip>
                                                        <span className="text-sm text-foreground/90">Marca 1</span>
                                                    </div>
                                                    {/* cantidad y precio */}
                                                    <div className="flex flex-row gap-2">
                                                        <span className="text-sm text-foreground/90 font-bold text-red-500">$100</span>
                                                        <span className="text-sm text-foreground/90"> cantidad: 10</span>
                                                    </div>
                                                </div>




                                            </div>

                                            <div className="flex flex-row gap-2 mt-2 justify-end">
                                                <Button size="sm" color="primary" variant="shadow" isIconOnly>
                                                    <FaEye />
                                                </Button>



                                                <Button size="sm" color="success" variant="bordered">Agregar Stock</Button>

                                            </div>



                                        </div>
                                    </div>

                                </CardBody>
                            </Card>
                        </div>

                        <h5 className="text-md font-semibold">Tablets</h5>

                        <h5 className="text-md font-semibold">Computadoras</h5>

                        <h5 className="text-md font-semibold">Accesorios</h5>
                    </div>
                </div>
            </div>
        </>
    )

}
