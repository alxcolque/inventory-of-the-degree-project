

import { Button } from "@nextui-org/react";
import { DynamicBreadcrumbs } from "../../../components/ui/dynamic-breadcrumbs";
import { useAuthStore } from "../../../stores";

export const IndexInventories = () => {
    const token = useAuthStore(state => state.token);
    console.log(token);


    return (
        <>
            <div className="my-2 px-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
                <DynamicBreadcrumbs />
                <h2>Inventario de almacén</h2>
                {/* boton para registrar stock */}
                <Button color="primary" variant="shadow">Registrar Stock</Button>
                {/* Botones horizontales para listar categorias para filtro, scroll horizontal */}
                <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                    <Button>Todos</Button>

                    <Button>Electrónicos</Button>
                    <Button>Ropa</Button>
                    <Button>Accesorios</Button>
                    <Button>Otros</Button>

                </div>
                {/* Tabla de stock con sus subcategorias */}
                <div className="flex flex-col gap-2">
                    <h5 className="text-center text-md font-semibold">Celulares</h5>
                    {/* Tabla de stock de celulares */}
                    <div className="table-responsive">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Código</th>
                                    <th>Imagen</th>
                                    <th>Nombre</th>
                                    <th>Stock</th>
                                    <th>Precio Unitario</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>
                                        <img src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png" alt="imagen" />
                                    </td>
                                    <td>Celular Samsung Galaxy S20</td>
                                    <td>10</td>
                                    <td>1000</td>
                                    <td>
                                        <Button>Editar</Button>
                                        <Button>Eliminar</Button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>
                                        <img src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png" alt="imagen" />
                                    </td>
                                    <td>Celular Samsung Galaxy S22</td>
                                    <td>10</td>
                                    <td>1000</td>
                                    <td>
                                        <Button>Editar</Button>
                                        <Button>Eliminar</Button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <h5 className="text-center text-md font-semibold">Tablets</h5>
                    <div className="table-responsive">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Código</th>
                                    <th>Imagen</th>
                                    <th>Nombre</th>
                                    <th>Stock</th>
                                    <th>Precio Unitario</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>
                                        <img src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png" alt="imagen" />
                                    </td>
                                    <td>Tablet Samsung Galaxy Tab S20</td>
                                    <td>10</td>
                                    <td>1000</td>
                                    <td>
                                        <Button>Editar</Button>
                                        <Button>Eliminar</Button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                    <h5 className="text-center text-md font-semibold">Computadoras</h5>
                    <div className="table-responsive">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Código</th>
                                    <th>Imagen</th>
                                    <th>Nombre</th>
                                    <th>Stock</th>
                                    <th>Precio Unitario</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>
                                        <img src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png" alt="imagen" />
                                    </td>
                                    <td>Asus Zenbook</td>
                                    <td>10</td>
                                    <td>1000</td>
                                    <td>
                                        <Button>Editar</Button>
                                        <Button>Eliminar</Button>
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                    <h5 className="text-center text-md font-semibold">Accesorios</h5>
                    <div className="table-responsive">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Código</th>
                                    <th>Imagen</th>
                                    <th>Nombre</th>
                                    <th>Stock</th>
                                    <th>Precio Unitario</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>
                                        <img src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png" alt="imagen" />
                                    </td>
                                    <td>Audífonos Samsung Galaxy Buds</td>
                                    <td>10</td>
                                    <td>1000</td>
                                    <td>
                                        <Button>Editar</Button>
                                        <Button>Eliminar</Button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>
                                        <img src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png" alt="imagen" />
                                    </td>
                                    <td>Audífonos Samsung Galaxy Buds Pro</td>
                                    <td>10</td>
                                    <td>1000</td>
                                    <td>
                                        <Button>Editar</Button>
                                        <Button>Eliminar</Button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>




    )

}
