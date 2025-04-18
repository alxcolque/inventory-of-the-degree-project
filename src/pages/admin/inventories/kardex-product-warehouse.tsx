import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DynamicBreadcrumbs } from "../../../components";
import {
  useAuthStore,
  useProductsStore,
} from "../../../stores";
import {
  Button,
  Image,
  Spinner,
} from "@nextui-org/react";
import { motion, AnimatePresence, wrap } from "framer-motion";
import clsx from "clsx";

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

export const KardexProductWarehouse = () => {
  const { slug } = useParams();
  const token = useAuthStore((state) => state.token);
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState<any>({});
  /* Cannot read properties of undefined (reading 'length') */
  const [productImages, setProductImages] = useState<any[]>([]);
  const [productInventoryStore, setProductInventoryStore] = useState([]);
  const [productInventoryWarehouse, setProductInventoryWarehouse] = useState<any[]>([]);
  const data = useProductsStore((state) => state.product);
  const getProduct = useProductsStore((state) => state.getProductBySlug);

  const handleGetProduct = async () => {
    if (slug && token) {
      await getProduct(slug, token);
      setProduct(data.product);
      setProductImages(data.productImages);
      setProductInventoryStore(data.productInventoryStore);
      setProductInventoryWarehouse(data.productInventoryWarehouse);
    }
  };


  useEffect(() => {
    setIsLoading(false);
    handleGetProduct();
    setIsLoading(true);
  }, []);

  console.log(data);


  const [[page, direction], setPage] = useState([0, 0]);
  const imageIndex = wrap(0, productImages.length ?? [{}], page);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <div className="my-2 px-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      <DynamicBreadcrumbs />
      {/* Dos columnas */}
      {!isLoading ? (
        <Spinner />
      ) : (
        <div className="flex flex-row gap-4 w-full">

          <div className="flex flex-col">
            <div className="flex flex-col gap-4 justify-center items-center w-full h-full">
              {/* Main Image Carousel */}
              {productImages.length > 0 && (
                <>
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
                          x: { type: "spring", stiffness: 300, damping: 30 },
                          opacity: { duration: 0.2 },
                        }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={1}
                        onDragEnd={(
                          e,
                          {
                            offset,
                            velocity,
                          }: { offset: { x: number }; velocity: { x: number } }
                        ) => {
                          const swipe = swipePower(offset.x, velocity.x);
                          console.log(e);
                          if (swipe < -swipeConfidenceThreshold) {
                            paginate(1);
                          } else if (swipe > swipeConfidenceThreshold) {
                            paginate(-1);
                          }
                        }}
                        className="absolute w-full h-full"
                      >
                        {productImages.length > 0 && (
                        <Image
                          removeWrapper
                          alt={`Product Image ${imageIndex}`}
                          className="object-cover w-full h-full"
                          src={productImages[imageIndex].image}
                        />
                        )}
                      </motion.div>
                    </AnimatePresence>

                    {/* Arrows */}
                    <Button
                      className="hidden absolute left-5 top-1/2 z-10 w-12 min-w-0 h-12 md:flex"
                      radius="full"
                      onPress={() => paginate(-1)}
                    >
                      <svg
                        width="12"
                        height="18"
                        xmlns="http://www.w3.org/2000/svg"
                      >
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
                      className="hidden absolute right-5 top-1/2 z-10 w-12 min-w-0 h-12 md:flex"
                      radius="full"
                      onPress={() => paginate(1)}
                    >
                      <svg
                        width="13"
                        height="18"
                        xmlns="http://www.w3.org/2000/svg"
                      >
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


                  {/* Thumbnails Carousel */}
                  <div className="flex overflow-x-auto gap-3 px-1 py-2 w-full max-w-4xl scrollbar-hide">
                    {productImages.map((img: any, index: number) => (
                      <button
                        key={index}
                        onClick={() => setPage([index, index - imageIndex])}
                        className={clsx(
                          "h-20 w-24 flex-shrink-0 overflow-hidden rounded-md transition-all duration-300",
                          {
                            "ring-2 ring-orange-500": index === imageIndex,
                          }
                        )}
                      >
                        <div className="relative">
                          <Image
                            removeWrapper
                            alt={`Thumbnail ${index}`}
                            src={img.image}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <>
              <div className="flex flex-col gap-2">
                <img
                  src={product?.thumbnail}
                  alt={product?.name}
                  height={100}
                  width={100}
                />
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
                <p
                  style={{
                    backgroundColor: product?.category ? product?.color : "",
                  }}
                >
                  {product?.category}
                </p>
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
                <h3 className="text-lg font-bold uppercase">Detalle de Precios y Stock</h3>
                <div className="flex flex-wrap gap-2">
                  {productInventoryWarehouse.map((inventory: any, index: number) => (
                    <div key={index} className="flex flex-col gap-2">
                      <p className="text-lg">Stock en Bodega: <b>{inventory.stock_quantity}</b></p>
                      <hr className="w-full border-t border-gray-300" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-bold uppercase">Tiendas Distribuidas</h3>
                <div className="flex flex-col wrap gap-2">
                  {productInventoryStore.map((inventory: any, index: number) => (
                    <div key={index} className="flex flex-col gap-2">
                      <h4 className="text-md font-medium">{inventory.store.name}</h4>
                      <p className="text-lg">Tienda: <b>{inventory.store}</b></p>
                      <p className="text-sm">Stock en tienda: <b>{inventory.stock_quantity}</b></p>
                      <hr className="w-full border-t border-gray-300" />
                    </div>
                  ))}
                </div>
              </div>
            </>
          </div>

        </div>
      )}
    </div>
  );
};
