import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Select,
    SelectItem,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    User,
  } from "@nextui-org/react";
  import { useEffect, useState } from "react";
  import { FaShoppingCart, FaTimes, FaTrash } from "react-icons/fa";
  import { useCustomerStore } from '../../../stores/customer/customer.store';
  import { useAuthStore } from '../../../stores/auth/auth.store';
  import { useOrdersStore } from "../../../stores";
import { FaCartPlus } from "react-icons/fa6";
  export const CartModal = () => {
    const token = useAuthStore((state) => state.token);
    const user = useAuthStore((state) => state.user);
    const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [cart, setCart] = useState([]);
    const [notifyCart, setNotifyCart] = useState<number>(0);
  
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
      const cart = localStorage.getItem('cart');
      if (cart) {
        setCart(JSON.parse(cart));
        setNotifyCart(cart.length);
      }
    }, []);
  
    /* Funcion para limpiar el carrito */
    const clearCart = () => {
      console.log("Limpiando carrito");
      localStorage.removeItem('cart');
      setCart([]);
      setNotifyCart(0);
      setIsOpen(false);
    }
    const openCart = () => {
      setIsOpen(true);
      const cart = localStorage.getItem('cart');
      if (cart) {
        setCart(JSON.parse(cart));
        setNotifyCart(cart.length);
      }
    }
    const removeItem = (inventory_id: number) => {
      const cart = localStorage.getItem('cart');
      if (cart) {
        const newCart = JSON.parse(cart).filter((item: any) => item.inventory_id !== inventory_id);
        localStorage.setItem('cart', JSON.stringify(newCart));
        setCart(newCart);
        setNotifyCart(newCart.length);
      }
    }
    const handleCheckout = async () => {
      const cart = localStorage.getItem('cart');
      console.log(cart, selectedCustomer);
      const data = {
        customer_id: selectedCustomer,
        total: cart ? JSON.parse(cart).reduce((acc: number, item: any) => acc + item.price * item.quantity, 0) : 0,
        seller_id: user?.id,
        store_id: localStorage.getItem('shopId'),
        status: 'completado',
        products: cart ? JSON.parse(cart) : [],
      }
      console.log(data);
      await createSale(data, token!);
  
      clearCart();
      //console.log(response);
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
          <FaCartPlus size={20}/>
        </Button>
        </div>
        <Modal isOpen={isOpen} onOpenChange={setIsOpen} scrollBehavior="outside">
          <ModalContent className="max-w-[600px]">
            <ModalHeader>
              <h1 className="text-2xl font-bold">Cotización</h1>
            </ModalHeader>
            <ModalBody>
              {/* Mostrar los productos del carrito */}
              <Table aria-label="Example static collection table">
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
              <Table hideHeader>
                <TableHeader>
                  <TableColumn>Total</TableColumn>
                  <TableColumn>Total</TableColumn>
                  <TableColumn>Total</TableColumn>
                  <TableColumn>Total</TableColumn>
                  <TableColumn>{cart.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0)}</TableColumn>
                  <TableColumn>-</TableColumn>
                </TableHeader>
                <TableBody>
                  <TableRow>
                  <TableCell>-</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell className="font-bold">Total</TableCell>
                    <TableCell className="font-bold">{cart.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0)}</TableCell>
                    <TableCell>-</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
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
            </ModalBody>
            <ModalFooter>
              <Button color="danger" size="sm" startContent={<FaTrash />} onPress={() => clearCart()}>Limpiar todo</Button>
              <Button color="primary" size="sm" isDisabled={!selectedCustomer} startContent={<FaShoppingCart />} onPress={() => handleCheckout()}>Cerrar Venta</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  };
  