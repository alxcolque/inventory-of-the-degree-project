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
  Checkbox,
  Popover,
  PopoverTrigger,
  PopoverContent,
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
import { IProduct } from "../../../interface/inventories/warehouse/list-warehouse-response";
import { ModalBrands } from "../../../components/modal/modal-brands";
import { AlertDelete } from "../../../components";

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
      getWarehouseProducts("", token!);
      setIsLoading(false);
    }
    handleCategories();
  }, [token]);

  //console.log(warehouseProducts);

  /* Funcion para obtener las marcas */
  const selectBrands = () => {
    console.log("getBrands");
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
    if (type === "brands") {
      navigate("/admin/inventories?brands=" + slug);
      setIsLoading(true);
      await getWarehouseProducts(slug, token!);
      setIsLoading(false);
    } else if (type === "categories") {
      navigate("/admin/inventories?categories=" + slug);
      setIsLoading(true);
      await getWarehouseProducts(slug, token!);
      setIsLoading(false);
    } else {
      navigate("/admin/inventories");
      setIsLoading(true);
      await getWarehouseProducts("", token!);
      setIsLoading(false);
    }
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
            onClick={() => navigate("/admin/inventories/input")}
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
        <div className="flex flex-wrap gap-2 items-center">
          {/* busqueda */}
          <div className="flex flex-row gap-2 items-center">
            <Input type="text" placeholder="Buscar producto" />
            <Button color="primary" variant="shadow">
              Buscar
            </Button>
          </div>
          {/* Boton de marca */}
          <Button
            color="primary"
            variant="shadow"
            onClick={() => setIsModalBrandsOpen(true)}
          >
            Marca
          </Button>
          {/* date picker */}

          {/* FEcha actual */}
          {/* <div className="flex flex-row gap-2 items-center">

            <DatePicker
                onChange={handleChangeDate}
                value={date}
            />
        </div> */}
        </div>

        {/* Botones horizontales para listar categorias para filtro, scroll horizontal */}
        <div className="flex overflow-x-auto gap-2 scrollbar-hide">
          <Button
            size="sm"
            onClick={() => {
              navigate("/admin/inventories");
            }}
          >
            Todos
          </Button>
          {categories.map((category: any) => (
            <Button
              key={category.id}
              size="sm"
              style={{ backgroundColor: category.color }}
              onClick={() => {
                handleFilter("categories", category.slug);
              }}
            >
              {category.name}
            </Button>
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
                {subcategories.products.map((product: any) => (
                  <Card
                    key={product.id}
                    isBlurred
                    className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px]"
                    shadow="sm"
                  >
                    <CardBody>
                      <div className="grid grid-cols-6 gap-6 justify-center items-center md:grid-cols-12 md:gap-4">
                        <div className="relative col-span-6 md:col-span-4">
                          <Image
                            alt="Album cover"
                            className="object-cover"
                            shadow="md"
                            src={product.thumbnail}
                            width={100}
                            height={100}
                          />
                        </div>

                        <div className="flex flex-col col-span-6 md:col-span-8">
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
                              onClick={() =>
                                navigate(`/admin/inventories/${product.slug}`)
                              }
                            >
                              <FaEye />
                            </Button>
                            <Button
                              size="sm"
                              color="success"
                              variant="bordered"
                              onClick={() => handleOpenFormOutput(product)}
                            >
                              Salida
                            </Button>
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
          message={"¿Estás seguro de querer eliminar el cliente?"}
        />
      ) : (
        ""
      )}
    </>
  );
};
