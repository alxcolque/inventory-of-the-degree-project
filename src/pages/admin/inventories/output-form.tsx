import { Input, Modal, ModalBody, ModalContent, ModalHeader, Select, SelectItem, TableCell, TableHeader, Table, TableColumn, TableBody, TableRow, Tooltip, User, ModalFooter, Button, Spinner} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useAuthStore } from "../../../stores/auth/auth.store";
import { useShopsStore } from "../../../stores/shops/shops.store";

interface OutputFormProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    onClose: (isClose: boolean) => void;
    products: any[];
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


export const OutputForm = ({ isOpen, setIsOpen, onClose, products }: OutputFormProps) => {
    const handleClose = () => {
        setIsOpen(false);
        onClose(true);
    }
    const token = useAuthStore(state => state.token);
    const [isLoading, setIsLoading] = useState(false);
    const shops = useShopsStore(state => state.shops);
    //const getShops = useShopsStore(state => state.getShops);
    const [currentProducts, setCurrentProducts] = useState<any[]>([]);
    const handleOutput = () => {
        //console.log(currentProducts);
        onClose(true);
    }
    //Remover producto de la lista de productos
    console.log(token);
    const removeThisProduct = (id: number) => {
        if (currentProducts.length > 0) {
            console.log(id);
            const newProducts = currentProducts.filter(product => product.id !== id);
            setCurrentProducts(newProducts);
        }
    }
    useEffect(() => {
        setIsLoading(true);
        setCurrentProducts(products);
        setIsLoading(false);
    }, [currentProducts]);
    
    return (
        /* modal para registrar salida de productos */
        <Modal isOpen={isOpen} size="2xl" onClose={handleClose}>
            <ModalContent>
                <ModalHeader>
                    <h3>Registrar Salida</h3>
                </ModalHeader>
                <ModalBody>
                    {isLoading ? (
                        <Spinner />
                    ) : (
                        <Table aria-label="Example table with custom cells">
                            <TableHeader columns={columns}>
                                {(column) => (
                                    <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                                        {column.name}
                                    </TableColumn>
                                )}
                            </TableHeader>
                            <TableBody items={currentProducts}>
                                {products.map((product) => (
                                    <TableRow key={product.id}>
                                        <TableCell>
                                            <User
                                                avatarProps={{ radius: "lg", src: product.image }}
                                                description={product.stock}
                                                name={product.name}
                                            >
                                                {product.name}
                                            </User>
                                        </TableCell>
                                        <TableCell>
                                            <p className="text-bold text-sm capitalize text-default-400">{product.stock}</p>
                                        </TableCell>
                                        <TableCell>
                                            <Input type="number" className="max-w-20" size="sm" defaultValue={product.price} placeholder="Precio" />
                                        </TableCell>
                                        <TableCell>
                                            <Input type="number" className="max-w-20" size="sm" defaultValue="1" placeholder="Cantidad" />
                                        </TableCell>
                                        <TableCell>
                                            <Tooltip color="danger" content="Quitar producto">
                                                <span className="text-lg text-danger cursor-pointer active:opacity-50" onClick={() => removeThisProduct(product.id)}>
                                                    <FaTimes />
                                                </span>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>

                        </Table>
                    )}
                </ModalBody>
                <ModalFooter>
                    {/* Select para elegir tiendas */}
                    <Select label="Tienda" size="sm">
                        {shops.map((shop) => (
                            <SelectItem key={shop.id} value={shop.id}>{shop.name}</SelectItem>
                        ))}
                    </Select>
                    <Button color="primary" onPress={handleOutput}>Registrar Salida</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
