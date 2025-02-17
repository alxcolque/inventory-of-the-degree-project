
import { DynamicBreadcrumbs} from "../../../components"
import { Table, TableHeader, TableCell, TableBody, TableRow, TableColumn, User, Tooltip, Chip } from "@nextui-org/react";

import { sales } from "../../../api/systemdata";
import { FaEye } from "react-icons/fa6";

export const IndexOrders = () => {
    const columns = [
        { name: 'NOMBRE', uid: 'customer' },
        { name: 'TIENDA', uid: 'shop' },
        { name: 'TOTAL', uid: 'total' },
        { name: 'ESTADO', uid: 'status' },
        { name: 'FECHA', uid: 'date' },
        { name: 'ACCIONES', uid: 'actions' }
    ];

    return (
        <>
            <div className="my-2 px-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
                <DynamicBreadcrumbs />
                <h2>Ventas</h2>
                <Table aria-label="Example table with custom cells">
                    <TableHeader columns={columns}>
                        {(column) => (
                            <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                                {column.name}
                            </TableColumn>
                        )}
                    </TableHeader>
                    <TableBody>
                        {sales.map((sale) => (
                            <TableRow key={sale.id}>
                                <TableCell>
                                    <User
                                        avatarProps={{ radius: "lg", src: `https://picsum.photos/200/300?random=${Math.floor(Math.random() * 1000)}` }}
                                        description={sale.customer}
                                        name={sale.customer}
                                    >
                                        {sale.customer}
                                    </User>
                                </TableCell>
                                <TableCell>
                                    <p className="text-bold text-sm capitalize text-default-400">{sale.shop}</p>
                                </TableCell>
                                <TableCell>
                                    <p className="text-bold text-sm capitalize text-default-400">{sale.total}</p>
                                </TableCell>
                                <TableCell>
                                    <Chip className="capitalize" color='warning' size="sm" variant="flat">
                                        {sale.status}
                                    </Chip>
                                </TableCell>
                                <TableCell>
                                    <p className="text-bold text-sm capitalize text-default-400">{sale.date}</p>
                                </TableCell>
                                <TableCell>
                                    <Tooltip color="primary" content="Ver detalle de venta">
                                        <span className="text-lg text-primary cursor-pointer active:opacity-50">
                                            <FaEye />
                                        </span>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </>
    )
}
