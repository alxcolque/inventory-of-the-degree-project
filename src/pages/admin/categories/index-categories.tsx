
import { useEffect, useState } from "react";
import { AlertDelete, DynamicBreadcrumbs, DynamicTable, FormModal } from "../../../components"
import { useNavigate } from "react-router-dom";
import { useAuthStore, useCategoriesStore } from "../../../stores";
import { ICategoryResponse } from "../../../interface";

export const IndexCategories = () => {
    const token = useAuthStore(state => state.token);

    const [selectedRowData, setSelectedRowData] = useState<Record<string, any> | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    /* Eliminando  */
    const [deleteCountdown, setDeleteCountdown] = useState<number | null>(null);
    const [deleteRowId, setDeleteRowId] = useState<number | null>(null);
    /* categories */
    const categories = useCategoriesStore(state => state.categories);
    const getCategories = useCategoriesStore(state => state.getCategories);
    const createCategory = useCategoriesStore(state => state.createCategory);
    const updateCategory = useCategoriesStore(state => state.updateCategory);
    const deleteCategory = useCategoriesStore(state => state.deleteCategory);

    const navigate = useNavigate();
    const handleFetchCategories = async () => {
        if (categories.length === 0) {
            await getCategories(token!);
        }
    }
    useEffect(() => {
        handleFetchCategories();

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
        { name: 'ICONO', uid: 'icon' },
        { name: 'NOMBRE', uid: 'name' },
        { name: 'SLUG', uid: 'slug' },
        { name: 'COLOR', uid: 'color' },
        { name: 'ACCIONES', uid: 'actions' }
    ];
    const fields = [
        { name: 'name', label: 'Nombre', type: 'text', placeholder: 'Nombre de la categoría' },
        //{ name: 'slug', label: 'Slug', type: 'text', placeholder: 'Slug de la categoría' },
        { name: 'color', label: 'Color', type: 'color', placeholder: 'Color de la categoría' },
        { name: 'icon', label: 'Icono', type: 'file', placeholder: 'Icono de la categoría' },
    ];
    const handleFormSubmit = async (formData: Record<string, any>) => {

        if (isEditing) {
            await updateCategory(formData.id, formData as ICategoryResponse, token!);
        } else {
            await createCategory(formData as ICategoryResponse, token!);
        }
        setIsModalOpen(false); // Cerrar el modal
        console.log(formData)
    };
    //Define controles para abrir el modal de agregar rol
    // Función para abrir el modal con datos vacíos (creación)
    const handleNewCategoryClick = () => {
        setSelectedRowData(null);  // Limpiar los datos
        setIsEditing(false);       // No estamos editando, estamos creando
        setIsModalOpen(true);      // Abrir el modal
    };
    // Función para abrir el modal con datos de un cliente seleccionado (edición)
    const handleEditClick = (rowData: Record<string, any>) => {
        //console.log(rowData);
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
            await deleteCategory(deleteRowId, token!);
            setDeleteRowId(null);
            setDeleteCountdown(null); // Resetea el temporizador
        }
    };
    // Redirigir al hacer clic en "Ver"
    const handleViewClick = (id: number) => {
        navigate(`/admin/categories/${id}`); // Redirigir a la página con el ID del usuario
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
                <h2>Categorías</h2>
                <DynamicTable stringSearch={'name'} onCreate={handleNewCategoryClick} data={categories} columns={headers} onEdit={ handleEditClick } onDelete={handleDeleteClick} onView={handleViewClick} />
                {deleteRowId != null ? (
                    <AlertDelete handleConfirmDelete={handleConfirmDelete} handleCancelDelete={handleCancelDelete} deleteCountdown={deleteCountdown} message={'¿Estás seguro de querer eliminar la categoría?'} />

                ) : ('')}

            </div>
        </>
    )
}
