import { useEffect, useState } from "react";
import { DynamicBreadcrumbs, DynamicTable, FormModal } from "../../../components"
import { useNavigate } from "react-router-dom";
import { Button } from "@nextui-org/react";
import { useAuthStore } from "../../../stores";
import { useShopsStore } from "../../../stores/shops/shops.store";

export const IndexShops = () => {
    const token = useAuthStore(state => state.token);

    const [selectedRowData, setSelectedRowData] = useState<Record<string, any> | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const [rows, setRows] = useState<Record<string, any>[]>([]);
    /* Eliminando  */
    const [deleteCountdown, setDeleteCountdown] = useState<number | null>(null);
    const [deleteRowId, setDeleteRowId] = useState<number | null>(null);
    /* shops */
    const shops = useShopsStore(state => state.shops);
    const getShops = useShopsStore(state => state.getShops);
    const addShop = useShopsStore(state => state.addShop);
    const deleteShop = useShopsStore(state => state.deleteShop);
    const updateShop = useShopsStore(state => state.updateShop);

    const navigate = useNavigate();
    const handleFetchShops = async () => {
        if (shops.length === 0) {
            await getShops(token!);
        }
    }
    useEffect(() => {
        handleFetchShops();

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
        { name: 'IMAGEN', uid: 'front_image' },
        { name: 'NOMBRE', uid: 'name' },
        { name: 'LOCALIZACION', uid: 'location' },
        { name: 'DIRECCION', uid: 'address' },
        { name: 'TELEFONO', uid: 'phone' },
        { name: 'ACCIONES', uid: 'actions' }
    ];
    const fields = [
        { name: 'name', label: 'Nombre', type: 'text', placeholder: 'Nombre de la tienda' },
        { name: 'location', label: 'Localización', type: 'text', placeholder: 'Localización de la tienda latitud, longitud' },
        { name: 'address', label: 'Dirección', type: 'text', placeholder: 'Dirección de la tienda' },
        { name: 'phone', label: 'Teléfono', type: 'text', placeholder: 'Teléfono de la tienda' },
        { name: 'front_image', label: 'Imagen', type: 'file', placeholder: 'Imagen de la tienda' },
    ];
    const handleFormSubmit = async (formData: Record<string, any>) => {
        if (isEditing) {
            await updateShop(formData as [], selectedRowData?.id, token!);
        } else {
            await addShop(formData as [], token!);
        }
        setIsModalOpen(false); // Cerrar el modal
        //console.log(formData)
    };
    //Define controles para abrir el modal de agregar rol
    // Función para abrir el modal con datos vacíos (creación)
    const handleNewShopClick = () => {
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
        setRows(rows.filter(row => row.id !== deleteRowId)); // Elimina el registro de los datos
        await deleteShop(deleteRowId!, token!); // Elimina el registro de la base de datos
        setDeleteRowId(null);
        setDeleteCountdown(null); // Resetea el temporizador
    };
    // Redirigir al hacer clic en "Ver"
    const handleViewClick = (id: number) => {
        navigate(`/admin/stores/${id}`); // Redirigir a la página con el ID de la tienda
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
                <h2>Tiendas</h2>
                <DynamicTable stringSearch={'name'} onCreate={handleNewShopClick} data={shops} columns={headers} onEdit={ handleEditClick } onDelete={handleDeleteClick} onView={handleViewClick} />
                {deleteRowId != null ? (
                    /* Una pequeña alerta fixed para eliminar con contador en la parte superior, tiene el boton cancelar la eliminacion */
                    <div className="fixed right-0 left-0 top-6 z-50 gap-2 p-2 text-center text-white bg-red-500">
                        <p>¿Estás seguro de eliminar esta tienda?</p>
                        <div className="flex gap-2 justify-center">
                            <Button color="danger" onPress={handleConfirmDelete}>Sí, eliminar</Button>
                            <Button color="primary" onPress={handleCancelDelete}>Cancelar</Button>
                        </div>
                        <p>Se eliminará en {deleteCountdown} segundos</p>
                    </div>

                ) : ('')}

            </div>
        </>
    )
}
