import { useNavigate, useParams } from "react-router-dom";

import { Button } from "@nextui-org/react"

export const DetailSale = () => {

    const navigate = useNavigate();
    const { slug } = useParams();

    return (
        <div>
            {/* Tabla con detalle de ventas */}
            <div className="flex justify-center">
                <div className="max-w-3xl bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="flex items-center justify-center mb-4">
                        <img
                            src="https://img.lovepik.com/element/45011/0959.png_860.png"
                            alt="Logo"
                            className="h-16 w-auto"
                        />
                    </div>
                    {/* Titulo */}
                    <div className="items-center justify-center text-center mb-4">
                        <h2 className="text-2xl font-bold">
                            Nombre de la empresa S.A.
                        </h2>
                        <p>NIT: 123456789</p>
                    </div>
                    {/* Datos de la empresa y del cliente */}
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <p>Dirección: Calle Junin #123</p>
                            <p>Correo: info@techsoluciones.com</p> 
                            <p>Telefono: 123456789</p> 
                        </div>
                        <div>
                            <p>Nombre: Kevin</p>
                            <p>Correo: kevin@gmail.com</p> 
                            <p>Telefono: 123456789</p> 
                        </div>
                    </div>

                    <table className="table-fixed w-full">
                        <thead>
                            <tr>
                                <th className="w-1/3">Producto</th>
                                <th className="w-1/3">Cantidad</th>
                                <th className="w-1/3">Precio</th>
                                <th className="w-1/3">SubTotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Producto 1</td>
                                <td>2</td>
                                <td>150 BOB</td>
                                <td>300 BOB</td>
                            </tr>
                            <tr>
                                <td>Producto 2</td>
                                <td>3</td>
                                <td>200 BOB</td>
                                <td>600 BOB</td>
                            </tr>
                            <tr>
                                <td>Producto 3</td>
                                <td>1</td>
                                <td>100 BOB</td>
                                <td>100 BOB</td>
                            </tr>
                            {/* dESCUENTO */}
                            <tr>
                                <td></td>
                                <td></td>
                                <td>Descuento</td>
                                <td>50 BOB</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td>Total</td>
                                <td>650 BOB</td>
                            </tr>
                        </tbody>

                    </table>

                </div>

            </div>
            {/* Botones para imprimir o descargar */}
            <div className="flex justify-center">
                {/* Boton atras */}
                <Button className="mr-4" variant="solid" color="primary" onPress={() => navigate(`/tienda/${slug}`)}>
                    Atras
                </Button>
                <Button className="mr-4" onPress={() => window.print()} variant="solid" color="secondary">
                    Imprimir
                </Button>
                <Button variant="solid" color="danger">
                    Descargar
                </Button>
            </div>
        </div>
    )
}