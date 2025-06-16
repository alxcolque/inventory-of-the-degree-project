import { useNavigate, useParams } from "react-router-dom";
import { jsPDF } from 'jspdf';

import { Button } from "@nextui-org/react"
import { useEffect } from "react";
import { useAuthStore, useDetailSalesStore } from "../../../stores";
import { company } from "../../../api/systemdata";
import { useShopsStore } from "../../../stores/shops/shops.store";
import { format } from "date-fns";

export const DetailSale = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { slug } = useParams();

    const shop = useShopsStore(state => state.shop);
    const { getShopBySlug } = useShopsStore();

    const handlePrint = () => {
        /* Imprimir solo la seccion de my-sale-detail */
        const printContent = document.querySelector(".my-sale-detail");
        /* Abrir nueva ventana */
        const WindowPrt = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
        if (WindowPrt) {
            WindowPrt.document.write(printContent!.innerHTML);
            WindowPrt.document.close();
            WindowPrt.focus();
            WindowPrt.print();
            WindowPrt.close();
        }
    }
    /* Obtener detalle de la venta */

    const sale = useDetailSalesStore(state => state.sale) as any;
    const { detailSales, getDetailSale } = useDetailSalesStore();
    const token = useAuthStore(state => state.token);
    useEffect(() => {
        getDetailSale(id as string, token as string);
    }, []);

    useEffect(() => {
        getShopBySlug(slug as string, token as string);
    }, []);

    const handleDownload = () => {
        const pdf = new jsPDF();
        /* Descarga desde el componente receipt.tsx */
        const receiptContent = `
            
            ${company.name}
            NIT: ${company.nit}
            Tienda: ${shop.name}
            Direccion: ${shop.address}

            Fecha: ${sale.created_at ? sale.created_at : ''}
            Cajero: ${sale.seller ? sale.seller : ''}
            Cliente: ${sale.customer ? sale.customer.name : ''}

            Impreso por: ${sale.seller ? sale.seller : ''}
            Vendedor: ${sale.seller ? sale.seller : ''}

            DESCRIPCION                  CANT  VALOR
            ${detailSales.map((detailSale: any) => `
            ${detailSale.product.name}              ${detailSale.quantity}     ${detailSale.price}
            `).join('')}

            TOTAL CANTIDAD:              ${detailSales.reduce((acc: number, detailSale: any) => acc + detailSale.quantity, 0)}
            SUBTOTAL:                    ${detailSales.reduce((acc: number, detailSale: any) => acc + detailSale.price, 0)}
            Descuentos:                  0
            TOTAL:                       ${detailSales.reduce((acc: number, detailSale: any) => acc + detailSale.price, 0)}
            FORMA DE PAGO:               Efectivo
            VALOR:                       ${detailSales.reduce((acc: number, detailSale: any) => acc + detailSale.price, 0)}

            GARANTIA DE EQUIPO UN AÑO
            No cubre golpes ni humedad, sitios donde
            puede hacer efectiva su garantia
            GARANTIA DE ACCESORIO TRES MESES: No
            cubre golpes ni humedad, ni maltrato.
        `;
        pdf.setFontSize(10);
        pdf.text(receiptContent, 10, 10);
        pdf.save(`${sale.customer.name}-${sale.created_at}.pdf`);
    }

    //console.log(detailSales);
    //console.log(sale);
    return (
        <div>
            {/* Tabla con detalle de ventas */}
            <div className="flex flex-col justify-center my-sale-detail">
                <div className="max-w-3xl shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="flex items-center justify-center mb-4">
                        <img
                            src="https://img.lovepik.com/element/45011/0959.png_860.png"
                            alt="Logo"
                            className="h-16 w-auto"
                            width={200}
                            height={200}
                        />
                    </div>
                    {/* Titulo */}
                    <div className="items-center justify-center text-center mb-4">
                        <h2 className="text-2xl font-bold">
                            {shop.name}
                        </h2>
                        <p>NIT: {company.nit}</p>
                        <p>Tienda: {shop.name}</p>
                        <p>Dirección: {shop.address}</p>
                        <div>
                            <p>Fecha: {sale.created_at ? format(new Date(sale.created_at), 'dd/MM/yyyy') : ''}</p>
                            <p>Cajero: {sale.seller ? sale.seller : ''}</p>
                            <p>Cliente: {sale.customer_id === 0 ? sale.name : sale.customer.name}</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-between mb-4">

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
                                {detailSales.map((detailSale: any) => (
                                    <tr key={detailSale.id}>
                                        <td className="text-center">{detailSale.product.name}</td>
                                        <td className="text-center">{detailSale.quantity}</td>
                                        <td className="text-center">{detailSale.price}</td>
                                        <td className="text-center">{detailSale.price * detailSale.quantity}</td>
                                    </tr>
                                ))}
                                <tr>
                                    <td colSpan={3} className="text-right font-bold">Total</td>
                                    <td className="text-center font-bold">{detailSales.reduce((acc: number, detailSale: any) => acc + detailSale.price * detailSale.quantity, 0)}</td>
                                </tr>
                            </tbody>

                        </table>
                        {/* Legend */}

                    </div>

                    <div className="flex flex-col items-center justify-center sm:text-sm mb-4">
                        <p>
                            GARANTIA DEL EQUIPO: 30 DIAS
                        </p>
                        <p>
                            No cubre golpes ni humedad, sitios donde puede hacer efectiva la garantia
                        </p>
                        <p>
                            GARANTIA DE ACCESORIOS: 3 meses
                        </p>
                        <p>
                            No cubre golpes ni humedad, ni maltratos.
                        </p>

                    </div>
                    {/* Botones para imprimir o descargar */}
                </div>
            </div>
            <div className="flex no-print">
                {/* Boton atras */}
                <Button className="mr-4" variant="solid" color="primary" onPress={() => navigate(`/tienda/${slug}`)}>
                    Atras
                </Button>
                <Button className="mr-4" onPress={handlePrint} variant="solid" color="secondary">
                    Imprimir
                </Button>
                <Button variant="solid" color="danger" onPress={handleDownload}>
                    Descargar
                </Button>
            </div>
        </div>
    )
}