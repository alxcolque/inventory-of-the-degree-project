import { Button, Card, CardBody, CardFooter, Checkbox, Image, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useAuthStore, useBrandsStore } from "../../stores";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    selectBrands: (brands: string[]) => void;
}

export const ModalBrands = ({ isOpen, onClose, selectBrands }: Props) => {
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
    };
    useEffect(() => {
        selectBrands(selectedBrands);
    }, [selectedBrands]);

    //console.log(selectedBrands);

    return (
        <Modal isOpen={isOpen} size="md" onClose={() => onClose()}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Seleccione las marcas</ModalHeader>
                        <ModalBody>
                            <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
                                {brands.map((item, index) => (
                                    <Card 
                                    
                                        key={index} 
                                        isPressable 
                                        shadow="sm" 
                                        onPress={() => console.log("item pressed")}
                                        
                                    >
                                        <CardBody className="overflow-visible p-0">
                                            <Image
                                                alt={item.name}
                                                className="w-full object-cover h-[140px]"
                                                radius="lg"
                                                shadow="sm"
                                                src={item.image}
                                                width="100%"
                                            />
                                        </CardBody>
                                        <CardFooter className="text-small justify-between">
                                            <Checkbox 
                                                checked={selectedBrands.includes(item.slug)} 
                                                onChange={() => handleCheckboxChange(item.slug)}
                                                aria-label={`Seleccionar marca ${item.name}`}
                                            />
                                            <b>{item.name}</b>
                                        </CardFooter>
                                    </Card>
                                ))}
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={onClose} aria-label="Cerrar modal">
                                Cerrar
                            </Button>
                            <Button color="primary" onPress={onClose} aria-label="Buscar marcas">
                                Buscar
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}