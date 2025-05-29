import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Input,
    Image,
} from "@nextui-org/react";
import { FaCheck } from "react-icons/fa6";
import { useWarehouseStore } from "../../../stores";
import { toast } from "sonner";


interface ModalAddStockProps {
    open: boolean;
    onClose: () => void;
    data: any;
    change: (value: boolean) => void;
    token: string;
}

export const ModalAddStock = ({
    open,
    onClose,
    data,
    change,
    token
}: ModalAddStockProps) => {
    const { updatePriceQuantity } = useWarehouseStore();

    const handleAddStock = async () => {
        /* Valida que los campos no esten vacios */
        if (Number(data.price) === 0 || Number(data.stock_quantity) === 0) {
            toast.error("Los campos no pueden estar vacios");
            return;
        }
        const dataUpdate = {
            product_id: data.id,
            supplier_id: data.supplier_id,
            quantity: data.quantity,
            unit: data.unit,
            price: Number(data.price),
            stock_quantity: Number(data.stock_quantity)
        }
        await updatePriceQuantity(data.inventory_id, dataUpdate, token);
        change(false);
    };

    //console.log(data);

    return (
        <Modal key={data.inventory_id} size="md" isOpen={open} onClose={onClose} scrollBehavior="outside">
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-row gap-1 justify-center items-center">
                            <h2 className="text-lg font-bold uppercase">{data.name}</h2>
                        </ModalHeader>
                        <ModalBody>
                            <div className="flex flex-wrap gap-2 items-center">
                                <Image
                                    src={data.thumbnail}
                                    alt={data.name}
                                    width={100}
                                    height={100}
                                />

                                <div className="flex flex-col gap-1">
                                    <div className="flex flex-row gap-1">
                                        <b>Proveedor:</b> <span>{data.supplier}</span>
                                    </div>
                                    <div className="flex flex-row gap-1">
                                        <b>Precio:</b>
                                        <Input type="number" defaultValue={data.price} onChange={(e) => data.price = e.target.value} />
                                    </div>
                                    <div className="flex flex-row gap-1">
                                        <b>Cantidad:</b>
                                        <Input type="number" defaultValue={data.stock_quantity} onChange={(e) => data.stock_quantity = e.target.value} />
                                    </div>
                                </div>
                            </div>

                        </ModalBody>
                        <ModalFooter>
                            <Button
                                size="sm"
                                color="success"
                                variant="shadow"
                                startContent={<FaCheck />}
                                onPress={() => handleAddStock()}
                            >
                                {" "}
                                Aceptar
                            </Button>


                            <Button
                                color="secondary"
                                size="sm"
                                variant="bordered"
                                onPress={onClose}
                            >
                                Cerrar
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};
