import {
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Select,
  SelectItem,
  TableCell,
  TableHeader,
  Table,
  TableColumn,
  TableBody,
  TableRow,
  Tooltip,
  User,
  ModalFooter,
  Button,
  Spinner,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useAuthStore } from "../../../stores/auth/auth.store";
import { useShopsStore } from "../../../stores/shops/shops.store";
import {
    IProduct,
  } from "../../../interface/inventories/warehouse/list-warehouse-response";
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

export const OutputForm = ({
  isOpen,
  setIsOpen,
  onClose,
  products,
}: OutputFormProps) => {
  const handleClose = () => {
    setIsOpen(false);
    onClose(true);
  };
  const token = useAuthStore((state) => state.token);
  const [isLoading, setIsLoading] = useState(false);
  const shops = useShopsStore((state) => state.shops);
  const [shop, setShop] = useState("");
  //const getShops = useShopsStore(state => state.getShops);
  const [currentProducts, setCurrentProducts] = useState<IProduct[]>([]);
  const [isSelectedShop, setIsSelectedShop] = useState(false);
  
  //obtener precio de venta y cantidad de la tabla
  const data = useState<{
    shop_id: string;
    products: {
      inventory_id: number;
      sale_price: string;
      quantity: string;
    }[];
  }[]>();
  
  //Remover producto de la lista de productos
//console.log(token)
  const removeThisProduct = (id: number) => {
    //console.log(currentProducts);
    if (currentProducts.length > 0) {
      const newProducts = currentProducts.filter(
        (product) => product.inventory_id !== id
      );
      setCurrentProducts(newProducts);
    }
    else{
      setIsSelectedShop(false);
    }
  };
  useEffect(() => {
    setIsLoading(true);
    setCurrentProducts(products);
    setIsLoading(false);
  }, [products]);

  const handleSelectedShop = (id: string) => {
    if(currentProducts.length > 0) {
      setShop(id);
      setIsSelectedShop(true);
    }
    else{
      setIsSelectedShop(false);
    }
  };
  
  const handleOutput = () => {
    console.log(currentProducts);
    
    
    onClose(true);
  };
  
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
                  <TableColumn
                    key={column.uid}
                    align={column.uid === "actions" ? "center" : "start"}
                  >
                    {column.name}
                  </TableColumn>
                )}
              </TableHeader>
              <TableBody items={currentProducts}>
                {currentProducts.map((product: any) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <User
                        avatarProps={{ radius: "lg", src: product.thumbnail }}
                        description={product.stock_quantity}
                        name={product.name}
                      >
                        {product.name}
                      </User>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm capitalize text-bold text-default-400">
                        {product.stock_quantity}
                      </p>
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        className="max-w-20"
                        size="sm"
                        defaultValue={product.price}
                        placeholder="Precio"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        className="max-w-20"
                        size="sm"
                        defaultValue="1"
                        placeholder="Cantidad"
                      />
                    </TableCell>
                    <TableCell>
                      <Tooltip color="danger" content="Quitar producto">
                        <span
                          className="text-lg cursor-pointer text-danger active:opacity-50"
                          onClick={() =>
                            removeThisProduct(product.inventory_id)
                          }
                        >
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
          <Select label="Tienda" size="sm"
          isRequired
          onChange={(e) => handleSelectedShop(e.target.value)}
          >
            {shops.map((shop) => (
              <SelectItem key={shop.id} value={shop.id}>
                {shop.name}
              </SelectItem>
            ))}
          </Select>
          <Button isDisabled={!isSelectedShop} color="primary" onPress={handleOutput}>
            Registrar Salida
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
