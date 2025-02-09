import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  NavbarItem,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";

export const CartModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div>
        <Button onClick={() => setIsOpen(true)}>
          <FaShoppingCart className="text-default-500" size={20} />

        </Button>
      </div>
      <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
        <ModalContent>


          <ModalHeader>
            <h1 className="text-2xl font-bold">Carrito</h1>

          </ModalHeader>
          <ModalBody>
            <table>
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Precio</th>
                  <th>SubTotal</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <img src="https://picsum.photos/seed/1/200/300" alt="Product" className="w-10 h-10" />
                    <span className="text-sm font-semibold">Producto 1</span>
                  </td>
                  <td className="text-center">1</td>
                  <td className="text-center">100</td>
                  <td className="text-center">100</td>


                </tr>
                <tr>
                  <td>
                    <img src="https://picsum.photos/seed/1/200/300" alt="Product" className="w-10 h-10" />
                    <span className="text-sm font-semibold">Producto 2</span>
                  </td>
                  <td className="text-center">2</td>
                  <td className="text-center">200</td>
                  <td className="text-center">400</td>

                </tr>
                <tr>
                  <td>
                    <img src="https://picsum.photos/seed/1/200/300" alt="Product" className="w-10 h-10" />
                    <span className="text-sm font-semibold">Producto 3</span>
                  </td>
                  <td className="text-center">3</td>
                  <td className="text-center">300</td>
                  <td className="text-center">900</td>
                </tr>

                {/* Descuentos */}
                <tr>
                  <td colSpan={3}>
                    <span className="text-sm font-semibold">Descuentos</span>
                  </td>
                  <td className="text-center">100</td>
                </tr>

                <tr>
                  <td colSpan={3}>
                    <span className="text-sm font-semibold">Total</span>
                  </td>
                  <td className="text-center">600</td>
                </tr>

              </tbody>

            </table>
            {/* Seleccionar un cliente */}
            <div className="flex justify-end">
              <Select>
                <SelectItem>Cliente 1</SelectItem>
                <SelectItem>Cliente 2</SelectItem>
                <SelectItem>Cliente 3</SelectItem>
              </Select>
            </div>
            {/* Boton para comprar */}

            <div className="flex justify-end">
              <Button color="primary">Comprar</Button>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>



  );
};
