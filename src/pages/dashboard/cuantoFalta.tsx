import { type NextPage } from "next";
import Dashboard from ".";
import Head from "next/head";
import { api } from "~/utils/api";
import { formatDate } from "~/utils/scripts";
import { PageLoader } from "~/components/utils/loaders";
import { estadosCambioPedido } from "~/utils/objects";

const CuantoFalta: NextPage = () => {
    const { data: pedidos, isLoading } = api.pedidos.getAllPedidos.useQuery();

    return (
        <>
            <Head>
                <title>PrinTIC - ¿Cuanto falta?</title>
                <meta name="description" content="PrinTIC" />
                <link rel="icon" href="/general/ticLogo.ico" />
            </Head>
            <Dashboard isOverflowHidden={false}>
                <div className="p-5 pb-28">
                    {
                        isLoading ?
                            <div className="flex justify-center items-center noHeaderScreen">
                                <PageLoader />
                            </div>
                            :
                            <table className="w-full h-full bg-appshell_background solicitud">
                                <thead className="">
                                    <tr className="h-[85px] font-spacemono text-[20px] bg-appshell_secondary text-left">
                                        <th className="px-4 w-[150px] ">Fecha</th>
                                        <th className="px-4">Alumno</th>
                                        <th className="px-4">Curso</th>
                                        <th className="px-4">Estado</th>
                                        <th className="px-4">Materia</th>
                                        <th className="px-4">Notas</th>
                                        <th className="px-4">Profesor</th>
                                        <th className="px-4 pr-5">Motivos</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        pedidos?.map((pedido, index) => {
                                            return (
                                                <tr key={index} className="h-[50px] text-lg border-b-2 border-b-appshell_secondary hover:bg-pink_tic_light">
                                                    <td className="px-4 py-4">{formatDate(pedido.fecha)}</td>
                                                    <td className="px-4 whitespace-nowrap">{pedido.user.name}</td>
                                                    <td className="px-4">{pedido.user.curso}</td>
                                                    <td className="px-4 whitespace-nowrap">{estadosCambioPedido[pedido.estado].toUpperCase()}</td>
                                                    <td className="px-4">{pedido.materia}</td>
                                                    <td className="px-4">{pedido.observacionesAlumno}</td>
                                                    <td className="px-4">{pedido.aprobador?.name ?? "Ninguno"}</td>
                                                    <td className="px-4">{pedido.observacionesProfesor}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                    }
                </div>
            </Dashboard>
        </>
    )
}

export default CuantoFalta