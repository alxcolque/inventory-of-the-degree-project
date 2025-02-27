import { Button, Card, CardBody, CardFooter, Checkbox, Image, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useAuthStore, useBrandsStore } from "../../stores";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    brand: any[];
}

export const ModalBrands = ({ isOpen, onClose, brand }: Props) => {
    //const [isLoading, setIsLoading] = useState(false);
    const brands = useBrandsStore(state => state.brands);
    const getBrands = useBrandsStore(state => state.getBrands);
    const token = useAuthStore(state => state.token);

    useEffect(() => {
        getBrands(token!);
    }, [token]);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

    const handleCheckboxChange = (slug: string) => {
        setSelectedBrands((prev) => {
            if (prev.includes(slug)) {
                return prev.filter((item) => item !== slug);
            } else {
                return [...prev, slug];
            }
        });
        brand = selectedBrands;
    };


    return (
        <Modal isOpen={isOpen} size="md" onClose={() => onClose()}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Seleccione las marcas</ModalHeader>
                        <ModalBody>
                            <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
                                {brands.map((item, index) => (
                                    /* eslint-disable no-console */
                                    <Card key={index} isPressable shadow="sm" onPress={() => console.log("item pressed")}>
                                        <CardBody className="overflow-visible p-0">
                                            <Image
                                                alt={item.name}
                                                className="w-full object-cover h-[140px]"
                                                radius="lg"
                                                shadow="sm"
                                                src={item.logo}
                                                width="100%"
                                            />
                                        </CardBody>
                                        <CardFooter className="text-small justify-between">
                                            <Checkbox checked={selectedBrands.includes(item.slug)} onChange={() => handleCheckboxChange(item.slug)} />
                                            <b>{item.name}</b>
                                        </CardFooter>
                                    </Card>
                                ))}
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={onClose}>
                                Cerrar
                            </Button>
                            <Button color="primary" onPress={onClose}>
                                Buscar
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}