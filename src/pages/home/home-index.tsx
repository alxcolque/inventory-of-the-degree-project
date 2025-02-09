import { CardBalance1 } from "./card-balance1";
import { CardBalance2 } from "./card-balance2";
import { CardBalance3 } from "./card-balance3";
import { CardAgents } from "./card-agents";
import { CardTransactions } from "./card-transactions";
import { Button, Input, Link } from "@nextui-org/react";
import { DynamicBreadcrumbs } from "../../components";
import { AllItems } from "./all-items";
//import { faker } from '@faker-js/faker';


export const HomeIndex = () => {

  return (
    <div className="h-full lg:px-6">
      <DynamicBreadcrumbs />
      <h2 className="text-2xl font-semibold">Panel de control</h2>
      <div className="flex justify-center gap-4 xl:gap-4 pt-3 px-4 lg:px-0  flex-wrap xl:flex-nowrap sm:pt-10 max-w-[90rem] mx-auto w-full">
        <div className="mt-3 gap-6 flex flex-col w-full">

          {/* Card Section Top */}
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-semibold">Balance disponible</h3>
            <div className="grid md:grid-cols-2 grid-cols-1 2xl:grid-cols-3 gap-5  justify-center w-full">
              <CardBalance1 />
              <CardBalance2 />
              <CardBalance3 />
            </div>
          </div>

          {/* Chart */}
          <div className="h-full flex flex-col gap-2">
            <h3 className="text-xl font-semibold">Estadísticas</h3>
            <div className="w-full bg-default-50 shadow-lg rounded-2xl p-6 ">
              <img
                src="https://res.cloudinary.com/dk2ghb1pg/image/upload/v1630636334/nextui-org/home-chart_1_2x_qjqjqj.png"
                alt="chart"
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Left Section */}
        <div className="mt-4 gap-2 flex flex-col xl:max-w-md w-full">
          <h3 className="text-xl font-semibold">Clientes</h3>
          <div className="flex flex-col justify-center gap-4 flex-wrap md:flex-nowrap md:flex-col">
            <CardAgents />
            <CardTransactions />
          </div>
        </div>
      </div>

      {/* Table Latest Users */}
      <div className="flex flex-col justify-center w-full py-5 px-4 lg:px-0  max-w-[90rem] mx-auto gap-3">
        <div className="flex  flex-wrap justify-between">
          <h3 className="text-center text-xl font-semibold">Mi stock</h3>
          {/* Buscar stock por nombre */}
          <div className="flex justify-center">
            <Input
              placeholder="Buscar stock"
              className="cursor-pointer"
            />
          </div>
          <Link
            href="/accounts"
            color="primary"

            className="cursor-pointer"

          >
            Ver todas
          </Link>
        </div>

        {/* Botones horizontales para listar categorias para filtro, scroll horizontal */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          <Button>Todos</Button>
          <Button>Electrónicos</Button>
          <Button>Ropa</Button>
          <Button>Accesorios</Button>
          <Button>Otros</Button>

        </div>
        {/* All items */}
        <AllItems />
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
    </div>

  )
}
