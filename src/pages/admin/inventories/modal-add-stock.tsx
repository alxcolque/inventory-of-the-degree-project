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
import { useState } from "react";
import { FaCheck } from "react-icons/fa6";

interface ModalAddStockProps {
    open: boolean;
    onClose: () => void;
    data: any;
    change: (value: boolean) => void;
}

export const ModalAddStock = ({
    open,
    onClose,
    data,
    change,
}: ModalAddStockProps) => {

    console.log(data);

    return (
        <Modal size="md" isOpen={open} onClose={onClose} scrollBehavior="outside">
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
                                        <Input type="number" value={data.price} />
                                    </div>
                                    <div className="flex flex-row gap-1">
                                        <b>Cantidad:</b>
                                        <Input type="number" value={data.stock_quantity} />
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
