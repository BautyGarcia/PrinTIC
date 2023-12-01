import { type NextPage } from "next";
import Dashboard from ".";
import Head from "next/head";
import { api } from "~/utils/api";
import { Heading, Text } from "~/components/utils/texts";
import { ActionButton, DropdownMenu } from "~/components/utils/buttons";
import { TextInput, DropdownSelect, TextZone } from "~/components/utils/inputs";
import { useState } from "react";
import { estadosPedidoKeys, estadosPedidoValues, estadosCambioPedidoKeys, estadosCambioPedidoValues } from "~/utils/objects";
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { PageLoader } from "~/components/utils/loaders";
import { Modal } from "~/components/utils/popups";
import { IconX } from "@tabler/icons-react";

const coloresPedido = {
    "PENDIENTE": "bg-[#ff6c31]",
    "APROBADO": "bg-[#65FF7E]",
    "IMPRIMIENDO": "bg-[#5e2b97]",
    "ESPERANDO_RETIRO": "bg-[#18d0da]",
    "ENTREGADO": "bg-[#E61366]",
    'CON_ERRORES': "bg-[#FF4343]",
    "DENEGADO": "bg-[#6A6A6A]",
    'FALTA_HACER_PIEZAS': "bg-[#ed58ec]",
    "CADUCADO": "bg-[#6A6A6A]",
    "TIMI": "bg-[#008080]",
    "PROYECTO": "bg-[#18d0da]"
}

export const Solicitudes: NextPage = () => {
    const [materia, setMateria] = useState("");
    const [estado, setEstado] = useState("");
    const [newEstado, setNewEstado] = useState("");
    const [alumnoName, setAlumnoName] = useState("");
    const [motivos, setMotivos] = useState("");
    const [curso, setCurso] = useState("");
    const { data: pedidosData, isLoading } = api.pedidos.getAllPedidos.useQuery({});
    const [opened, setOpened] = useState(false);

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

    const filterData = () => {
        let filteredData = pedidosData;

        if (materia !== "") {
            filteredData = filteredData?.filter((pedido) => {
                return pedido.materia === materia;
            });
        }

        if (estado !== "") {
            filteredData = filteredData?.filter((pedido) => {
                return pedido.estado === estado;
            });
        }

        if (alumnoName !== "") {
            filteredData = filteredData?.filter((pedido) => {
                return pedido.user.name?.toLowerCase().includes(alumnoName.toLowerCase() ?? "");
            });
        }

        if (curso !== "") {
            filteredData = filteredData?.filter((pedido) => {
                return pedido.user.curso?.toLowerCase().includes(curso.toLowerCase() ?? "");
            });
        }

        return filteredData;
    }

    async function downloadAsZip(urls: { url: string, name: string }[], studentInfo: { studentName: string, curso: string }) {
        const zip = new JSZip();

        for (const url of urls) {
            const response = await fetch(url.url);
            const blob = await response.blob();
            zip.file(`${url.name}.stl`, blob);
        }

        const zipBlob = await zip.generateAsync({ type: "blob" });
        saveAs(zipBlob, `${studentInfo.studentName}_${studentInfo.curso}_${Date.now()}.zip`);
    }

    return (
        <>
            <Head>
                <title>PrinTIC - Solicitudes</title>
                <meta name="description" content="PrinTIC" />
                <link rel="icon" href="/general/ticLogo.ico" />
            </Head>
            <Modal
                isOpen={opened}
                close={() => setOpened(false)}
                className="flex flex-col gap-7 solicitud w-[450px] h-[800px] bg-modalBackground rounded-lg p-5 px-6"
            >
                <div className="flex justify-between items-center">
                    <Heading className="text-[30px]">Cambiar estado</Heading>
                    <ActionButton className="p-0 bg-transparent hover:bg-blue_tic_hover"
                        onClick={() => setOpened(false)}
                    >
                        <IconX size={50} />
                    </ActionButton>
                </div>
                <DropdownSelect
                    title="Estado"
                    labels={estadosCambioPedidoValues}
                    values={estadosCambioPedidoKeys}
                    inputClassName="w-full md:w-full"
                    setValue={(e) => {
                        setNewEstado(e);
                        filterData();
                    }}
                />
                {
                    (newEstado === "DENEGADO" || newEstado === "CON_ERRORES") && (
                        <TextZone 
                            placeholder="Fijate que..."
                            setValue={setMotivos}
                            title="Motivos"
                            className=""
                        />
                    )
                }
                <ActionButton
                    className="font-spacemono text-[18px]"
                    onClick={() => {
                        setOpened(false);
                    }}
                >Cambiar</ActionButton>
            </Modal>
            <Dashboard>
                <div className="flex flex-wrap items-center p-3 px-5 gap-5 w-full h-min bg-appshell_secondary">
                    <DropdownSelect
                        title="Materia"
                        labels={["Proyecto", "TIMI", "Todas"]}
                        values={["PROYECTO", "TIMI", ""]}
                        setValue={(e) => {
                            setMateria(e);
                            filterData();
                        }}
                    />
                    <DropdownSelect
                        title="Estado"
                        labels={estadosPedidoValues}
                        values={estadosPedidoKeys}
                        setValue={(e) => {
                            setEstado(e);
                            filterData();
                        }}
                    />
                    <TextInput
                        className="p-2"
                        label="Nombre"
                        setValue={(e) => {
                            setAlumnoName(e);
                            filterData();
                        }}
                        placeholder="Dario Misch..."
                        isError={false}
                        value={alumnoName}
                    />
                    <TextInput
                        className="p-2"
                        label="Curso"
                        setValue={(e) => {
                            setCurso(e);
                            filterData();
                        }}
                        placeholder="5E"
                        isError={false}
                        value={curso}
                    />
                </div>
                <div className="flex flex-wrap w-full justify-center h-full p-8 pb-[400px] gap-8 overflow-scroll">
                    {
                        isLoading ? (
                            <div className="flex w-full h-full justify-center items-end pb-10">
                                <PageLoader />
                            </div>
                        ) : (
                            filterData()?.map((pedido) => {
                                return (
                                    <div key={pedido.id} className="solicitud flex flex-col w-[500px] h-[500px] bg-appshell_background rounded-lg p-6 gap-5">
                                        <Heading className="text-[40px]">{`${pedido.user.name} - ${pedido.user.curso}`}</Heading>
                                        <div className="flex gap-4">
                                            <Heading className={`text-[15px] ${coloresPedido[pedido.estado]} w-min p-2 px-4 rounded-full hover:cursor-pointer`} onClick={() => setOpened(true)}>{pedido.estado}</Heading>
                                            <Heading className={`text-[15px] ${coloresPedido[pedido.materia]} w-min p-2 px-4 rounded-full`}>{pedido.materia}</Heading>
                                        </div>
                                        <Text>{formatDate(pedido.fecha)}</Text>
                                        <div className="w-full h-[5px] bg-pink_tic" />

                                        <div className="h-full">
                                            <Text className="break-all line-clamp-4 overflow-auto">{`${pedido.observacionesAlumno ? pedido.observacionesAlumno : "No hay notas"}`}</Text>
                                        </div>

                                        <div className="flex w-full h-min self-end justify-between">
                                            <ActionButton
                                                className="font-spacemono text-[18px]"
                                                onClick={() => {
                                                    void window.open(`solicitudes/${pedido.id}`, "_blank");
                                                }}
                                            >Ver</ActionButton>
                                            <DropdownMenu
                                                options={
                                                    [
                                                        {
                                                            label: "Cambiar Estado",
                                                            onClick: () => {
                                                                setOpened(true);
                                                            }
                                                        },
                                                        {
                                                            label: "Descargar Todo",
                                                            onClick: () => {
                                                                const urls: { url: string, name: string }[] = [];
                                                                pedido.piezas.forEach((pieza) => {
                                                                    urls.push({ url: pieza.url, name: pieza.nombre });
                                                                });
                                                                void downloadAsZip(urls, { studentName: pedido.user.name ?? "", curso: pedido.user.curso });
                                                            }
                                                        }
                                                    ]
                                                } />
                                        </div>
                                    </div>
                                )
                            })
                        )
                    }
                </div>
            </Dashboard>
        </>
    )
}

export default Solicitudes;