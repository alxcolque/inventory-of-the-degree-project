import { useEffect, useState } from "react";
import { AlertDelete, DynamicBreadcrumbs, DynamicTable, FormModal } from "../../../components"
//import { users } from "../../../components/ui/table/data";
//import { useAuthStore } from "../../../stores";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../stores/auth/auth.store";
import { userStore } from "../../../stores/users/users.store";

export const IndexUsers = () => {
    const token = useAuthStore(state => state.token);
    const [selectedRowData, setSelectedRowData] = useState<Record<string, any> | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const [rows, setRows] = useState<Record<string, any>[]>([]);
    /* User data */
    const users = userStore(state => state.users);
    const getUsers = userStore(state => state.getUsers);
    /* Insert user */
    const createUser = userStore(state => state.createUser);
    /* Update user */
    const updateUser = userStore(state => state.updateUser);
    /* Delete user */
    const deleteUser = userStore(state => state.deleteUser);


    /* Eliminando  */
    const [deleteCountdown, setDeleteCountdown] = useState<number | null>(null);
    const [deleteRowId, setDeleteRowId] = useState<number | null>(null);

    const navigate = useNavigate();
    /* Get users */
    const handleGetUsers = async () => {
        await getUsers(token!);
    }


    useEffect(() => {
        handleGetUsers();

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
        { name: 'AVATAR', uid: 'avatar' },
        { name: 'NOMBRE', uid: 'name' },
        { name: 'ROL', uid: 'role' },
        { name: 'EMAIL', uid: 'email' },
        { name: 'ESTADO', uid: 'status' },
        { name: 'ACCIONES', uid: 'actions' }
    ];
    const fields = [
        { name: 'name', label: 'Nombre', type: 'text', placeholder: 'Nombre'},
        { name: 'username', label: 'Usuario', type: 'text', placeholder: 'Nombre de usuario' },
        /* { name: 'role', label: 'Rol', type: 'select', options: ['admin', 'worker'], placeholder: 'Rol' }, */
        { name: 'phone', label: 'Teléfono', type: 'text', placeholder: 'Teléfono' },
        { name: 'ci', label: 'Cédula', type: 'text', placeholder: 'Cédula' },
        { name: 'avatar', label: 'Avatar', type: 'file', placeholder: 'Avatar' },
        { name: 'email', label: 'Email', type: 'email', placeholder: 'Email' },
        { name: 'password', label: 'Contraseña', type: 'password', placeholder: 'Contraseña' },
    ];
    const handleFormSubmit = async (formData: Record<string, any>) => {

        if (isEditing) {
            await updateUser(selectedRowData?.id, formData, token!);
        } else {
            await createUser(formData as [], token!);
        }
        //setIsModalOpen(false); // Cerrar el modal
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
        setRows(rows.filter(row => row.id !== deleteRowId)); // Elimina el registro de los datos
        await deleteUser(deleteRowId!, token!); // Elimina el registro de la base de datos
        setDeleteRowId(null);
        setDeleteCountdown(null); // Resetea el temporizador
    };
    // Redirigir al hacer clic en "Ver"
    const handleViewClick = (id: number) => {
        navigate(`/admin/users/${id}`); // Redirigir a la página con el ID del usuario
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
                   <AlertDelete handleConfirmDelete={handleConfirmDelete} handleCancelDelete={handleCancelDelete} deleteCountdown={deleteCountdown} />
                ) : ('')}

            </div>
        </>
    )
}
