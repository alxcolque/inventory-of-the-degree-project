import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Select,
    SelectItem,
    Spinner,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    Tabs,
    User,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { FaShoppingCart, FaTimes, FaTrash } from "react-icons/fa";
import { useCustomerStore } from '../../../stores/customer/customer.store';
import { useAuthStore } from '../../../stores/auth/auth.store';
import { useOrdersStore } from "../../../stores";
import { FaCartPlus } from "react-icons/fa6";
import { toast } from "sonner";

interface Props {
    getCheckout(checkout: boolean): void;
    shopId?: string;
    slug?: string;
}

export const CartModal = ({ getCheckout, shopId, slug }: Props) => {
    const token = useAuthStore((state) => state.token);
    const user = useAuthStore((state) => state.user);
    const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null);
    const [selectedTab, setSelectedTab] = useState<string>("customer");
    const [inputPhone, setInputPhone] = useState<string>("");
    const [inputName, setInputName] = useState<string>("");
    const [inputDiscount, setInputDiscount] = useState<string>("0");
    const [isOpen, setIsOpen] = useState(false);
    const [cart, setCart] = useState([]);
    const [notifyCart, setNotifyCart] = useState<number>(0);
    const [isLoading, setIsLoading] = useState(false);

    /* Obtener cliente */
    const customers = useCustomerStore((state) => state.customers);
    const getCustomers = useCustomerStore((state) => state.getCustomers);
    const createSale = useOrdersStore((state) => state.createSale);
    const handleCustomer = async () => {
        await getCustomers(token!);
    }

    useEffect(() => {
        handleCustomer();
    }, []);

    //console.log(customers);


    useEffect(() => {
        const cart = localStorage.getItem('cart' + slug);
        if (cart) {
            setCart(JSON.parse(cart));
            setNotifyCart(cart.length);
        }
    }, [isOpen]);

    /* Funcion para limpiar el carrito */
    const clearCart = () => {
        //console.log("Limpiando carrito");
        localStorage.removeItem('cart' + slug);
        setCart([]);
        setNotifyCart(0);
        setIsOpen(false);
    }
    const openCart = () => {
        setIsOpen(true);
        const cart = localStorage.getItem('cart' + slug);
        if (cart) {
            setCart(JSON.parse(cart));
            setNotifyCart(cart.length);
        }
    }
    const removeItem = (inventory_id: number) => {
        const cart = localStorage.getItem('cart' + slug);
        if (cart) {
            const newCart = JSON.parse(cart).filter((item: any) => item.inventory_id !== inventory_id);
            localStorage.setItem('cart' + slug, JSON.stringify(newCart));
            setCart(newCart);
            setNotifyCart(newCart.length);
        }
    }
    const handleCheckout = async () => {
        const cart = localStorage.getItem('cart' + slug);
        //console.log(cart, selectedCustomer);
        /* Validar que el carrito no este vacio */
        if (!cart) {
            toast.error("El carrito esta vacio");
            return;
        }

        let data = {};
        if (selectedTab === "customer") {
            let phoneRegex = /^[67]\d{7}$/;
            if (!phoneRegex.test(inputPhone)) {
                toast.error("El celular debe tener 8 digitos y comenzar con 6 o 7");
                return;
            }
            if (!inputName || !inputPhone) {
                toast.error("El nombre y el celular son obligatorios");
                return;
            }
            data = {
                total: cart ? JSON.parse(cart).reduce((acc: number, item: any) => acc + item.price * item.quantity, 0) : 0,
                seller_id: user?.id,
                store_id: shopId,
                status: 'completado',
                products: cart ? JSON.parse(cart) : [],
                discount: inputDiscount,
                name: inputName,
                phone: inputPhone,
                tab: selectedTab,
            }
        } else {
            if (!selectedCustomer) {
                toast.error("El cliente es obligatorio");
                return;
            }
            data = {
                total: cart ? JSON.parse(cart).reduce((acc: number, item: any) => acc + item.price * item.quantity, 0) : 0,
                seller_id: user?.id,
                store_id: shopId,
                status: 'completado',
                products: cart ? JSON.parse(cart) : [],
                discount: inputDiscount,
                customer_id: selectedCustomer,
                tab: selectedTab,
            }
        }
        setIsLoading(true);
        await createSale(data, token!);
        setIsLoading(false);
        clearCart();
        getCheckout(true);
    }


    return (
        <>
            <div className="relative" key={notifyCart}>
                <Button
                    color="danger"
                    variant="shadow"
                    radius="full"
                    isIconOnly
                    onPress={openCart}
                >
                    <FaCartPlus size={20} />
                </Button>
            </div>
            <Modal isOpen={isOpen} onOpenChange={setIsOpen} scrollBehavior="outside">
                <ModalContent>
                    <ModalHeader>
                        <h1 className="text-2xl font-bold">Cotización</h1>
                    </ModalHeader>
                    <ModalBody>
                        {/* Mostrar los productos del carrito */}
                        <Table aria-label="Carrito">
                            <TableHeader>
                                <TableColumn>Nombre</TableColumn>
                                <TableColumn>Precio</TableColumn>
                                <TableColumn>Cantidad</TableColumn>
                                <TableColumn>Subtotal</TableColumn>
                                <TableColumn>Acciones</TableColumn>
                            </TableHeader>
                            <TableBody>
                                {cart.map((item: any, index: number) => (
                                    <TableRow key={index}>
                                        <TableCell>
                                            <User
                                                avatarProps={{ radius: "lg", src: item.thumbnail }}
                                                description={item.category}
                                                name={item.name}
                                                aria-label={item.name}
                                            >
                                                {item.name}
                                            </User>
                                        </TableCell>
                                        <TableCell>{item.price}</TableCell>
                                        <TableCell>{item.quantity}</TableCell>
                                        <TableCell>{item.price * item.quantity}</TableCell>
                                        <TableCell>
                                            <Button isIconOnly variant="light" onPress={() => removeItem(item.inventory_id)} aria-label="Eliminar producto">
                                                <FaTimes className="text-danger-500" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>

                                ))}


                            </TableBody>

                        </Table>
                        {/* input discount */}
                        <div className="flex flex-row gap-2">
                            <Input
                                label="Descuento"
                                className="w-1/2"
                                labelPlacement="outside"
                                placeholder="0"
                                defaultValue="0"
                                value={inputDiscount}
                                min={0}
                                onChange={(e) => setInputDiscount(e.target.value)}
                                type="number"
                            />
                            Total: <b>{cart.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0) - parseInt(inputDiscount)}</b>
                        </div>
                        <Tabs aria-label="Options" selectedKey={selectedTab} onSelectionChange={(key) => setSelectedTab(key as string)}>
                            <Tab key="customer" title="Cliente">
                                {/* input cliente */}
                                <div className="flex flex-row gap-2">
                                    <Input
                                        label="Nombre"
                                        labelPlacement="outside"
                                        placeholder="Nombre"
                                        onChange={(e) => setInputName(e.target.value)}
                                        type="text"
                                        className="w-3/4"
                                        isRequired
                                    />
                                    <Input
                                        label="Celular"
                                        labelPlacement="outside"
                                        placeholder="Celular"
                                        onChange={(e) => setInputPhone(e.target.value)}
                                        type="text"
                                        className="w-1/3"
                                        isRequired
                                    />
                                </div>

                            </Tab>
                            <Tab key="customer2" title="Cliente existente">
                                {/* Seleccionar cliente */}
                                <Select
                                    size="sm"
                                    isRequired
                                    label="Seleccionar cliente"
                                    placeholder="Seleccionar cliente"
                                    onChange={(e) => setSelectedCustomer(e.target.value)}
                                >
                                    {customers.map((customer: any) => (
                                        <SelectItem key={customer.id} value={customer.id}>{customer.name}</SelectItem>
                                    ))}
                                </Select>
                            </Tab>

                        </Tabs>


                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" size="sm" startContent={<FaTrash />} onPress={() => clearCart()}>Limpiar todo</Button>
                        <Button color="primary" size="sm" isLoading={isLoading} spinner={<Spinner color="success" size="sm" />} startContent={<FaShoppingCart />} onPress={() => handleCheckout()}>Cerrar Venta</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};
