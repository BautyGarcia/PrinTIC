import { type NextPage } from "next";
import Dashboard from ".";
import Head from "next/head";
import { api } from "~/utils/api";
import { formatDate } from "~/utils/scripts";

const CuantoFalta: NextPage = () => {
    const { data: pedidos } = api.pedidos.getAllPedidos.useQuery();

    return (
        <>
            <Head>
                <title>PrinTIC - ¿Cuanto falta?</title>
                <meta name="description" content="PrinTIC" />
                <link rel="icon" href="/general/ticLogo.ico" />
            </Head>
            <Dashboard>
                <div className="p-5 noHeaderScreenMax overflow-auto">
                    <table className="bg-appshell_background noHeaderScreen w-full">
                        <thead className="">
                            <tr>
                                <th className="">Fecha</th>
                                <th className="">Alumno</th>
                                <th className="">Estado</th>
                                <th className="">Materia</th>
                                <th className="">Notas</th>
                                <th className="">Modificado por</th>
                                <th className="">Comentarios</th>
                            </tr>
                        </thead>
                        <tbody className="">
                            {pedidos?.map((pedido) => (
                                <tr key={pedido.id}>
                                    <td className="">{formatDate(pedido.fecha)}</td>
                                    <td className="">{`${pedido.user.name} ${pedido.user.curso}`}</td>
                                    <td className="">{pedido.estado}</td>
                                    <td className="">{pedido.materia}</td>
                                    <td className="">{pedido.observacionesAlumno}</td>
                                    <td className="">{pedido.aprobador?.name ?? "Nadie"}</td>
                                    <td className="">{pedido.observacionesProfesor}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Dashboard>
        </>
    )
}

export default CuantoFalta