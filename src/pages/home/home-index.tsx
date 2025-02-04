import { CardBalance1 } from "./card-balance1";
import { CardBalance2 } from "./card-balance2";
import { CardBalance3 } from "./card-balance3";
import { CardAgents } from "./card-agents";
import { CardTransactions } from "./card-transactions";
import { Link } from "@nextui-org/react";
import { DynamicBreadcrumbs, DynamicTable } from "../../components";
//import { faker } from '@faker-js/faker';
export const HomeIndex = () => {


  const headers = [
    { name: 'NOMBRE', uid: 'name' },
    { name: 'PLAN', uid: 'plan' },
    { name: 'FECHA', uid: 'date' },
    { name: 'MONTO', uid: 'amount' },
    { name: 'ESTADO', uid: 'status' },
    { name: 'ACCIONES', uid: 'actions-s' }
  ];
  const data = [
    //lista 15 datos aleatorios
    { id: 1, name: 'John Doe', plan: 'Plan 1', date: '2021-01-01', amount: 100, status: 'active' },
    { id: 2, name: 'Jane Doe', plan: 'Plan 2', date: '2021-01-02', amount: 200, status: 'inactive' },
    { id: 3, name: 'Jim Beam', plan: 'Plan 3', date: '2021-01-03', amount: 300, status: 'active' },
    { id: 4, name: 'John Doe', plan: 'Plan 1', date: '2021-01-01', amount: 100, status: 'active' },
    { id: 5, name: 'Jane Doe', plan: 'Plan 2', date: '2021-01-02', amount: 200, status: 'inactive' },
    { id: 6, name: 'Jim Beam', plan: 'Plan 3', date: '2021-01-03', amount: 300, status: 'active' },
    { id: 7, name: 'John Doe', plan: 'Plan 1', date: '2021-01-01', amount: 100, status: 'active' },
    { id: 8, name: 'Jane Doe', plan: 'Plan 2', date: '2021-01-02', amount: 200, status: 'inactive' },
    { id: 9, name: 'Jim Beam', plan: 'Plan 3', date: '2021-01-03', amount: 300, status: 'active' },
    { id: 10, name: 'John Doe', plan: 'Plan 1', date: '2021-01-01', amount: 100, status: 'active' },
  ];

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
          <h3 className="text-center text-xl font-semibold">Contratos más recientes</h3>
          <Link
            href="/accounts"
            color="primary"
            className="cursor-pointer"
          >
            Ver todas
          </Link>
        </div>

        <DynamicTable stringSearch={'name'} onCreate={() => { }} data={data as any} columns={headers} onEdit={() => { }} onDelete={() => { }} onView={() => { }} />

      </div>
    </div>
  )
}
