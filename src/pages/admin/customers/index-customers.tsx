
import { useEffect, useState } from "react";
import { AlertDelete, DynamicBreadcrumbs, DynamicTable, FormModal } from "../../../components"
import { useNavigate } from "react-router-dom";
import { useAuthStore,  useCustomerStore } from "../../../stores";
import { ICustomersResponse } from "../../../interface/customer/customers-response";

export const IndexCustomers = () => {
    const token = useAuthStore(state => state.token);

    const [selectedRowData, setSelectedRowData] = useState<Record<string, any> | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    /* Eliminando  */
    const [deleteCountdown, setDeleteCountdown] = useState<number | null>(null);
    const [deleteRowId, setDeleteRowId] = useState<number | null>(null);
    /* customers */
    const customers = useCustomerStore(state => state.customers);
    const getCustomers = useCustomerStore(state => state.getCustomers);
    const createCustomer = useCustomerStore(state => state.createCustomer);
    const updateCustomer = useCustomerStore(state => state.updateCustomer);
    const deleteCustomer = useCustomerStore(state => state.deleteCustomer);

    const navigate = useNavigate();
    const handleFetchCustomers = async () => {
        if (customers.length === 0) {
            await getCustomers(token!);
        }
    }
    useEffect(() => {
        handleFetchCustomers();

        if (deleteCountdown !== null && deleteCountdown > 0) {
            const timer = setTimeout(() => {
                setDeleteCountdown(deleteCountdown - 1);
            }, 1000);
            return () => clearTimeout(timer); // Limpia el temporizador
        } else if (deleteCountdown === 0) {
            handleConfirmDelete(); // Elimina permanentemente cuando llega a 0
        }
    }, [deleteCountdown]);
    
    console.log(customers);
    

    const headers = [
        { name: 'ID', uid: 'id' },
        { name: 'NOMBRE', uid: 'name' },
        { name: 'CI', uid: 'cinit' },
        { name: 'EMAIL', uid: 'email' },
        { name: 'TELEFONO', uid: 'phone' },
        { name: 'DIECCION', uid: 'address' },
        { name: 'ACCIONES', uid: 'actions' }
    ];
    const fields = [
        { name: 'name', label: 'Nombre', type: 'text', placeholder: 'Nombre del cliente' },
        { name: 'cinit', label: 'CI', type: 'text', placeholder: 'Carnet de Identidad' },
        { name: 'email', label: 'Email', type: 'email', placeholder: 'Correo electronico del cliente' },
        { name: 'phone', label: 'Telefono', type: 'text', placeholder: 'Telefono del Cliente' },
        { name: 'address', label: 'Direccion', type: 'text', placeholder: 'Direccion  del Cliente' },
    ];
    const handleFormSubmit = async (formData: Record<string, any>) => {

        if (isEditing) {
            await updateCustomer(selectedRowData?.id!, formData as [], token!);
        } else {
            await createCustomer(formData as ICustomersResponse, token!);
        }
        setIsModalOpen(false); // Cerrar el modal
        //console.log(formData)
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
        //await deleteRole(deleteRowId!, token!); // Elimina el registro de la base de datos
        if (deleteRowId) {
            await deleteCustomer(deleteRowId, token!);
            setDeleteRowId(null);
            setDeleteCountdown(null); // Resetea el temporizador
        }
    };
    // Redirigir al hacer clic en "Ver"
    const handleViewClick = (id: number) => {
        navigate(`/admin/customers/${id}`); // Redirigir a la página con el ID del usuario
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
                <h2>Clientes</h2>
                <DynamicTable stringSearch={'name'} onCreate={handleNewCategoryClick} data={customers} columns={headers} onEdit={ handleEditClick } onDelete={handleDeleteClick} onView={handleViewClick} />
                {deleteRowId != null ? (
                    <AlertDelete handleConfirmDelete={handleConfirmDelete} handleCancelDelete={handleCancelDelete} deleteCountdown={deleteCountdown} message={'¿Estás seguro de querer eliminar el cliente?'} />

                ) : ('')}

            </div>
        </>
    )
}
