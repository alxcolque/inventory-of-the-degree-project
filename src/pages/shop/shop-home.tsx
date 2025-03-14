import { useParams } from "react-router-dom";
import { useAuthStore, useCategoriesStore, useStockStore } from "../../stores";
import { useShopsStore } from "../../stores/shops/shops.store";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@react-hook/media-query";
import { Accordion, AccordionItem, Button, Card, CardBody, CardHeader, Chip, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Image, Input, Popover, PopoverContent, PopoverTrigger, Skeleton, Spacer, Spinner } from "@nextui-org/react";
import { TbDotsVertical } from "react-icons/tb";
import { FaShoppingCart, FaStarHalfAlt } from "react-icons/fa";
import { FaEye, FaPencil, FaTrash } from "react-icons/fa6";
import { RiMoreFill } from "react-icons/ri";
import { IndexSale } from "./sales/index-sale";
import { ModalBrands } from "../../components/modal/modal-brands";
import { useNavigate } from "react-router-dom";

export const ShopHome = () => {
  const navigate = useNavigate();
  const token = useAuthStore(state => state.token);
  const { slug } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  /* const [date, setDate] = useState<DateValue | null>();
  const handleChangeDate = (date: DateValue | null) => {
    setDate(date);
  } */
  const categories = useCategoriesStore(state => state.categories);
  const getCategories = useCategoriesStore(state => state.getCategories);
  const products = useStockStore(state => state.products);
  const getProducts = useStockStore(state => state.getProducts);
  const [isModalBrandsOpen, setIsModalBrandsOpen] = useState(false);

  const shop = useShopsStore(state => state.shop);
  const getShop = useShopsStore(state => state.getShop);
  const [isSale, setIsSale] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    getShop(token as string, slug as string);
    setIsLoading(false);
    getCategories(token!);
    getProducts(token!);
  }, [token]);

  const [selectedKeys, setSelectedKeys] = useState(new Set(["1"]));





  /* Si la pantalla es mobile se contrae el accordion setSelectedKeys==[]*/
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    if (isMobile) {
      setSelectedKeys(new Set([]));
    } else {
      setSelectedKeys(new Set(["1"]));
    }
  }, [isMobile]);


  //console.log(data?.field.id);
  //console.log(currentDate);

  //console.log(data);
  return (
    <div className="my-2 px-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      {/* Modal para brands */}
      <ModalBrands isOpen={isModalBrandsOpen} onClose={() => { setIsModalBrandsOpen(false) }} brand={[]} />
      <div className="flex flex-col w-full lg:flex-row gap-4">
        {/* Primera Sección 80% de ancho de columna en desktop y 100% en tablet y mobile */}
        <div className="w-full flex flex-col lg:flex-row md:w-full gap-4">
          {/* seccion 1 30% de ancho de columna en desktop y 100% en tablet y mobile */}
          <div className="w-full flex flex-col lg:w-1/4">

            {isLoading &&
              <div className="w-full h-[300px]">
                <Skeleton className="w-full h-[100px]" />
                <div className="w-full flex flex-col gap-2 mt-2">
                  <Skeleton className="h-3 w-3/5 rounded-lg" />
                  <Skeleton className="h-3 w-4/5 rounded-lg" />
                </div>
              </div>
            }
            {!isLoading &&
              <Card className="">
                <CardHeader className="flex gap-3">
                  <Image
                    alt="nextui logo"
                    height={40}
                    radius="sm"
                    src={shop?.storeFront ?? `https://picsum.photos/seed/${Math.random()}/200/300`}
                    width={40}
                  />
                  <div
                    className="flex flex-col flex-grow"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold">{shop?.name}
                        <p title={shop?.slug} className="text-sm text-gray-500">{shop?.slug}</p>
                      </span>
                      <Dropdown>
                        <DropdownTrigger>
                          <Button variant="bordered" isIconOnly>
                            <TbDotsVertical />
                          </Button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Dynamic Actions">
                          <DropdownItem key="reportar">Ajustes</DropdownItem>
                        </DropdownMenu>

                      </Dropdown>

                    </div>
                  </div>
                </CardHeader>
                <Divider />
                <Accordion
                  selectedKeys={selectedKeys}
                  onSelectionChange={(keys) => setSelectedKeys(keys as any)}
                >
                  <AccordionItem key="1" title="Información">
                    <>
                      <p><span className="font-bold">Contacto:</span> {shop?.phone}</p>
                      <p><span className="font-bold">Dirección:</span> {shop?.address}</p>
                      <div className="flex items-center">
                        <p><span className="font-bold">Calificación:</span> 4.5</p>&nbsp;&nbsp;
                        <FaStarHalfAlt color="#FFD700" />
                      </div>
                      <Spacer y={0.5} />
                      {/* Boton para ventas */}
                      <Button color={isSale ? 'primary' : 'default'} startContent={<FaShoppingCart />} onClick={() => setIsSale(true)} className="w-full">Ventas</Button>
                    </>
                  </AccordionItem>
                </Accordion>
              </Card>
            }
          </div>
          {/* Sección 2 70% de ancho de columna en desktop y 100% en tablet y mobile */}
          <div className="w-full flex flex-col lg:w-2/3">
            {isSale && (
              <IndexSale onClose={() => setIsSale(false)} />
            )}
            {!isSale && (
              <>
                <div className="flex flex-row justify-between items-center">
                  <h2>Inventario de almacén</h2>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {/* busqueda */}
                  <div className="flex flex-row items-center gap-2">
                    <Input type="text" placeholder="Buscar producto" />
                    <Button color="primary" variant="shadow">Buscar...</Button>
                  </div>
                  {/* Boton de marca */}
                  <Button color="primary" variant="shadow" onClick={() => { setIsModalBrandsOpen(true) }}>Marca</Button>
                  {/* date picker */}

                  {/* FEcha actual */}
                  {/* <div className="flex flex-row items-center gap-2">

                    <DatePicker
                      onChange={handleChangeDate}
                      value={date}
                    />
                  </div> */}
                </div>

                {/* Botones horizontales para listar categorias para filtro, scroll horizontal */}
                <div className="flex gap-2 overflow-x-auto scrollbar-hide mt-3">

                  <Button>Todos</Button>
                  {categories.map((category) => (
                    <Button key={category.id}>{category.name}</Button>
                  ))}

                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex flex-row items-center gap-2">
                    <h5 className="text-md font-bold">TODOS LOS PRODUCTOS</h5>
                  </div>
                  {isLoading && <Spinner />}
                  {products.map((product) => (
                    <div className="flex flex-col gap-2">
                      <h5 className="text-md font-semibold">{product.name}</h5>
                      {/* Cards de productos */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                        {product.product.map((product) => (
                          <Card
                            isBlurred
                            className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px]"
                            shadow="sm"
                          >
                            <CardBody>
                              <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
                                <div className="relative col-span-6 md:col-span-4">
                                  <Image
                                    alt="Album cover"
                                    className="object-cover"
                                    shadow="md"
                                    src={product.image}
                                    width={100}
                                    height={100}


                                  />
                                </div>

                                <div className="flex flex-col col-span-6 md:col-span-8">
                                  <div className="flex justify-between items-start">
                                    <div className="flex flex-col gap-0 w-full">
                                      <div className="flex flex-row justify-between items-center">
                                        <h3 className="text-large font-medium">{product.name}</h3>

                                        <Dropdown>
                                          <DropdownTrigger>

                                            <Button
                                              isIconOnly

                                              className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2"
                                              radius="full"
                                              variant="light"
                                            >
                                              <RiMoreFill size={25} />
                                            </Button>

                                          </DropdownTrigger>
                                          <DropdownMenu aria-label="Dropdown menu with icons" variant="faded">

                                            <DropdownItem
                                              key="edit"
                                              startContent={<FaPencil />}
                                            >
                                              Editar
                                            </DropdownItem>

                                            <DropdownItem
                                              key="delete"
                                              className="text-danger"
                                              color="danger"
                                              startContent={<FaTrash />}
                                            >
                                              Eliminar
                                            </DropdownItem>


                                          </DropdownMenu>
                                        </Dropdown>
                                      </div>
                                      <div className="flex flex-row gap-2">
                                        <Chip className="font-small" color="warning" variant="bordered">
                                          nuevo
                                        </Chip>
                                        <span className="text-sm text-foreground/90">{product.brand}</span>


                                      </div>
                                      {/* cantidad y precio */}
                                      <div className="flex flex-row gap-2">
                                        <span className="text-sm text-foreground/90 font-bold text-red-500">Bs {product.price}</span>
                                        <span className="text-sm text-foreground/90"> cantidad: {product.quantity}</span>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="flex flex-row gap-2 mt-2 justify-end">
                                    <Button size="sm" color="primary" variant="bordered" isIconOnly onClick={() => navigate(`/tienda/${slug}/${product.slug}`)}>
                                      <FaEye />
                                    </Button>

                                    <Popover showArrow offset={10} placement="bottom">
                                      <PopoverTrigger>
                                        <Button size="sm" color="success" variant="bordered">Carrito</Button>
                                      </PopoverTrigger>
                                      <PopoverContent className="w-[240px]">
                                          <div className="px-1 py-2 w-full">
                                            <p className="text-small font-bold text-foreground">
                                              Cantidad
                                            </p>
                                            <div className="mt-2 flex flex-col gap-2 w-full">
                                              <Input type="number" defaultValue="1" size="sm" variant="bordered" />
                                              <Button size="sm" color="primary" variant="shadow">Agregar al carrito</Button>
                                            </div>
                                          </div>
                                        
                                      </PopoverContent>
                                    </Popover>

                                  </div>
                                </div>
                              </div>

                            </CardBody>
                          </Card>
                        ))}
                      </div>
                    </div>

                  ))}
                </div>
              </>
            )}
          </div>
        </div>
        {/* Segunda Sección ocupa 20% de ancho de columna en desktop y 100% en tablet y mobile */}
        {/* <div className="w-full flex flex-col lg:w-1/4">
          <div>
            hola la ultima parte
          </div>
        </div> */}
      </div>
    </div>
  );

}
