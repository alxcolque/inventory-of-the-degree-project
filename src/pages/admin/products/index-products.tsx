
import { useEffect, useState } from "react";
import { AlertDelete, DynamicBreadcrumbs, DynamicTable, FormModal } from "../../../components"
import { useNavigate } from "react-router-dom";
import { useAuthStore, useBrandsStore, useProductsStore, useSubcategoriesStore } from "../../../stores";
import { IProductResponse } from "../../../interface";
import { Spinner } from "@nextui-org/react";

export const IndexProducts = () => {
    const token = useAuthStore(state => state.token);

    const [selectedRowData, setSelectedRowData] = useState<Record<string, any> | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isLoadingSubcategories, setIsLoadingSubcategories] = useState<boolean>(false);
    const [isLoadingBrands, setIsLoadingBrands] = useState<boolean>(false);

    /* Eliminando  */
    const [deleteCountdown, setDeleteCountdown] = useState<number | null>(null);
    const [deleteRowId, setDeleteRowId] = useState<number | null>(null);
    /* products */
    const products = useProductsStore(state => state.products);
    const getProducts = useProductsStore(state => state.getProducts);
    const createProduct = useProductsStore(state => state.createProduct);
    const updateProduct = useProductsStore(state => state.updateProduct);
    const deleteProduct = useProductsStore(state => state.deleteProduct);
    /* Subcategories */
    const subcategories = useSubcategoriesStore(state => state.subcategories);
    const getSubcategories = useSubcategoriesStore(state => state.getSubcategories);
    /* Brands */
    const brands = useBrandsStore(state => state.brands);
    const getBrands = useBrandsStore(state => state.getBrands);

    const [optionsSubcategories, setOptionsSubcategories] = useState<any[]>([]);
    const [optionsBrands, setOptionsBrands] = useState<any[]>([]);

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




    const navigate = useNavigate();
    const handleFetchProducts = async () => {
        if (products.length === 0) {
            await getProducts(token!);
        }
    }
    useEffect(() => {
        handleFetchProducts();
        handleGetSubcategories();
        handleGetBrands();


        if (deleteCountdown !== null && deleteCountdown > 0) {
            const timer = setTimeout(() => {
                setDeleteCountdown(deleteCountdown - 1);
            }, 1000);
            return () => clearTimeout(timer); // Limpia el temporizador
        } else if (deleteCountdown === 0) {
            handleConfirmDelete(); // Elimina permanentemente cuando llega a 0
        }
    }, [deleteCountdown]);

    const headers = [
        { name: 'IMAGEN', uid: 'thumbnail' },
        { name: 'NOMBRE', uid: 'name' },
        { name: 'SLUG', uid: 'slug' },
        { name: 'CATEGORIA', uid: 'category' },
        { name: 'SUBCATEGORIA', uid: 'subcategory' },
        { name: 'MARCA', uid: 'brand' },
        { name: 'ACCIONES', uid: 'actions-sd' }
    ];
    const fields = [
        {
            name: 'subcategory_id',
            label: 'Subcategoría',
            type: 'select',
            placeholder: 'Selecciona una subcategoría',
            options: optionsSubcategories
        },
        {
            name: 'brand_id',
            label: 'Marca',
            type: 'select',
            placeholder: 'Selecciona una marca',
            options: optionsBrands
        },
        { name: 'name', label: 'Nombre', type: 'text', placeholder: 'Nombre de la categoría' },
        { name: 'description', label: 'Descripción', type: 'textarea', placeholder: 'Descripción de la categoría' },
        { name: 'thumbnail', label: 'Imagen', type: 'file', placeholder: 'Imagen de la categoría' },
    ];
    const handleFormSubmit = async (formData: Record<string, any>) => {

        if (isEditing) {
            await updateProduct(formData.id, formData as IProductResponse, token!);
        } else {
            await createProduct(formData as IProductResponse, token!);
        }
        setIsModalOpen(false); // Cerrar el modal
        //console.log(formData)
    };
    //Define controles para abrir el modal de agregar rol
    // Función para abrir el modal con datos vacíos (creación)
    const handleNewCategoryClick = () => {
        setIsLoadingSubcategories(true);
        handleGetSubcategories();
        setIsLoadingSubcategories(false);
        setIsLoadingBrands(true);
        handleGetBrands();
        setIsLoadingBrands(false);
        setSelectedRowData(null);  // Limpiar los datos
        setIsEditing(false);       // No estamos editando, estamos creando

        setIsModalOpen(true);      // Abrir el modal

    };
    // Función para abrir el modal con datos de un cliente seleccionado (edición)
    const handleEditClick = (rowData: Record<string, any>) => {
        //console.log(rowData);
        setIsLoadingSubcategories(true);
        handleGetSubcategories();
        setIsLoadingSubcategories(false);
        setIsLoadingBrands(true);
        handleGetBrands();
        setIsLoadingBrands(false);
        setSelectedRowData(rowData);  // Cargar datos del cliente seleccionado
        setIsEditing(true);           // Estamos en modo edición
        setIsModalOpen(true);         // Abrir el modal

    };
    /* Eliminando  */
    // Función para iniciar el contador de eliminación
    const handleDeleteClick = (id: number) => {
        //console.log(id);
        setDeleteRowId(id);
        setDeleteCountdown(10); // Inicia el temporizador de 10 segundos
    };

    // Función para cancelar la eliminación
    const handleCancelDelete = () => {
        setDeleteRowId(null);
        setDeleteCountdown(null); // Resetea el temporizador
    };

    // Función para realizar la eliminación definitiva
    const handleConfirmDelete = async () => {
        //setRows(rows.filter(row => row.id !== deleteRowId)); // Elimina el registro de los datos
        if (deleteRowId) {
            await deleteProduct(deleteRowId, token!);
        }
        setDeleteRowId(null);
        setDeleteCountdown(null); // Resetea el temporizador
    };
    // Redirigir al hacer clic en "Ver"
    const handleViewClick = (id: number) => {
        navigate(`/admin/products/${id}`); // Redirigir a la página con el ID del usuario
    };
    return (
        <>
            <FormModal
                fields={fields}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleFormSubmit}
                initialValues={selectedRowData || {}}  // Pasar los valores seleccionados o vacío si es nuevo
            />
            <div className="my-2 px-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
                <DynamicBreadcrumbs />
                <h2>Productos</h2>
                {isLoadingSubcategories || isLoadingBrands ? <Spinner /> :
                    <DynamicTable stringSearch={'name'} onCreate={handleNewCategoryClick} data={products} columns={headers} onEdit={handleEditClick} onDelete={handleDeleteClick} onView={handleViewClick} />
                }
                {deleteRowId != null ? (
                    /* Una pequeña alerta fixed para eliminar con contador en la parte superior, tiene el boton cancelar la eliminacion */
                    <AlertDelete handleConfirmDelete={handleConfirmDelete} handleCancelDelete={handleCancelDelete} deleteCountdown={deleteCountdown} message={'¿Estás seguro de querer eliminar el producto?'} />

                ) : ('')}

            </div>
        </>
    )
}
