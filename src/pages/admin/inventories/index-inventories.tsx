import {
  Button,
  Card,
  CardBody,
  Chip,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  Image,
  Input,
  DropdownItem,
  Spinner,
  Badge,
} from "@nextui-org/react";
import { DynamicBreadcrumbs } from "../../../components/ui/dynamic-breadcrumbs";
import {
  useAuthStore,
  useCategoriesStore,
  useWarehouseStore,
} from "../../../stores";
import { useEffect, useState } from "react";
import { FaEye, FaPencil, FaPlus, FaTrash } from "react-icons/fa6";
import { RiMoreFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { OutputForm } from "./output-form";
import { ModalBrands } from "../../../components/modal/modal-brands";
import { AlertDelete } from "../../../components";
import { ModalAddStock } from "./modal-add-stock";
import { IoMdSearch } from "react-icons/io";

export const IndexInventories = () => {
  const navigate = useNavigate();
  const token = useAuthStore((state) => state.token);
  if (!token) {
    navigate("/login");
  }
  const [isLoading, setIsLoading] = useState(false);
  const categories = useCategoriesStore((state) => state.categories);
  const getCategories = useCategoriesStore((state) => state.getCategories);
  const deleteProduct = useWarehouseStore(
    (state) => state.deleteWarehouseProduct
  );
  const [deleteRowId, setDeleteRowId] = useState<number | null>(null);
  const [deleteCountdown, setDeleteCountdown] = useState<number | null>(null);
  const warehouseProducts = useWarehouseStore(
    (state) => state.warehouseProducts
  );
  const getWarehouseProducts = useWarehouseStore(
    (state) => state.getWarehouseProducts
  );
  const [isModalBrandsOpen, setIsModalBrandsOpen] = useState(false);
  /* const [date, setDate] = useState<DateValue | null>();
    const handleChangeDate = (date: DateValue | null) => {
        setDate(date);
    } */
  /* Estado para seleccionar todos los productos */

  /* modal para registrar salida de productos */
  const [isOpen, setIsOpen] = useState(false);
  const [product, setProduct] = useState([] as any);
  /* modal para agregar stock */
  const [openModalAddStock, setOpenModalAddStock] = useState(false);


  const handleOpenFormOutput = (product: []) => {
    setProduct(product);
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
    getWarehouseProducts("", token!);
  };
  /* Fetch Categories */
  const handleCategories = () => {
    setIsLoading(true);
    getCategories(token!);
    setIsLoading(false);
  };

  useEffect(() => {
    if (token) {
      setIsLoading(true);
      handleFilter("", "");
      setIsLoading(false);
    }
    handleCategories();
  }, [token]);

  //console.log(warehouseProducts);

  /* Funcion para obtener las marcas */
  const selectBrands = (brand: string) => {
    if (brand) {
      handleFilter("brands", brand);
    }
  };
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
      await deleteProduct(deleteRowId, token!);
      setDeleteRowId(null);
      setDeleteCountdown(null); // Resetea el temporizador
    }
  };
  // Función para cancelar la eliminación
  const handleCancelDelete = () => {
    setDeleteRowId(null);
    setDeleteCountdown(null); // Resetea el temporizador
  };
  /* Filter */
  const handleFilter = async (type: string, slug: string) => {
    let params = {
      search: "",
      brands: "",
      categories: ""
    };
    if (type === "brands") {
      navigate("/admin/inventories?brands=" + slug);
      setIsLoading(true);
      params.brands = slug;
      await getWarehouseProducts(params, token!);
      setIsLoading(false);
    } else if (type === "categories") {
      navigate("/admin/inventories?categories=" + slug);
      setIsLoading(true);
      params.categories = slug;
      await getWarehouseProducts(params, token!);
      setIsLoading(false);
    } else if (type === "search") {
      navigate("/admin/inventories?search=" + slug);
      setIsLoading(true);
      params.search = slug;
      await getWarehouseProducts(params, token!);
      setIsLoading(false);
    } else {
      navigate("/admin/inventories");
      setIsLoading(true);
      await getWarehouseProducts({ search: "", brands: "", categories: "" }, token!);
      setIsLoading(false);
    }
  };

  const handleOpenModalAddStock = (product: any) => {
    setProduct(product);
    setOpenModalAddStock(true);
  };

  const handleCloseModalAddStock = () => {
    setOpenModalAddStock(false);
    handleFilter("", "");
  };

  const handleSearch = (search: string) => {
    handleFilter("search", search);
  };

  return (
    <>
      <div className="my-2 px-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
        <DynamicBreadcrumbs />
        <div className="flex flex-row justify-between items-center">
          <h2>Inventario de almacén</h2>
          <Button
            color="primary"
            startContent={<FaPlus />}
            variant="shadow"
            onPress={() => navigate("/admin/inventories/input")}
          >
            Registrar Entrada
          </Button>
        </div>
        {/* Modal para brands */}
        <ModalBrands
          isOpen={isModalBrandsOpen}
          onClose={() => {
            setIsModalBrandsOpen(false);
          }}
          selectBrands={selectBrands}
        />
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
              navigate("/admin/inventories");
              handleFilter("", "");
            }}
          >
            Todos
          </Button>
          {categories.map((category: any) => (

            <Badge key={category.id} size="sm" color="danger" content={category.product_count} shape="circle">
              <Button
                key={category.id}
                size="sm"
                style={{ backgroundColor: category.color }}
                onPress={() => {
                  handleFilter("categories", category.slug);
                }}
              >
                {category.name}
              </Button>
            </Badge>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-2 items-center">
            <h5 className="font-bold text-md">TODOS LOS PRODUCTOS</h5>
          </div>
          {isLoading && <Spinner />}
          {warehouseProducts.map((subcategories: any, index: number) => (
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
                    <CardBody key={index}>
                      <div className="grid grid-cols-12 gap-2 justify-center items-center md:grid-cols-12 md:gap-4">
                        <div className="relative col-span-4 cursor-pointer md:col-span-4 sm:col-span-4">
                          <Image
                            onClick={() => navigate(`/admin/inventories/${product.slug}`)}
                            className="object-cover"
                            shadow="md"
                            src={product.thumbnail}
                            width={100}
                            height={100}
                            alt={product.name}

                          />
                        </div>

                        <div className="flex flex-col col-span-8 md:col-span-8 sm:col-span-8">
                          <div className="flex justify-between items-start">
                            <div className="flex flex-col gap-0 w-full">
                              <div className="flex flex-row justify-between items-center">
                                <h3 className="font-medium text-large">
                                  {product.name}
                                </h3>

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
                                        handleOpenModalAddStock(product)
                                      }
                                    >
                                      Agregar Stock
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
                              </div>
                              <div className="flex flex-row gap-2">
                                <Chip
                                  className="font-small"
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
                                navigate(`/admin/inventories/${product.slug}`)
                              }
                            >
                              <FaEye />
                            </Button>
                            {product.stock_quantity > 0 ? (
                              <Button
                                size="sm"
                                color="success"
                                variant="bordered"
                                onPress={() => handleOpenFormOutput(product)}
                              >
                                Salida
                              </Button>
                            ) : (
                              <Button
                                size="sm"
                                color="danger"
                                variant="bordered"
                              >
                                No disponible
                              </Button>
                            )
                            }
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
      </div>
      <OutputForm
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onClose={() => handleClose()}
        product={product}
      />
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
      <ModalAddStock
        open={openModalAddStock}
        onClose={() => handleCloseModalAddStock()}
        data={product}
        change={(value: boolean) => setOpenModalAddStock(value)}
        token={token!}
      />
    </>
  );
};
