import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useShopsStore } from "../../../stores/shops/shops.store";
import { DynamicBreadcrumbs } from "../../../components";
import { useAuthStore } from "../../../stores";
import { Button, Select, SelectItem } from "@nextui-org/react";
import { userStore } from "../../../stores/users/users.store";
import { useAssignmentsStore } from "../../../stores/shops/assignments.store";
import { FaTimes } from "react-icons/fa";

export const ShowShops = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const token = useAuthStore(state => state.token);
    const shop = useShopsStore(state => state.shop);
    const getShop = useShopsStore(state => state.getShop);
    const users = userStore(state => state.users);
    const getUsers = userStore(state => state.getUsers);

    const getAssignments = useAssignmentsStore(state => state.getAssignments);
    const assignments = useAssignmentsStore(state => state.assignments);
    const deleteAssignment = useAssignmentsStore(state => state.deleteAssignment);
    const addAssignment = useAssignmentsStore(state => state.addAssignment);

    const handleGetUsers = () => {
        if (token) {
            getUsers(token);
        }
    }

    const handleGetShop = () => {
        if (id && token) {
            getShop(Number(id), token);
        }
    }

    useEffect(() => {
        handleGetShop();
        handleGetUsers();
        handleAssignmentUsers();
    }, []);

    /* Funcion para agregar trabajadores */
    const handleAddWorker = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const userId = form.user_id.value;
        const data = {
            user_id: userId,
            store_id: id
        }
        if (token) {
            addAssignment(data, token);
            handleAssignmentUsers();
        }
        
        
    }
    /* uses assigned */
    const handleAssignmentUsers = () => {
        if (token) {
            getAssignments(Number(id), token);
        }
    }
    /* Funcion para eliminar trabajadores */
    const handleDeleteWorker = (assignmentId: number, token: string) => {
        if (token) {
            deleteAssignment(assignmentId, Number(id), token);
        }
    }
    
    return (
        <div className="my-2 px-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-3">
            <DynamicBreadcrumbs />
            <div className="flex flex-wrap lg:flex-row md:flex-row gap-2">
                <div className="flex flex-col gap-2">

                    <div className="flex flex-wrap gap-2">
                        <h3 className="text-lg font-medium">Nombre: </h3>
                        <p>{shop?.name}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <h3 className="text-lg font-medium">Slug: </h3>
                        <p>{shop?.slug}</p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <h3 className="text-lg font-medium">Dirección: </h3>
                        <p>{shop?.address}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <h3 className="text-lg font-medium">Teléfono: </h3>
                        <p>{shop?.phone}</p>
                    </div>

                    {/* boton visitar tienda */}
                    <Button color="primary" variant="bordered" onPress={() => navigate(`/tienda/${shop?.slug}`)}>Visitar tienda</Button>
                    {/* Añadir trabajadores a la tienda */}
                    <form onSubmit={(e) => handleAddWorker(e as any)} className="flex flex-wrap gap-2">
                        <Select
                            label="Seleccionar trabajador"
                            placeholder="Seleccionar trabajador"
                            name="user_id"
                            isRequired
                        >
                            {users.map((user) => (
                                /* El admin no se muestra */
                                user.role !== "admin" ? (
                                    <SelectItem key={user.id} value={user.id}>{user.name}</SelectItem>
                                ) : null
                            ))}
                        </Select>

                        <Button color="primary" type="submit">Agregar</Button>
                    </form>

                    {/* Trabajadores de la tienda */}
                    <div className="flex flex-col gap-2">
                        <h3 className="text-lg font-medium">Trabajadores: </h3>
                        {assignments.length === 0 ? (
                            <p>No hay trabajadores asignados</p>
                        ) : (

                            assignments.map((assignment, index) => (
                                <div key={index} className="flex flex-wrap gap-2">
                                    <p>{assignment.name}</p>
                                    <Button size="sm" color="danger" onPress={() => handleDeleteWorker(assignment.id, token!)} isIconOnly startContent={<FaTimes />}></Button>
                                </div>
                            ))
                        )}

                        
                    </div>

                </div>
                <div className="flex flex-col lg:flex-col md:flex-col gap-2">
                    <div className="flex flex-col gap-2">
                        <h3 className="text-lg font-medium">Imagen de la tienda: </h3>
                        <img src={shop?.front_image} alt={shop?.name} className="w-3/4" />
                    </div>

                    <div className="flex flex-col gap-2 lg:w-1/2 md:w-full">
                        <h3 className="text-lg font-medium">Ubicación: </h3>
                        <p>{shop?.location}</p>
                        {/* Mapa de la ubicación */}
                        <iframe src={`https://maps.google.com/maps?q=${shop?.location}&z=15&output=embed`} width="100%" height="450" style={{ border: 0 }} allowFullScreen></iframe>
                    </div>
                </div>
            </div>

        </div>
    )
}
