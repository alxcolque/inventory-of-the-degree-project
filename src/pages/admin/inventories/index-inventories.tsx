
import { useEffect, useState } from "react";
import { DynamicBreadcrumbs, DynamicTable, FormModal } from "../../../components"
import { useNavigate } from "react-router-dom";
import { Button } from "@nextui-org/react";
import { useAuthStore, useInventoriesStore } from "../../../stores";

export const IndexInventories = () => {
    const token = useAuthStore(state => state.token);

    const [selectedRowData, setSelectedRowData] = useState<Record<string, any> | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    /* Eliminando  */
    const [deleteCountdown, setDeleteCountdown] = useState<number | null>(null);
    const [deleteRowId, setDeleteRowId] = useState<number | null>(null);
    /* inventories */
    const inventories = useInventoriesStore(state => state.inventories);
    const getInventories = useInventoriesStore(state => state.getInventories);

    const navigate = useNavigate();
    const handleFetchInventories = async () => {
        if (inventories.length === 0) {
            await getInventories(token!);
        }
    }
    useEffect(() => {
        handleFetchInventories();

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
        { name: 'PRODUCTO', uid: 'productId' },
        { name: 'TIENDA', uid: 'shopId' },
        { name: 'PROVEEDOR', uid: 'supplierId' },
        { name: 'STOCK', uid: 'stock' },
        { name: 'FECHA DE REPOSICIÓN', uid: 'restockDate' },
        { name: 'ACCIONES', uid: 'actions' }
    ];
    const fields = [
        { name: 'productId', label: 'Producto', type: 'text', placeholder: 'Producto' },
        { name: 'shopId', label: 'Tienda', type: 'text', placeholder: 'Tienda' },
        { name: 'supplierId', label: 'Proveedor', type: 'text', placeholder: 'Proveedor' },
        { name: 'stock', label: 'Stock', type: 'text', placeholder: 'Stock' },
        { name: 'restockDate', label: 'Fecha de Reposición', type: 'date', placeholder: 'Fecha de Reposición' },
    ];
    const handleFormSubmit = async (formData: Record<string, any>) => {

        if (isEditing) {
            //await udpateUser(formData.id, formData.name, permissions, token!);
        } else {
            //await addUser(formData.name, permissions, token!);
        }
        setIsModalOpen(false); // Cerrar el modal
        console.log(formData)
    };
    //Define controles para abrir el modal de agregar rol
    // Función para abrir el modal con datos vacíos (creación)
    const handleNewInventoryClick = () => {
        setSelectedRowData(null);  // Limpiar los datos
        setIsEditing(false);       // No estamos editando, estamos creando
        setIsModalOpen(true);      // Abrir el modal
    };
    // Función para abrir el modal con datos de un inventario seleccionado (edición)
    const handleEditClick = (rowData: Record<string, any>) => {
        //console.log(rowData);
        setSelectedRowData(rowData);  // Cargar datos del inventario seleccionado
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
        //await deleteRole(deleteRowId!, token!); // Elimina el registro de la base de datos
        setDeleteRowId(null);
        setDeleteCountdown(null); // Resetea el temporizador
    };
    // Redirigir al hacer clic en "Ver"
    const handleViewClick = (id: number) => {
        navigate(`/admin/roles/${id}`); // Redirigir a la página con el ID del usuario
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
                <h2>Inventarios</h2>
                <DynamicTable stringSearch={''} onCreate={handleNewInventoryClick} data={inventories} columns={headers} onEdit={ handleEditClick } onDelete={handleDeleteClick} onView={handleViewClick} />
                {deleteRowId != null ? (
                    /* Una pequeña alerta fixed para eliminar con contador en la parte superior, tiene el boton cancelar la eliminacion */
                    <div className="fixed top-6 left-0 right-0 bg-red-500 text-white p-2 text-center z-50">
                        <p>¿Estás seguro de eliminar este rol?</p>
                        <Button color="danger" onPress={handleConfirmDelete}>Sí, eliminar</Button>
                        <Button color="danger" onPress={handleCancelDelete}>Cancelar</Button>
                        <p>Se eliminará en {deleteCountdown} segundos</p>
                    </div>

                ) : ('')}

            </div>
        </>
    )
}
