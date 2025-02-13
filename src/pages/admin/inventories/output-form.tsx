import { Input, Modal, ModalBody, ModalContent, ModalHeader, Select, SelectItem, TableCell, TableHeader, Table, TableColumn, TableBody, TableRow, Tooltip, User, Chip, ModalFooter, Button, Spinner } from "@nextui-org/react";
import { useCallback, useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useAuthStore } from "../../../stores/auth/auth.store";

interface OutputFormProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}
export const columns = [
    { name: "Nombre", uid: "name" },
    { name: "Stock", uid: "stock" },
    { name: "Precio Venta", uid: "price" },
    { name: "Cantidad", uid: "quantity" },
    { name: "Acciones", uid: "actions" },
];
/* export const users = [
    {
        id: 1,
        name: "Producto 1",
        stock: "100",
        price: "100",
        quantity: "100",
        status: "active",
        image: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    },
    {
        id: 2,
        name: "Producto 2",
        stock: "100",
        price: "100",
        quantity: "100",
        status: "active",
        image: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    },
    {
        id: 3,
        name: "Producto 3",
        stock: "100",
        price: "100",
        quantity: "100",
        status: "active",
        image: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    },
    {
        id: 4,
        name: "Producto 4",
        stock: "100",
        price: "100",
        quantity: "100",
        status: "active",
        image: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
    },
    {
        id: 5,
        name: "Producto 5",
        stock: "100",
        price: "100",
        quantity: "100",
        status: "active",
        image: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
    },
]; */


export const OutputForm = ({ isOpen, setIsOpen }: OutputFormProps) => {
    const handleClose = () => {
        setIsOpen(false);
    }
    const token = useAuthStore(state => state.token);
    const [products, setProducts] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const getProducts = () => { 
        const selectedProducts = localStorage.getItem("selectedProducts");
        if (selectedProducts) {
            setProducts(JSON.parse(selectedProducts));
        }
    }
    const handleRemoveProduct = (id: number) => {
        const newProducts = products.filter(product => product.id !== id);
        setProducts(newProducts);
        localStorage.setItem("selectedProducts", JSON.stringify(newProducts));
    }


    useEffect(() => {
        if (token) {
            setIsLoading(true);
            getProducts();
            setIsLoading(false);
        }
    }, [token]);
    console.log(products);

    const renderCell = useCallback((user: any, columnKey: any) => {
        const cellValue = user[columnKey];

        switch (columnKey) {
            case "name":
                return (
                    <User
                        avatarProps={{ radius: "lg", src: user.image }}
                        description={user.stock}
                        name={cellValue}
                    >
                        {user.name}
                    </User>
                );
            case "stock":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm capitalize text-default-400">{user.stock}</p>
                    </div>
                );
            case "price":
                return (
                    <div className="flex flex-col">
                        <Input type="number" className="max-w-20" size="sm" defaultValue={user.price} placeholder="Precio" />
                    </div>
                );
            case "quantity":
                return (
                    <div className="flex flex-col">
                        <Input type="number" className="max-w-20" size="sm" defaultValue="1" placeholder="Cantidad" />
                    </div>
                );
            case "actions":
                return (
                    <div className="relative flex items-center gap-2">
                        <Tooltip color="danger" content="Quitar producto">
                            <span className="text-lg text-danger cursor-pointer active:opacity-50" onClick={() => handleRemoveProduct(user.id)}>
                                <FaTimes />
                            </span>
                        </Tooltip>
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);
    return (
        /* modal para registrar salida de productos */
        <Modal isOpen={isOpen} size="2xl" onClose={handleClose}>
            <ModalContent>
                <ModalHeader>
                    <h3>Registrar Salida</h3>
                </ModalHeader>
                <ModalBody>
                    {isLoading && <Spinner />}
                    {products.length > 0 && (
                        <Table aria-label="Example table with custom cells">
                            <TableHeader columns={columns}>
                            {(column) => (
                                <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                                    {column.name}
                                </TableColumn>
                            )}
                        </TableHeader>
                        <TableBody items={products}>
                            {(item) => (
                                <TableRow key={item.id}>
                                    {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                                </TableRow>
                            )}
                            </TableBody>
                        </Table>
                    )}
                </ModalBody>
                <ModalFooter>
                    {/* Select para elegir tiendas */}
                    <Select label="Tienda" size="sm">
                        <SelectItem key="1" value="1">Tienda 1</SelectItem>
                        <SelectItem key="2" value="2">Tienda 2</SelectItem>
                        <SelectItem key="3" value="3">Tienda 3</SelectItem>
                    </Select>
                    <Button color="primary">Registrar Salida</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
