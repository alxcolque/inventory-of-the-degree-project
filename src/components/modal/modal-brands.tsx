import { Button, cn, Image, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Radio, RadioGroup, Spinner } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useAuthStore, useBrandsStore } from "../../stores";
import { toast } from "sonner";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    selectBrands: (brands: string) => void;
}

export const ModalBrands = ({ isOpen, onClose, selectBrands }: Props) => {
    //const [isLoading, setIsLoading] = useState(false);
    const brands = useBrandsStore(state => state.brands);
    const getBrands = useBrandsStore(state => state.getBrands);
    const token = useAuthStore(state => state.token);
    const [isLoading, setIsLoading] = useState(false);

    const [selectedBrand, setSelectedBrand] = useState<string>();

    useEffect(() => {
        setIsLoading(true);
        getBrands(token!);
        setSelectedBrand("");
        setIsLoading(false);
    }, [token]);

    const handleCheckboxChange = (slug: string) => {
        setSelectedBrand(slug);
    };

    const searchBrands = () => {
        if (!selectedBrand) {
            toast.error("Debe seleccionar una marca");
            return;
        }
        selectBrands(selectedBrand!);
        onClose();
    }

    //console.log(selectedBrand);

    return (
        <Modal isOpen={isOpen} size="md" onClose={() => onClose()} scrollBehavior="inside">
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader>Seleccionar marcas</ModalHeader>
                        <ModalBody className="gap-2 flex flex-row">
                            {isLoading ? (
                                <div className="flex justify-center items-center h-full">
                                    <Spinner />
                                </div>
                            ) : (
                                <RadioGroup label="" className="flex flex-row">
                                {brands.map((item, index) => (
                                    <div key={index}>
                                    <Radio
                                        key={index}
                                        value={item.slug}
                                        onChange={() => handleCheckboxChange(item.slug)}
                                        classNames={{
                                            base: cn(
                                                "inline-flex m-0 hover:bg-warning items-center justify-between",
                                                "flex-row-reverse max-w-[200px] cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent",
                                                "data-[selected=true]:border-primary",
                                            ),
                                        }}
                                    >
                                        <Image
                                            alt={item.name}
                                            className="w-full object-cover h-[100px]"
                                            radius="lg"
                                            shadow="sm"
                                            src={item.image}
                                            width="100%"
                                        />
                                        {item.name}
                                    </Radio>
                                    </div>
                                    ))}
                                </RadioGroup>
                            )}
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={onClose} aria-label="Cerrar modal">
                                Cerrar
                            </Button>
                            <Button color="primary" onPress={() => searchBrands()} aria-label="Buscar marcas">
                                Buscar
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}