import { type NextPage } from "next";
import Dashboard from ".";
import Head from "next/head";
import { api } from "~/utils/api";
import { Heading, Text, Pill } from "~/components/utils/texts";
import { ActionButton } from "~/components/utils/buttons";
import { TextInput, DropdownSelect, TextZone } from "~/components/utils/inputs";
import { useState } from "react";
import { estadosPedidoKeys, estadosPedidoValues, estadosCambioPedidoKeys, estadosCambioPedidoValues, estadosCambioPedido } from "~/utils/objects";
import { PageLoader } from "~/components/utils/loaders";
import { Modal } from "~/components/utils/popups";
import { IconX, IconPencil } from "@tabler/icons-react";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { formatDate } from "~/utils/scripts";
import { downloadAsZip } from "~/utils/downloadFile";

const coloresPedido = {
    "PENDIENTE": "bg-[#ff6c31]",
    "APROBADO": "bg-[#48a856]",
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
    const [currentPedidoId, setCurrentPedidoId] = useState("");
    const [currentPedidoEstado, setCurrentPedidoEstado] = useState("");
    const [currentPedidoStudentEmail, setCurrentPedidoStudentEmail] = useState("");
    const [currentPedidoStudentName, setCurrentPedidoStudentName] = useState("");
    const { data: pedidosData, isLoading, refetch } = api.pedidos.getAllPedidos.useQuery();
    const { mutate: cambiarEstado } = api.pedidos.cambiarEstado.useMutation();
    const [opened, setOpened] = useState(false);
    const { data: sessionData } = useSession();
    const [isChanging, setIsChanging] = useState(false);

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

    const handleChangeEstado = () => {
        return new Promise<void>((resolve, reject) => {
            setIsChanging(true);
            if (!estadosCambioPedidoKeys.includes(newEstado)) {
                toast.error("Estado invalido");
                setIsChanging(false);
                reject();
                return;
            }

            if (newEstado === currentPedidoEstado) {
                toast.error("El estado es el mismo");
                setIsChanging(false);
                reject();
                return;
            }

            cambiarEstado({
                id: currentPedidoId,
                estado: newEstado,
                motivos: motivos,
                studentEmail: currentPedidoStudentEmail,
                studentName: currentPedidoStudentName,
                teacherId: sessionData?.user?.id ?? "",
                teacherName: sessionData?.user?.name ?? ""
            }, {
                onSuccess: () => {
                    toast.success("Estado cambiado");
                    void refetch();
                    filterData();
                    setIsChanging(false);
                    resolve();
                    setOpened(false);
                },
                onError: () => {
                    toast.error("Error al cambiar estado");
                    setIsChanging(false);
                    reject();
                }
            })
        })
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
                className="flex flex-col solicitud w-[300px] sm:w-[350px] md:w-[450px] h-[500px] md:h-[800px] bg-modalBackground rounded-lg p-5 px-6 justify-between"
            >
                <div className="flex flex-col gap-7">
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
                        initialValue="Seleccionar..."
                        inputClassName="w-full md:w-full mt-1"
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
                                className="resize-none h-[100px] md:h-[250px]"
                                value={motivos}
                            />
                        )
                    }
                </div>
                <ActionButton
                    className="font-spacemono text-[18px]"
                    isLoading={isChanging}
                    onClick={() => {
                        void handleChangeEstado();
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
                                    <div key={pedido.id} className="solicitud flex flex-col w-[300px] h-fit bg-appshell_background rounded-lg p-6 gap-8">
                                        <div className="flex justify-between items-center">
                                            <Heading className="text-[20px] leading-none">{pedido.user.name}</Heading>
                                            <Text>{formatDate(pedido.fecha)}</Text>
                                        </div>
                                        <div className="flex gap-4 flex-wrap">
                                            <Pill
                                                colorBg={coloresPedido[pedido.estado]}
                                                className="hover:cursor-pointer "
                                                icon={<IconPencil size={20} />}
                                                onClick={() => {
                                                    setOpened(true)
                                                    setCurrentPedidoId(pedido.id);
                                                    setCurrentPedidoStudentEmail(pedido.user.email ?? "");
                                                    setCurrentPedidoStudentName(pedido.user.name ?? "");
                                                    setCurrentPedidoEstado(pedido.estado);
                                                }}>{estadosCambioPedido[pedido.estado].toUpperCase()}
                                            </Pill>
                                            <Pill colorBg="bg-[#b8860b]">{pedido.user.curso}</Pill>
                                            <Pill colorBg={coloresPedido[pedido.materia]}>{pedido.materia}</Pill>
                                            {
                                                pedido.aprobador && <Pill colorBg="bg-[#9b7894]">{pedido.aprobador.name?.toUpperCase()}</Pill>
                                            }
                                        </div>

                                        {
                                            pedido.observacionesAlumno && (
                                                <>
                                                    {/* Esto es solo un divider, bauty del futuro hacelo un componente porfa */}
                                                    <div className="w-full h-[3px] bg-pink_tic"/>

                                                    <div className="h-full">
                                                        <Text className="break-all line-clamp-4 overflow-auto">{`${pedido.observacionesAlumno ? pedido.observacionesAlumno : "No hay notas"}`}</Text>
                                                    </div>
                                                </>
                                            )
                                        }

                                        <div className="flex w-full h-min self-end justify-between">
                                            <ActionButton
                                                className="font-spacemono text-[18px]"
                                                onClick={() => {
                                                    void window.open(`solicitudes/${pedido.id}`, "_blank");
                                                }}
                                            >Ver</ActionButton>
                                            <ActionButton
                                                className="font-spacemono text-[18px]"
                                                onClick={() => {
                                                    const files = pedido.piezas.map(pieza => {
                                                        return {
                                                            url: pieza.url,
                                                            name: pieza.nombre
                                                        }
                                                    });

                                                    const studentInfo = {
                                                        studentName: pedido.user.name ?? "",
                                                        curso: pedido.user.curso
                                                    }

                                                    void downloadAsZip(files, studentInfo);
                                                }}
                                            >Descargar</ActionButton>
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