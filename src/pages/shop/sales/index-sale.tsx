
import { Table, TableHeader, TableCell, TableBody, TableRow, TableColumn, Tooltip, Chip, Button } from "@nextui-org/react";

import { FaArrowLeft, FaEye } from "react-icons/fa6";

import { useNavigate, useParams } from "react-router-dom";
import { useAuthStore, useOrdersStore } from "../../../stores";
import { useEffect } from "react";

interface Props {
    onClose: () => void;
}   

export const IndexSale = ({ onClose }: Props) => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const token = useAuthStore((state) => state.token);


    const sales = useOrdersStore((state) => state.sales);
    const getSalesInStore = useOrdersStore((state) => state.getSalesInStore);

    useEffect(() => {
        getSalesInStore(slug as string, token!);
    }, []);


    const columns = [
        { name: 'NOMBRE', uid: 'customer' },
        { name: 'TOTAL', uid: 'total' },
        { name: 'ESTADO', uid: 'status' },
        { name: 'FECHA', uid: 'date' },
        { name: 'ACCIONES', uid: 'actions' }
    ];
    console.log(sales);
    
    return (
        <div className="w-full">
            {/* Boton atras */}
            <div className="flex flex-row gap-2">
                <Button color="primary" size="sm" startContent={<FaArrowLeft size={18} />} variant="shadow" onPress={() => onClose()}></Button>
                <h2>Ventas</h2>
            </div>
            <Table aria-label="Example table with custom cells" className="mt-4">
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
                                {sale.customer.name}
                            </TableCell>
                            <TableCell>
                                <p className="text-bold text-sm capitalize text-default-400">{sale.total}</p>
                            </TableCell>
                            <TableCell>
                                <Chip className="capitalize" color='success' size="sm" variant="flat">
                                    {sale.status}
                                </Chip>
                            </TableCell>
                            <TableCell>
                                <p className="text-bold text-sm capitalize text-default-400">{sale.date}</p>
                            </TableCell>
                            <TableCell>
                                <Tooltip color="primary" content="Ver detalle de venta">
                                    <span className="text-lg text-primary cursor-pointer active:opacity-50" onClick={() => navigate(`/tienda/${slug}/venta/${sale.id}`)}>
                                        <FaEye />
                                    </span>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
