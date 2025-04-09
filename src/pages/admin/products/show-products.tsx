import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DynamicBreadcrumbs } from "../../../components";
import { useAuthStore, useBrandsStore, useProductImagesStore, useProductsStore, useSubcategoriesStore } from "../../../stores";
import { Button, Image, Input, SelectItem, Select, Spinner, Textarea, PopoverContent, PopoverTrigger, Popover } from "@nextui-org/react";
import { motion, AnimatePresence, wrap } from "framer-motion";
import clsx from 'clsx';
import { FaPencilAlt, FaSave, FaTimes } from "react-icons/fa";
import { FaArrowLeft, FaArrowUp } from 'react-icons/fa6';


const variants = {
    enter: (direction: number) => {
        return {
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
        };
    },
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1,
    },
    exit: (direction: number) => {
        return {
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
        };
    },
};
const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
};


export const ShowProducts = () => {
    const { id } = useParams();
    const token = useAuthStore(state => state.token);
    const product = useProductsStore(state => state.product);
    const getProduct = useProductsStore(state => state.getProduct);
    const [isEditing, setIsEditing] = useState(false);
    const [isLoadingSubcategories, setIsLoadingSubcategories] = useState<boolean>(false);
    const [isLoadingBrands, setIsLoadingBrands] = useState<boolean>(false);
    /* Subcategories */
    const subcategories = useSubcategoriesStore(state => state.subcategories);
    const getSubcategories = useSubcategoriesStore(state => state.getSubcategoriesAndCategories);
    /* Brands */
    const brands = useBrandsStore(state => state.brands);
    const getBrands = useBrandsStore(state => state.getBrands);


    const [thumbnailCurrent, setThumbnailCurrent] = useState("");
    const updateProduct = useProductsStore(state => state.updateProduct);
    const [optionsSubcategories, setOptionsSubcategories] = useState<any[]>([]);
    const [optionsBrands, setOptionsBrands] = useState<any[]>([]);
    /* Product Images */
    const [isLoadingProductImages, setIsLoadingProductImages] = useState<boolean>(false);
    const productImages = useProductImagesStore(state => state.productImages) as any[];
    const getProductImages = useProductImagesStore(state => state.getProductImages);
    const createProductImage = useProductImagesStore(state => state.createProductImage);
    const deleteProductImage = useProductImagesStore(state => state.deleteProductImage);

    const handleGetSubcategories = async () => {
        setIsLoadingSubcategories(true);
        if (subcategories.length === 0) {
            await getSubcategories(token!);
        }
        setOptionsSubcategories(subcategories.map(subcategory => ({ label: subcategory.name, value: subcategory.id })));
        setIsLoadingSubcategories(false);
    }
    const handleGetBrands = async () => {
        setIsLoadingBrands(true);
        if (brands.length === 0) {
            await getBrands(token!);
        }
        setOptionsBrands(brands.map(brand => ({ label: brand.name, value: brand.id })));
        setIsLoadingBrands(false);
    }

    const handleGetProduct = () => {
        if (id && token) {
            getProduct(Number(id), token);
        }
    }

    const handleGetProductImages = () => {
        if (id && token) {
            setIsLoadingProductImages(true);
            getProductImages(Number(id), token);
            setIsLoadingProductImages(false);
        }
    }

    useEffect(() => {
        handleGetProduct();
        handleGetSubcategories();
        handleGetBrands();
        handleGetProductImages();
    }, []);


    const [isLoading, setIsLoading] = useState(false);
    const [[page, direction], setPage] = useState([0, 0]);
    const imageIndex = wrap(0, productImages.length ?? 0, page);


    const paginate = (newDirection: number) => {
        setPage([page + newDirection, newDirection]);
    };

    /* Cambiar la imagen del thumbnail */
    const handleFileChangeThumbnail = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        const file = target.files?.[0] as File;
        if (file) {
            /* base64 */
            const reader = new FileReader();
            reader.onloadend = () => {
                setThumbnailCurrent(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };


    const handleSubmitProduct = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);

        let defaultSubcategoryId = product?.subcategory_id;
        if (formData.get("subcategory_id")) {
            defaultSubcategoryId = formData.get("subcategory_id");
        }
        let defaultBrandId = product?.brand_id;
        if (formData.get("brand_id")) {
            defaultBrandId = formData.get("brand_id");
        }
        const data = {
            name: formData.get("name"),
            description: formData.get("description"),
            subcategory_id: defaultSubcategoryId,
            brand_id: defaultBrandId,
            thumbnail: thumbnailCurrent,
        }
        setIsLoading(true);
        await updateProduct(Number(id), data, token!);
        setIsLoading(false);
        setIsEditing(false);
    }


    //console.log(product);


    /* Preview de la imagen */
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [images, setImages] = useState('');
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        const file = target.files?.[0] as File;
        setPreviewImage(URL.createObjectURL(file));
        /* base64 */
        const reader = new FileReader();
        reader.onloadend = () => {
            setImages(reader.result as string);
        };
        reader.readAsDataURL(file);

    };
    const handleSubmitImages = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (images.length > 0) {

            const data = {
                product_id: Number(id),
                image: images,
            }
            await createProductImage(data, token!);
        }
        setPreviewImage(null);
        setImages('');
    }

    return (

        <div className="my-2 px-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
            <DynamicBreadcrumbs />
            {/* Dos columnas */}
            <div className="flex flex-row gap-4">
                <div className="flex flex-col gap-2">
                    {!isEditing && (
                        <>
                            <div className="flex flex-wrap gap-2">
                                <h3 className="text-lg font-medium">ID: </h3>
                                <p>{product?.id}</p>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                <h3 className="text-lg font-medium">Nombre: </h3>
                                <p>{product?.name}</p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <h3 className="text-lg font-medium">Descripción: </h3>
                                <p>{product?.description}</p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <h3 className="text-lg font-medium">Categoría: </h3>
                                <p style={{ backgroundColor: product?.category ? product?.color : "" }}>{product?.category}</p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <h3 className="text-lg font-medium">Subcategoría: </h3>
                                <p>{product?.subcategory}</p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <h3 className="text-lg font-medium">Marca: </h3>
                                <p>{product?.brand}</p>
                            </div>

                            <div className="flex flex-col gap-2">
                                <h3 className="text-lg font-medium">Imagen: </h3>
                                <img src={product?.thumbnail} alt={product?.name} height={100} width={100} />
                            </div>
                        </>
                    )}

                    {/* Boton para editar el producto */}
                    <Button color="secondary" variant="bordered" onPress={() => { setIsEditing(!isEditing); handleGetSubcategories(); handleGetBrands(); }}>
                        {isEditing ? (
                            <>
                                <FaArrowLeft className="mr-2" /> Cancelar
                            </>
                        ) : (
                            <>
                                <FaPencilAlt /> Editar
                            </>
                        )}
                    </Button>

                    {isEditing && (
                        <div className="flex flex-col gap-2">
                            <form onSubmit={handleSubmitProduct} className="flex flex-col gap-2" encType="multipart/form-data">
                                <Input isRequired type="text" name="name" defaultValue={product?.name} label="Nombre" />
                                <Textarea isRequired label="Descripción" name="description" defaultValue={product?.description} />

                                {isLoadingSubcategories ? (
                                    <Spinner />
                                ) : (
                                    <Select label="Subcategoría"
                                        name="subcategory_id"
                                    >
                                        {optionsSubcategories.map((option) => (
                                            <SelectItem
                                                key={option.value}
                                                value={option.value}
                                                aria-label={option.label}
                                            >
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                )}
                                {isLoadingBrands ? (
                                    <Spinner />
                                ) : (
                                    <Select label="Marca"
                                        name="brand_id"
                                    >
                                        {optionsBrands.map((option: any) => (
                                            <SelectItem
                                                key={option.value}
                                                value={option.value}
                                                aria-label={option.label}
                                            >
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                )}
                                <Input type="file" onChange={handleFileChangeThumbnail} name="thumbnail" label="Imagen" accept="image/*" />

                                <Button isLoading={isLoading} type="submit" color="primary" variant="bordered">
                                    <FaSave className="mr-2" /> Guardar
                                </Button>
                            </form>
                        </div>
                    )}


                </div>
                <div className="flex flex-col w-1/2">
                    <div className="flex h-full w-full flex-col items-center justify-center gap-4">
                        {/* Main Image Carousel */}
                        {productImages.length > 0 && (
                            <div className="relative flex h-[400px] w-full max-w-4xl items-center overflow-hidden rounded-xl">
                                <AnimatePresence initial={false} custom={direction}>
                                    <motion.div
                                        key={page}
                                        custom={direction}
                                        variants={variants}
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                        transition={{
                                            x: { type: 'spring', stiffness: 300, damping: 30 },
                                            opacity: { duration: 0.2 },
                                        }}
                                        drag="x"
                                        dragConstraints={{ left: 0, right: 0 }}
                                        dragElastic={1}
                                        onDragEnd={(e, { offset, velocity }: { offset: { x: number }, velocity: { x: number } }) => {
                                            const swipe = swipePower(offset.x, velocity.x);
                                            console.log(e);
                                            if (swipe < -swipeConfidenceThreshold) {
                                                paginate(1);
                                            } else if (swipe > swipeConfidenceThreshold) {
                                                paginate(-1);
                                            }
                                        }}
                                        className="absolute h-full w-full"
                                    >
                                        <Image
                                            removeWrapper
                                            alt={`Product Image ${imageIndex}`}
                                            className="h-full w-full object-cover"
                                            src={productImages[imageIndex].image}
                                        />
                                    </motion.div>
                                </AnimatePresence>

                                {/* Arrows */}
                                <Button
                                    className="absolute left-5 top-1/2 z-10 hidden h-12 w-12 min-w-0 md:flex"
                                    radius="full"
                                    onPress={() => paginate(-1)}
                                >
                                    <svg width="12" height="18" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M11 1 3 9l8 8"
                                            stroke="#1D2026"
                                            strokeWidth="3"
                                            fill="none"
                                            fillRule="evenodd"
                                        />
                                    </svg>
                                </Button>

                                <Button
                                    className="absolute right-5 top-1/2 z-10 hidden h-12 w-12 min-w-0 md:flex"
                                    radius="full"
                                    onPress={() => paginate(1)}
                                >
                                    <svg width="13" height="18" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="m2 1 8 8-8 8"
                                            stroke="#1D2026"
                                            strokeWidth="3"
                                            fill="none"
                                            fillRule="evenodd"
                                        />
                                    </svg>
                                </Button>
                            </div>
                        )}

                        {/* Thumbnails Carousel */}
                        <div className="flex w-full max-w-4xl gap-3 overflow-x-auto py-2 px-1 scrollbar-hide">
                            {productImages.map((img: any, index: number) => (
                                <button
                                    key={index}
                                    onClick={() => setPage([index, index - imageIndex])}
                                    className={clsx(
                                        'h-20 w-24 flex-shrink-0 overflow-hidden rounded-md transition-all duration-300',
                                        {
                                            'ring-2 ring-orange-500': index === imageIndex,
                                        }
                                    )}
                                >
                                    <div className="relative">
                                        <Image
                                            removeWrapper
                                            alt={`Thumbnail ${index}`}
                                            src={img.image}
                                            className="h-full w-full object-cover"
                                        />
                                        <Popover>
                                            <PopoverTrigger>
                                                <Button className="z-10 absolute top-0 left-0" size="sm" isIconOnly variant="bordered" color="danger">
                                                    <FaTimes />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent>
                                                <div className="flex flex-col gap-2 px-1 py-2">
                                                    <span>¿Eliminar contrato?</span>
                                                    <div className="flex flex-row gap-2">
                                                        <Button
                                                            size="sm"
                                                            isLoading={isLoadingProductImages}
                                                            spinner={<Spinner color="success" size="sm" />}
                                                            color="success"
                                                            variant="flat"
                                                            onPress={() => deleteProductImage(Number(id), img.id, token!)}
                                                        >
                                                            Si
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            spinner={<Spinner color="danger" size="sm" />}
                                                            color="danger"
                                                            variant="flat"
                                                        >
                                                            No
                                                        </Button>
                                                    </div>
                                                </div>
                                            </PopoverContent>
                                        </Popover>

                                    </div>
                                </button>
                            ))}
                        </div>
                        {/* Input with icon to upload images */}
                        <form onSubmit={handleSubmitImages} className="flex flex-col gap-2">
                            <Input type="file" onChange={handleFileChange} label="Subir imagen" accept="image/*" />
                            {/* Preview of the image */}
                            {previewImage && (
                                <div className="flex flex-col gap-2">
                                    <Image src={previewImage} alt={product?.name} height={100} width={100} />
                                    <Button type="submit" color="primary" variant="bordered">
                                        <FaArrowUp className="mr-2" /> Subir imagen
                                    </Button>
                                </div>
                            )}

                        </form>

                    </div>
                </div>
            </div>
        </div>
    )
}
