
import { useEffect, useState } from "react";
import { AlertDelete, DynamicBreadcrumbs, DynamicTable, FormModal } from "../../../components"
import { useNavigate } from "react-router-dom";
import { useAuthStore, useCategoriesStore } from "../../../stores";
import { useSubcategoriesStore } from "../../../stores/subcategories/subcategories.store";
import { ISubcategoriesResponse } from "../../../interface";
import { Spinner } from "@nextui-org/react";


export const IndexSubcategories = () => {
    const token = useAuthStore(state => state.token);

    const [selectedRowData, setSelectedRowData] = useState<Record<string, any> | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    /* isLoading */
    const [isLoadingCategories, setIsLoadingCategories] = useState<boolean>(false);

    /* Eliminando  */
    const [deleteCountdown, setDeleteCountdown] = useState<number | null>(null);
    const [deleteRowId, setDeleteRowId] = useState<number | null>(null);
    /* categories */
    const subcategories = useSubcategoriesStore(state => state.subcategories);
    const getSubcategories = useSubcategoriesStore(state => state.getSubcategories);
    const createSubcategory = useSubcategoriesStore(state => state.createSubcategory);
    const updateSubcategory = useSubcategoriesStore(state => state.updateSubcategory);
    const deleteSubcategory = useSubcategoriesStore(state => state.deleteSubcategory);
    const categories = useCategoriesStore(state => state.categories);
    const getCategories = useCategoriesStore(state => state.getCategories);
    const [categoriesOptions, setCategoriesOptions] = useState<any[]>([]);

    const navigate = useNavigate();
    /* Fetching data categories */
    const handleFetchCategories = async () => {
        if (categories.length === 0) {
            await getCategories(token!);
        }
        setCategoriesOptions(categories.map(category => ({ label: category.name, value: category.id })));
        //console.log(categoriesOptions);
    }
    const handleFetchSubcategories = async () => {
        if (subcategories.length === 0) {
            await getSubcategories(token!);
        }
    }

    useEffect(() => {
        handleFetchSubcategories();
        setIsLoadingCategories(true);
        handleFetchCategories();
        setIsLoadingCategories(false);

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
        { name: 'NOMBRE', uid: 'name' },
        { name: 'SLUG', uid: 'slug' },
        { name: 'CATEGORÍA', uid: 'category' },
        { name: 'ACCIONES', uid: 'actions-ed' }
    ];
    const fields = [
        { name: 'name', label: 'Nombre', type: 'text', placeholder: 'Nombre de la categoría' },
        { 
            name: 'category_id', 
            label: 'Categoría', 
            type: 'select', 
            placeholder: 'Selecciona una categoría', 
            options: isLoadingCategories ? [] : categoriesOptions
        },
        
    ];
    const handleFormSubmit = async (formData: Record<string, any>) => {

        if (isEditing) {
            await updateSubcategory(formData.id, formData as ISubcategoriesResponse, token!);
        } else {
            await createSubcategory(formData as [], token!);
        }
        setIsModalOpen(false); // Cerrar el modal
        //console.log(formData)
    };
    //Define controles para abrir el modal de agregar rol
    // Función para abrir el modal con datos vacíos (creación)
    const handleNewSubcategoryClick = () => {
        setIsLoadingCategories(true);
        handleFetchCategories();
        setIsLoadingCategories(false);
        setSelectedRowData(null);  // Limpiar los datos
        setIsEditing(false);       // No estamos editando, estamos creando
        setIsModalOpen(true);      // Abrir el modal
    };
    // Función para abrir el modal con datos de un cliente seleccionado (edición)
    const handleEditClick = (rowData: Record<string, any>) => {
        //console.log(rowData);
        setIsLoadingCategories(true);
        handleFetchCategories();
        setIsLoadingCategories(false);
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
            await deleteSubcategory(deleteRowId, token!);
            setDeleteRowId(null);
            setDeleteCountdown(null); // Resetea el temporizador
        }
    };
    // Redirigir al hacer clic en "Ver"
    const handleViewClick = (id: number) => {
        navigate(`/admin/subcategories/${id}`); // Redirigir a la página con el ID del usuario
    };
    return (
        <>
            {isLoadingCategories ? (
                <div className="flex justify-center items-center h-screen">
                    <Spinner />
                </div>
            ) : (
                <>
            <FormModal
                fields={fields}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleFormSubmit}
                initialValues={selectedRowData || {}}  // Pasar los valores seleccionados o vacío si es nuevo
            />
            </>
            )}
            <div className="my-2 px-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
                <DynamicBreadcrumbs />
                <h2>Subcategorías</h2>
                <DynamicTable stringSearch={'name'} onCreate={handleNewSubcategoryClick} data={subcategories} columns={headers} onEdit={ handleEditClick } onDelete={handleDeleteClick} onView={handleViewClick} />
                {deleteRowId != null ? (
                    <AlertDelete
                        handleConfirmDelete={handleConfirmDelete}
                        handleCancelDelete={handleCancelDelete}
                        deleteCountdown={deleteCountdown}
                        message={'¿Estás seguro de querer eliminar la subcategoría?'}
                    />
                ) : ('')}

            </div>
        </>
    )
}
