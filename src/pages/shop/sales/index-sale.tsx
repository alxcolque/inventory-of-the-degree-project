
import { Table, TableHeader, TableCell, TableBody, TableRow, TableColumn, User, Tooltip, Chip, Button } from "@nextui-org/react";

import { sales } from "../../../api/systemdata";
import { FaArrowLeft, FaEye } from "react-icons/fa6";

import { useNavigate, useParams } from "react-router-dom";

interface Props {
    onClose: () => void;
}   

export const IndexSale = ({ onClose }: Props) => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const columns = [
        { name: 'NOMBRE', uid: 'customer' },
        { name: 'TIENDA', uid: 'shop' },
        { name: 'TOTAL', uid: 'total' },
        { name: 'ESTADO', uid: 'status' },
        { name: 'FECHA', uid: 'date' },
        { name: 'ACCIONES', uid: 'actions' }
    ];

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
