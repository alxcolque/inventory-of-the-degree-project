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
  User,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useAuthStore } from "../../../stores/auth/auth.store";
import { useShopsStore } from "../../../stores/shops/shops.store";
import { useStockStore } from "../../../stores";
const columns = [
  { name: "Nombre", uid: "name" },
  { name: "Stock", uid: "stock" },
  { name: "Precio Venta", uid: "price" },
  { name: "Cantidad", uid: "quantity" },
];
interface OutputFormProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onClose: (isClose: boolean) => void;
  product: any;
}

export const OutputForm = ({
  isOpen,
  setIsOpen,
  onClose,
  product,
}: OutputFormProps) => {
  const [loading, setLoading] = useState(false);
  const createOutput = useStockStore(state => state.createOutput);
  const handleClose = () => {
    setIsOpen(false);
    onClose(true);
  };
  const token = useAuthStore((state) => state.token);
  const shops = useShopsStore((state) => state.shops);
  const [formData, setFormData] = useState( {
    id: "",
    product_id: "",
    store_id: "",
    quantity: "",
    price: "",
    unit: "",
  });
  console.log(product);
  //const getShops = useShopsStore(state => state.getShops);
  const [isSelectedShop, setIsSelectedShop] = useState(false);

  const handleSelectedShop = (id: string) => {
    setFormData({
      ...formData,
      store_id: id,
    });
    setIsSelectedShop(true);
  };
  /* Cargar datos */
  useEffect(() => {
    setFormData({
      ...formData,
      quantity: "1",
      price: product.price,
    });
    //setIsSelectedShop(true);
  }, [product]);

  const handleOutput = async () => {
    if (!isSelectedShop) return;

    const data = {
      ...formData,
      id: product.inventory_id,
      product_id: product.id,
    };
    setLoading(true);
    await createOutput(data, token!);
    setLoading(false);
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
            <TableBody>
              <TableRow key={product.id}>
                <TableCell>
                  <User
                    avatarProps={{ radius: "lg", src: product.thumbnail }}
                    description={product.restock_date}
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
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        price: e.target.value,
                      })
                    }
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    className="max-w-20"
                    size="sm"
                    defaultValue="1"
                    placeholder="Cantidad"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        quantity: e.target.value,
                      })
                    }
                  />
                </TableCell>
              </TableRow>
                  
            </TableBody>
          </Table>
          <Select
                    label="Selecciona unidad"
                    size="sm"
                    isRequired
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                  >
                    <SelectItem key="unit" value="unit">
                      Unidad
                    </SelectItem>
                    <SelectItem key="pack" value="pack">
                      Paquete
                    </SelectItem>
                    <SelectItem key="box" value="box">
                      Caja
                    </SelectItem>
                    
                  </Select>
        </ModalBody>
        <ModalFooter>
          {/* Select para elegir tiendas */}
          <Select
            label="Tienda"
            size="sm"
            isRequired
            onChange={(e) => handleSelectedShop(e.target.value)}
          >
            {shops.map((shop) => (
              <SelectItem key={shop.id} value={shop.id}>
                {shop.name}
              </SelectItem>
            ))}
          </Select>
          <Button
            isDisabled={!isSelectedShop}
            isLoading={loading}
            color="primary"
            onPress={handleOutput}
          >
            Registrar Salida
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
