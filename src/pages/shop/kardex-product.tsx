
import { getKeyValue, Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import { useMemo, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
export const users = [
    {
      key: "1",
      name: "Tony Reichert",
      role: "CEO",
      status: "Active",
    },
    {
      key: "2",
      name: "Zoey Lang",
      role: "Technical Lead",
      status: "Paused",
    }
  ];
  
export const KardexProduct = () => {
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
  const rowsPerPage = 4;

  const pages = Math.ceil(users.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return users.slice(start, end);
  }, [page, users]);
    return (
        <div className="my-2 px-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
            {/* Atras */}
            <div className="flex w-full gap-2">
                <button
                    onClick={() => navigate(-1)}
                    className="bg-default-50 shadow-lg rounded-2xl p-2"
                >
                    <FaArrowLeft size={20} />
                </button>
                <h1 className="text-xl font-semibold">Kardex de: NOMBRE DEL PRODUC</h1>
            </div>

            <div className="bg-default-50 rounded-2xl p-6">
                <img src="https://blog.siigo.com/wp-content/uploads/2018/02/Infograf%C3%ADas-pesp.jpg" alt="" />
                {/* <Table
                    aria-label="Example table with client side pagination"
                    bottomContent={
                        <div className="flex w-full justify-center">
                            <Pagination
                                isCompact
                                showControls
                                showShadow
                                color="secondary"
                                page={page}
                                total={pages}
                                onChange={(page) => setPage(page)}
                            />
                        </div>
                    }
                    classNames={{
                        wrapper: "min-h-[222px]",
                    }}
                >
                    <TableHeader>
                        <TableColumn key="entrada">Entradas</TableColumn>
                        <TableColumn key="salida">Salidas</TableColumn>
                        <TableColumn key="saldo">Saldo</TableColumn>
                    </TableHeader>
                    <TableBody items={items}>
                        {(item) => (
                            <TableRow key={item.key}>
                                {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                            </TableRow>
                        )}
                    </TableBody>
                </Table> */}
            </div>
        </div>
    )
}