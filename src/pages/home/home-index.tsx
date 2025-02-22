import { CardBalance1 } from "./card-balance1";
import { CardBalance2 } from "./card-balance2";
import { CardBalance3 } from "./card-balance3";
import { CardAgents } from "./card-agents";
import { CardTransactions } from "./card-transactions";
import { DynamicBreadcrumbs } from "../../components";
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

    </div>

  )
}
