import { CardBalance1 } from "./card-balance1";
import { CardBalance2 } from "./card-balance2";
import { CardBalance3 } from "./card-balance3";
import { CardAgents } from "./card-agents";
import { DynamicBreadcrumbs } from "../../components";
import { Button, DatePicker, DateValue, Select, SelectItem, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
//import { faker } from '@faker-js/faker';
import { useHomeStore } from "../../stores/home/home.store";
import { useAuthStore } from "../../stores/auth/auth.store";
import { useState } from "react";
import { LuDatabaseBackup } from "react-icons/lu";

export const HomeIndex = () => {

  const { getBackup, backup } = useHomeStore();
  const { token } = useAuthStore();
  const handleBackup = () => {
    getBackup(token!);
    console.log(backup);
  }
  const [date, setDate] = useState<DateValue | null>(null);
  const printTable = () => {
    const table = document.getElementById('products-table');
    const printWindow = window.open('', '', 'height=400,width=600');
    printWindow?.document.write(table?.innerHTML || '');
    printWindow?.document.close();
    printWindow?.print();
  }

  const downloadTable = () => {
    const table = document.getElementById('products-table');
    const printWindow = window.open('', '', 'height=400,width=600');
    printWindow?.document.write(table?.innerHTML || '');
    printWindow?.document.close();
  }

  return (
    <div className="h-full lg:px-6">
      <DynamicBreadcrumbs />
      <h2 className="text-2xl font-semibold">Panel de control</h2>
      {/* Boton para copia de seguridad de base de dats  */}
      <Button onPress={handleBackup} startContent={<LuDatabaseBackup size={20} />} color="secondary">Copia de seguridad</Button>
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
          {/* <div className="h-full flex flex-col gap-2">
            <h3 className="text-xl font-semibold">Estadísticas</h3>
            <div className="w-full bg-default-50 shadow-lg rounded-2xl p-6 ">
              <img
                src="https://res.cloudinary.com/dk2ghb1pg/image/upload/v1630636334/nextui-org/home-chart_1_2x_qjqjqj.png"
                alt="chart"
                className="w-full"
              />
            </div>
          </div> */}

          <div className="h-full flex flex-col gap-2">
            <h3 className="text-xl font-semibold">Estadísticas y Reportes</h3>
            <div className="w-full bg-default-50 shadow-lg rounded-2xl p-6 ">
              <h3 className="text-xl font-semibold">Productos más vendidos</h3>
              {/* Seleccionar por categoria */}
              <div className="flex gap-2">
                <Select
                  label="Categoría"
                  placeholder="Selecciona una categoría"
                  className="max-w-xs"
                >
                  <SelectItem key="1" value="1">
                    Todos
                  </SelectItem>
                  <SelectItem key="2" value="2">
                    Celulares
                  </SelectItem>
                  <SelectItem key="3" value="3">
                    Tablets
                  </SelectItem>

                </Select>
                {/* Filtrar por fecha */}
                <DatePicker value={date} onChange={setDate} />

                {/* Boton para imprimir y descargar */}
                <Button variant="bordered" color="primary" onPress={printTable}>Imprimir</Button>
                <Button variant="bordered" color="primary" onPress={downloadTable}>Descargar</Button>
              </div>
            </div>
            <Table aria-label="Productos más vendidos" id="products-table">
              <TableHeader>
                <TableColumn>Producto</TableColumn>
                <TableColumn>Cantidad</TableColumn>
                <TableColumn>Precio</TableColumn>
              </TableHeader>
              <TableBody>
                <TableRow key="1">
                  <TableCell>Asus Zenbook</TableCell>
                  <TableCell>150</TableCell>
                  <TableCell>Bs. 20.00</TableCell>
                </TableRow>
                <TableRow key="2">
                  <TableCell>Repetidor</TableCell>
                  <TableCell>120</TableCell>
                  <TableCell>Bs. 15.00</TableCell>
                </TableRow>
                <TableRow key="3">
                  <TableCell>Teclado</TableCell>
                  <TableCell>100</TableCell>
                  <TableCell>Bs. 10.00</TableCell>
                </TableRow>
                <TableRow key="4">
                  <TableCell>Mouse</TableCell>
                  <TableCell>80</TableCell>
                  <TableCell>Bs. 25.00</TableCell>
                </TableRow>
                <TableRow key="5">
                  <TableCell>Mouse Gamer</TableCell>
                  <TableCell>60</TableCell>
                  <TableCell>Bs. 30.00</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* Left Section */}
      <div className="mt-4 gap-2 flex flex-col xl:max-w-md w-full">
        <h3 className="text-xl font-semibold">Clientes</h3>
        <div className="flex flex-col justify-center gap-4 flex-wrap md:flex-nowrap md:flex-col">
          <CardAgents />
          {/* <CardTransactions /> */}
        </div>
      </div>
    </div>

  )
}
