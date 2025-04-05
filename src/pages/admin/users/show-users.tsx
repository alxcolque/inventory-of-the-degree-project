import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DynamicBreadcrumbs } from "../../../components";
import { useAuthStore } from "../../../stores";
import { userStore } from "../../../stores/users/users.store";
import { Button, Select, SelectItem } from "@nextui-org/react";
export const ShowUsers = () => {
    const { id } = useParams();
    const token = useAuthStore(state => state.token);
    /* is selected role */
    const [selectedRole, setSelectedRole] = useState<string>("");
    const [selectedStatus, setSelectedStatus] = useState<string>("");
    const user = userStore(state => state.user);
    const getUser = userStore(state => state.getUser);
    const updateRole = userStore(state => state.updateRole);

    const handleGetUser = () => {
        if (id && token) {
            getUser(Number(id), token);
        }
    }

    useEffect(() => {
        handleGetUser();
    }, []);

    const handleChangeRole = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = {
            role: selectedRole,
            status: selectedStatus
        }


        if (selectedRole && id && token) {
            updateRole(Number(id), data, token);
        }
        setSelectedRole("");
        setSelectedStatus("");
    }

    return (
        <div className="my-2 px-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
            <DynamicBreadcrumbs />
            <div className="flex flex-col">

                <div className="flex flex-wrap gap-2">
                    <h3 className="text-lg font-medium">Nombre: </h3>
                    <p>{user?.name}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                    <h3 className="text-lg font-medium">Usuario: </h3>
                    <p>{user?.username}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                    <h3 className="text-lg font-medium">Email: </h3>
                    <p>{user?.email}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                    <h3 className="text-lg font-medium">Teléfono: </h3>
                    <p>{user?.phone}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                    <h3 className="text-lg font-medium">Cédula: </h3>
                    <p>{user?.ci}</p>
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="text-lg font-medium">Avatar: </h3>
                    <img src={user?.avatar ? `${user?.avatar}` : `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 100)}.jpg`} alt={user?.name} className="w-1/2" />
                </div>
                {/* Cambiar rol */}
                <div className="flex flex-wrap gap-2">
                    <h3 className="text-lg font-medium">Rol: </h3>
                    <p>{user?.role}</p>
                </div>
                {/* Formulario para cambiar rol */}
                <form onSubmit={handleChangeRole} className="flex flex-col gap-2">
                    <Select
                        className="max-w-xs"
                        label="Rol"
                        placeholder="Selecciona un rol"
                    >
                        <SelectItem key="admin" onPress={() => setSelectedRole("admin")}>Admin</SelectItem>
                        <SelectItem key="worker" onPress={() => setSelectedRole("worker")}>Trabajador</SelectItem>
                        <SelectItem key="user" onPress={() => setSelectedRole("user")}>Usuario</SelectItem>

                    </Select>
                    {/* select Status */}
                    <Select
                        className="max-w-xs"
                        label="Estado"
                        placeholder="Selecciona un estado"
                    >
                        <SelectItem key="activo" onPress={() => setSelectedStatus("activo")}>Activo</SelectItem>
                        <SelectItem key="inactivo" onPress={() => setSelectedStatus("inactivo")}>Inactivo</SelectItem>
                    </Select>
                    {/* SI existe un rol seleccionado */}
                    {selectedRole && selectedStatus && (
                        <Button className="w-fit" color="primary" variant="solid" type="submit">Cambiar rol</Button>
                    )}
                </form>
            </div>

        </div>
    )
}
