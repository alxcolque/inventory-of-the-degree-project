import { useEffect, useState } from "react";
import { DynamicBreadcrumbs, DynamicTable, FormModal } from "../../../components"
import { users } from "../../../components/ui/table/data";
//import { useAuthStore } from "../../../stores";
import { useNavigate } from "react-router-dom";
import { Button } from "@nextui-org/react";

export const IndexUsers = () => {
    //const token = useAuthStore(state => state.token);

    const [selectedRowData, setSelectedRowData] = useState<Record<string, any> | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    /* Eliminando  */
    const [deleteCountdown, setDeleteCountdown] = useState<number | null>(null);
    const [deleteRowId, setDeleteRowId] = useState<number | null>(null);

    const navigate = useNavigate();
    const handleFetchRoles = async () => {
        if (users.length === 0) {
            //await getUsers(token!);
        }
    }
    useEffect(() => {
        handleFetchRoles();

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
        { name: 'ROL', uid: 'role' },
        { name: 'TEAM', uid: 'team' },
        { name: 'EMAIL', uid: 'email' },
        { name: 'ESTADO', uid: 'status' },
        { name: 'ACCIONES', uid: 'actions' }
    ];
    const fields = [
        { name: 'name', label: 'Name', type: 'text', placeholder: 'Enter your name', defaultValue: 'John Doe' },
        { name: 'role', label: 'Role', type: 'select', options: ['admin', 'aser'], placeholder: 'Select your role' },
        { name: 'team', label: 'Team', type: 'select', options: ['Marketing', 'Sales', 'Development', 'Support'], placeholder: 'Select your team' },
        { name: 'status', label: 'Status', type: 'select', options: ['active', 'inactive'], placeholder: 'Select your status' },
        { name: 'email', label: 'Email', type: 'email', placeholder: 'Enter your email' },
        { name: 'age', label: 'Age', type: 'number', placeholder: 'Enter your age' },
        { name: 'avatar', label: 'Avatar', type: 'file', placeholder: 'Enter your avatar' },
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
    const handleNewClientClick = () => {
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
                <h2>Usuarios</h2>
                <DynamicTable stringSearch={'name'} onCreate={handleNewClientClick} data={users} columns={headers} onEdit={ handleEditClick } onDelete={handleDeleteClick} onView={handleViewClick} />
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
