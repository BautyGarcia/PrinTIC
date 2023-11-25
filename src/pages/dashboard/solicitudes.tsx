import { type NextPage } from "next";
import Dashboard from ".";
import Head from "next/head";
import { api } from "~/utils/api";
import { Heading, Text } from "~/components/utils/texts";
import { ActionButton } from "~/components/utils/buttons";
import { SelectInput } from "~/components/utils/inputs";
import { useState } from "react";
import { coloresPedido } from "~/utils/objects";
import { estadosPedidoKeys, estadosPedidoValues } from "~/utils/objects";
import { type Estado } from "@prisma/client";

const Solicitudes: NextPage = () => {
    const [materia, setMateria] = useState("");
    const [estado, setEstado] = useState("");
    const { data: pedidosData, refetch: refetchPedidos } = api.pedidos.getAllPedidos.useQuery({
        materia,
        estado
    });

    const formatDate = (date: Date) => {
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - date.getTime());
        const diffHours = diffTime / (1000 * 60 * 60);

        if (diffHours < 0.1) {
            return `Hace ${Math.floor(diffHours * 60 * 60)} segundos`;
        }
        else if (diffHours <= 1) {
            return `Hace ${Math.floor(diffHours * 60)} minutos`;
        }
        else if (diffHours < 24) {
            return `Hace ${Math.floor(diffHours)} horas`;
        }
        else {
            return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear().toString().slice(-2)}`;
        }
    }

    return (
        <>
            <Head>
                <title>PrinTIC - Solicitudes</title>
                <meta name="description" content="PrinTIC" />
                <link rel="icon" href="/general/ticLogo.ico" />
            </Head>
            <Dashboard>
                <div className="flex items-center p-3 px-5 gap-5 w-full h-[120px] bg-appshell_secondary">
                    <SelectInput
                        title="Materia"
                        labels={["Proyecto", "TIMI", "Todos"]}
                        options={["PROYECTO", "TIMI", ""]}
                        setValue={(e) => {
                            setMateria(e);
                            void refetchPedidos();
                        }}
                        value={materia ?? "Todos"}
                        className="w-[200px] h-[50px]"
                    />
                    <SelectInput
                        title="Estado"
                        labels={estadosPedidoValues}
                        options={estadosPedidoKeys}
                        setValue={(e) => {
                            setEstado(e);
                            void refetchPedidos();
                        }}
                        value={estado as Estado}
                        className="w-[200px] h-[50px]"
                    />
                </div>
                <div className="flex flex-wrap w-full justify-evenly h-full p-8 pb-[250px] gap-8 overflow-scroll">
                    {
                        pedidosData?.map((pedido) => {
                            return (
                                <div key={pedido.id} className="solicitud flex flex-col w-[450px] h-[450px] bg-appshell_background rounded-lg p-6 gap-5">
                                    <Heading className="text-[40px]">{`${pedido.user.name} - ${pedido.user.curso}`}</Heading>
                                    <div className="flex gap-4">
                                        <Heading className={`text-[15px] ${coloresPedido[pedido.estado]} w-min p-2 px-4 rounded-full`}>{pedido.estado}</Heading>
                                        <Heading className={`text-[15px] ${coloresPedido[pedido.materia]} w-min p-2 px-4 rounded-full`}>{pedido.materia}</Heading>
                                    </div>
                                    <Text>{formatDate(pedido.fecha)}</Text>
                                    <div className="w-full h-[5px] bg-pink_tic" />

                                    <div className="h-full">
                                        <Text className="break-all text-clip line-clamp-4 truncate-none overflow-scroll">{`${pedido.observacionesAlumno ? pedido.observacionesAlumno : "No hay notas"}`}</Text>
                                    </div>

                                    <div className="flex w-full h-min self-end">
                                        <ActionButton className="font-spacemono text-[18px]">Ver</ActionButton>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </Dashboard>
        </>
    )
}

export default Solicitudes