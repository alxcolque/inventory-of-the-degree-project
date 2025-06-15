import { useParams } from "react-router-dom";
import { useAuthStore, useStockStore } from "../../stores";
import { useShopsStore } from "../../stores/shops/shops.store";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@react-hook/media-query";
import { Accordion, AccordionItem, Badge, Button, Card, CardBody, CardHeader, Chip, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Image, Input, Popover, PopoverContent, PopoverTrigger, Skeleton, Spacer, Spinner, Tooltip } from "@nextui-org/react";
import { TbDotsVertical } from "react-icons/tb";
import { FaShoppingCart, FaStarHalfAlt } from "react-icons/fa";
import { FaChartLine, FaEye, FaPencil, FaTrash } from "react-icons/fa6";
import { RiMoreFill } from "react-icons/ri";
import { IndexSale } from "./sales/index-sale";
import { ModalBrands } from "../../components/modal/modal-brands";
import { useNavigate } from "react-router-dom";
import { AlertDelete } from "../../components/ui/alert-delete";
import { toast } from "sonner";
import { IoMdSearch } from "react-icons/io";
import { CartModal } from "./modals/cart-modal";

export const ShopHome = () => {
  const user = useAuthStore(state => state.user);
  const navigate = useNavigate();
  const token = useAuthStore(state => state.token);
  const { slug } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const [isModalBrandsOpen, setIsModalBrandsOpen] = useState(false);


  const [deleteRowId, setDeleteRowId] = useState<number | null>(null);
  const [deleteCountdown, setDeleteCountdown] = useState<number | null>(null);


  const shop = useShopsStore(state => state.shop);
  const getShop = useShopsStore(state => state.getShopBySlug);
  const storeProducts = useStockStore(state => state.storeProducts);
  const categories = useStockStore(state => state.categories);
  const getProducts = useStockStore(state => state.getStoreProducts);

  const [quantityCart, setQuantityCart] = useState(0);
  const [price, setPrice] = useState("");

  const handleGetShop = async () => {
    if (token) {
      setIsLoading(true);
      await getShop(slug as string, token as string);
      handleFilter("", "");
      setIsLoading(false);
    }
    
  }
  /* Calculate cart */
  const handleCalculateCart = () => {
    let cart = localStorage.getItem('cart' + slug);
    if (cart) {
      setQuantityCart(JSON.parse(cart).length);
    }
  }

  const [isSale, setIsSale] = useState(false);
  useEffect(() => {
    if (token) {
      handleGetShop();
    }
    handleCalculateCart();

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
  /* Remove product in inventory */

  useEffect(() => {
    if (deleteCountdown !== null && deleteCountdown > 0) {
      const timer = setTimeout(() => {
        setDeleteCountdown(deleteCountdown - 1);
      }, 1000);
      return () => clearTimeout(timer); // Limpia el temporizador
    } else if (deleteCountdown === 0) {
      handleConfirmDelete(); // Elimina permanentemente cuando llega a 0
    }
  }, [deleteCountdown]);

  const handleDeleteClick = (id: number) => {
    //console.log(id);
    setDeleteRowId(id);
    setDeleteCountdown(10); // Inicia el temporizador de 10 segundos
  };
  const handleConfirmDelete = async () => {
    //setRows(rows.filter(row => row.id !== deleteRowId)); // Elimina el registro de los datos
    //await deleteRole(deleteRowId!, token!); // Elimina el registro de la base de datos
    if (deleteRowId) {
      //await deleteProduct(deleteRowId, token!);
      setDeleteRowId(null);
      setDeleteCountdown(null); // Resetea el temporizador
    }
  };
  // Función para cancelar la eliminación
  const handleCancelDelete = () => {
    setDeleteRowId(null);
    setDeleteCountdown(null); // Resetea el temporizador
  };
  /* Agregar al carrito */
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = (id: number, thumbnail: string, name: string, price: number, category: string, product_id: number, stock_quantity: number) => {

    //Verificar si stock es suficiente
    if (stock_quantity < quantity) {
      toast.error('No hay suficiente stock');
      return;
    }

    const data = {
      thumbnail: thumbnail,
      name: name,
      category: category,
      price: price,
      inventory_id: id,
      product_id: product_id,
      quantity: quantity
    }
    /* Almacenar este array en el local storage */
    const cart = localStorage.getItem('cart' + slug);
    if (cart) {
      const cartArray = JSON.parse(cart);
      const productIndex = cartArray.findIndex((item: any) => item.inventory_id === id);
      if (productIndex !== -1) {
        cartArray[productIndex].quantity += quantity;
      } else {
        cartArray.push(data);
      }
      localStorage.setItem('cart' + slug, JSON.stringify(cartArray));
    } else {
      localStorage.setItem('cart' + slug, JSON.stringify([data]));
    }
    handleCalculateCart();
    toast.success('Producto agregado al carrito');
    //console.log(localStorage.getItem('cart'));
  }
  /* Funcion para obtener las marcas */
  const selectBrands = (brand: string) => {
    if (brand) {
      handleFilter("brands", brand);
    }
  };
  const handleSearch = (search: string) => {
    handleFilter("search", search);
    handleCalculateCart();
  };
  /* Funcion para obtener los productos */
  const handleFilter = async (type: string, value: string) => {
    let params = {
      search: "",
      brands: "",
      categories: ""
    };
    if (type === "brands") {
      navigate("/tienda/" + slug + "?brands=" + value);

      params.brands = value;
      await getProducts(slug!, params, token!);

    } else if (type === "categories") {
      navigate("/tienda/" + slug + "?categories=" + value);

      params.categories = value;
      await getProducts(slug!, params, token!);

    } else if (type === "search") {
      navigate("/tienda/" + slug + "?search=" + value);

      params.search = value;
      await getProducts(slug!, params, token!);

    } else {
      setIsLoading(true);
      navigate("/tienda/" + slug);
      await getProducts(slug!, params, token!);
      setIsLoading(false);
    }


  }
  return (
    <div className="my-2 px-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      {/* Modal para brands */}
      <ModalBrands isOpen={isModalBrandsOpen} onClose={() => { setIsModalBrandsOpen(false) }} selectBrands={selectBrands} />
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
                    src={shop?.front_image ?? `https://picsum.photos/seed/${Math.random()}/200/300`}
                    width={40}
                  />
                  <div
                    className="flex flex-col flex-grow"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold">{shop?.name}
                        <p title={shop?.slug} className="text-sm text-gray-500">{shop?.slug}</p>
                      </span>
                      {/* Only admin */}
                      {user?.roles.includes('admin') && (
                      <Dropdown>
                        <DropdownTrigger>
                          <Button variant="bordered" isIconOnly>
                            <TbDotsVertical />
                          </Button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Dynamic Actions">
                          <DropdownItem key="ajustes">Ajustes</DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                      )}
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
                      <Button color={isSale ? 'primary' : 'default'} startContent={<FaShoppingCart />} onPress={() => setIsSale(true)} className="w-full">Ventas</Button>
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
                <div className="flex flex-row gap-2 justify-between items-center">
                  {/* busqueda */}
                  <div className="flex flex-row gap-2">
                    <Input
                      startContent={<IoMdSearch />}
                      isClearable
                      className="w-full"
                      classNames={{
                        input: "w-full",
                        mainWrapper: "w-full",
                      }}
                      placeholder="Buscar..."
                      onKeyDown={(e: any) => {
                        if (e.key === "Enter") {
                          handleSearch(e.target.value);
                        }
                      }}
                    />
                  </div>
                  {/* Boton de marca */}
                  <Button
                    color="primary"
                    variant="shadow"
                    onPress={() => setIsModalBrandsOpen(true)}
                  >
                    Marca
                  </Button>
                </div>

                {/* Botones horizontales para listar categorias para filtro, scroll horizontal */}
                <div className="flex gap-2 w-full overflow-x-scroll h-[60px] items-center justify-center">

                  <Button
                    size="sm"
                    onPress={() => {
                      handleFilter("", "");
                    }}
                  >
                    Todos
                  </Button>

                  {categories.length === 0 && (
                    <Spinner />
                  )}
                  {categories.length > 0 && (
                    categories.map((category: any, index: number) => (
                      <Badge key={index} size="sm" color="danger" content={category.product_count} shape="circle">
                        <Button
                          key={index}
                          size="sm"
                          style={{ backgroundColor: category.color }}
                          onPress={() => {
                            handleFilter("categories", category.slug);
                          }}
                        >
                          {category.name}
                        </Button>
                      </Badge>
                    )))}
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex flex-row items-center gap-2">
                    <h5 className="text-md font-bold">TODOS LOS PRODUCTOS</h5>
                  </div>
                  {isLoading && <Spinner />}
                  {!isLoading && storeProducts.map((subcategories: any, index: number) => (
                    <div className="flex flex-col gap-2" key={index}>
                      <h5 className="font-semibold text-md">
                        {subcategories.subcategory}
                      </h5>
                      {/* Cards de productos */}
                      <div
                        className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3"
                        key={index}
                      >
                        {subcategories.products.map((product: any, index: number) => (
                          <Card
                            key={index}
                            isBlurred
                            className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px]"
                            shadow="sm"
                          >
                            <CardBody
                            key={index}
                            >
                              <div className="grid grid-cols-12 gap-2 justify-center items-center md:grid-cols-12 md:gap-4">
                                <div className="relative col-span-4 cursor-pointer md:col-span-4 sm:col-span-4">
                                  <Image
                                    alt={product.name}
                                    className="object-cover"
                                    shadow="md"
                                    src={product.thumbnail}
                                    width={100}
                                    height={100}
                                  />
                                </div>

                                <div className="flex flex-col col-span-8 md:col-span-8 sm:col-span-8">
                                  <div className="flex justify-between items-start">
                                    <div className="flex flex-col gap-0 w-full">
                                      {/* Only admin */}
                                      
                                      <div className="flex flex-row justify-between items-center">
                                        <h3 className="font-medium text-large">
                                          {product.name}
                                        </h3>
                                      {user?.roles.includes('admin') && (

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
                                          <DropdownMenu
                                            aria-label="Dropdown menu with icons"
                                            variant="faded"
                                          >
                                            <DropdownItem
                                              key="edit"
                                              startContent={<FaPencil />}
                                              onPress={() =>
                                                navigate("/admin/inventories/input")
                                              }
                                            >
                                              Agregar
                                            </DropdownItem>

                                            <DropdownItem
                                              key="delete"
                                              className="text-danger"
                                              color="danger"
                                              variant="bordered"
                                              startContent={<FaTrash />}
                                              onPress={() => handleDeleteClick(product.inventory_id)}
                                            >
                                              Eliminar
                                            </DropdownItem>
                                          </DropdownMenu>
                                        </Dropdown>
                                      )}
                                      </div>
                                      <div className="flex flex-row gap-2">
                                        <Chip
                                          className="font-small"
                                          size="sm"
                                          style={{
                                            backgroundColor: subcategories.color,
                                          }}
                                          variant="bordered"
                                        >
                                          {subcategories.category}
                                        </Chip>
                                        <span className="text-sm text-foreground/90">
                                          {product.brand}
                                        </span>
                                      </div>
                                      
                                      {/* cantidad y precio */}
                                      <div className="flex flex-row gap-2">
                                        <span className="text-sm font-bold text-red-500 text-foreground/90">
                                          Bs {product.price}
                                        </span>
                                        <span className="text-sm text-foreground/90">
                                          {" "}
                                          cantidad: {product.stock_quantity}
                                        </span>
                                      </div>
                                    </div>
                                  </div>

                                  <div
                                    className="flex flex-row gap-2 justify-end mt-2"
                                    key={product.id}
                                  >
                                    {/* Boton que redirija a /admin/invetories/nombre-del-producto */}

                                    <Button
                                      size="sm"
                                      isIconOnly
                                      color="primary"
                                      variant="bordered"
                                      onPress={() =>
                                        navigate(`/productos/${product.slug}`)
                                      }
                                    >
                                      <FaEye />
                                    </Button>
                                    <Popover showArrow offset={10} placement="bottom">
                                      <PopoverTrigger>
                                        {product.stock_quantity > 0 ? (
                                          <Button size="sm" color="success" variant="bordered">Agregar al carrito</Button>
                                        ) : (
                                          <Button size="sm" color="danger" variant="bordered" isDisabled>Agotado</Button>
                                        )}
                                      </PopoverTrigger>
                                      <PopoverContent className="w-[240px]">
                                        <div className="px-1 py-2 w-full">
                                          <div className="mt-2 flex flex-col gap-2 w-full">
                                            <Input
                                              label="Cantidad"
                                              labelPlacement="outside"
                                              placeholder="0"
                                              defaultValue={String(quantity)}
                                              onChange={(e) => setQuantity(Number(e.target.value))}
                                              startContent={
                                                <div className="pointer-events-none flex items-center">
                                                  <span className="text-default-400 text-small">{product.unit}</span>
                                                </div>
                                              }
                                              type="number"
                                            />
                                            <Input
                                              label="Precio"
                                              labelPlacement="outside"
                                              placeholder="0"
                                              defaultValue={String(product.price)}
                                              onChange={(e) => setPrice(e.target.value)}
                                              startContent={
                                                <div className="pointer-events-none flex items-center">
                                                  <span className="text-default-400 text-small">Bs</span>
                                                </div>
                                              }
                                              type="number"
                                            />

                                            <Button size="sm" onPress={() => handleAddToCart(product.inventory_id, product.thumbnail, product.name, Number(price), subcategories.category, product.id, product.stock_quantity)} color="primary" variant="shadow">Agregar al carrito</Button>
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
      {deleteRowId != null ? (
        <AlertDelete
          handleConfirmDelete={handleConfirmDelete}
          handleCancelDelete={handleCancelDelete}
          deleteCountdown={deleteCountdown}
          message={"¿Estás seguro de querer eliminar este producto?"}
        />
      ) : (
        ""
      )}
      {/* boton flotante en la parte inferior statico */}
      <div className="fixed bottom-4 right-4 flex flex-col gap-2">
      {quantityCart > 0 && (
        <Tooltip content="Carrito" placement="left" color="warning">
          <Badge color="primary" content={quantityCart} shape="circle" showOutline={false}>
            {shop?.id && (
              <CartModal
                getCheckout={
                  (checkout: boolean) => {
                    if (checkout) {
                      handleFilter("", "");
                      handleCalculateCart();
                    }
                  }
                }
                shopId={shop?.id} 
                slug={slug}
                />
            )}
          </Badge>
        </Tooltip>
      )}
        <Tooltip content="Ventas" placement="left" color="warning">
            <Button
              color="primary"
              variant="shadow"
              radius="full"
              isIconOnly
              onPress={() => setIsSale(true)}
            >
              <FaChartLine size={20} />
            </Button>
        </Tooltip>
      </div>
    </div>
  );

}
