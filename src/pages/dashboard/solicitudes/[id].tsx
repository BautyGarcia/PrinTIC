import React, { useEffect, useState } from 'react';
import { Subtitle, Title, Text, Pill } from '~/components/utils/texts';
import { useRouter } from 'next/router';
import { type NextPage } from 'next';
import { api } from '~/utils/api';
import { ActionButton } from '~/components/utils/buttons';
import Head from 'next/head';
import Glassbox from '~/components/utils/glassbox';
import { IconChevronLeft, IconMessageX } from '@tabler/icons-react';
import Carousel from '~/components/utils/carousel';
import { downloadAsZip } from '~/utils/downloadFile';
import SolicitudesScreenSkeleton from '~/components/skeletons/solicitudScreenSkeleton';
import { TextZone } from '~/components/utils/inputs';
import { toast } from 'react-toastify';

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

interface FileInfo {
    url: string,
    name: string
}

const Solicitud: NextPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const { data: pedido, isLoading, refetch } = api.pedidos.getPedidoById.useQuery({
        id: id as string
    });
    const { mutate: createNote } = api.pedidos.agregarNota.useMutation();
    const [nombrePieza, setNombrePieza] = useState("");
    const [cantidadPieza, setCantidadPieza] = useState(0);
    const [activeIndex, setActiveIndex] = useState(0);
    const [studentInfo, setStudentInfo] = useState({
        studentName: "",
        curso: ""
    });
    const [files, setFiles] = useState<FileInfo[]>([]);
    const [note, setNote] = useState("");
    const [isSendingNote, setIsSendingNote] = useState(false);

    useEffect(() => {
        if (pedido) {
            setNombrePieza(pedido.piezas[activeIndex]?.nombre ?? "");
            setCantidadPieza(pedido.piezas[activeIndex]?.cantidad ?? 0);
            setStudentInfo({
                studentName: pedido.user.name ?? "",
                curso: pedido.user.curso
            });
            setFiles(pedido.piezas.map(pieza => {
                return {
                    url: pieza.url,
                    name: pieza.nombre
                }
            }));
        }
    }, [pedido, activeIndex]);

    const handleCreateComment = () => {
        setIsSendingNote(true);
        createNote({
            id: id as string,
            nota: note
        }, {
            onSuccess: () => {
                setIsSendingNote(false);
                setNote("");
                void refetch();
                toast.success("Nota enviada exitosamente");
            },
            onError: () => {
                setIsSendingNote(false);
                toast.error("Hubo un error al enviar la nota");
            }
        })
    }

    return (
        <>
            <Head>
                <title>PrinTIC - Piezas</title>
                <meta name='description' content='PrinTIC' />
                <link rel='icon' href='/general/ticLogo.ico' />
            </Head>
            <div className='flex flex-col md:flex-row relative z-10 w-screen max-md:min-h-screen md:h-screen p-12 px-12 gap-10 pb-[6rem]'>
                <div className='flex flex-col h-full w-full md:w-1/2 gap-8'>
                    {isLoading ? (
                        <SolicitudesScreenSkeleton />
                    ) : (
                        <>
                            <Title className='font-spacemono font-bold flex items-center text-xl md:text-[24px] hover:cursor-pointer'><IconChevronLeft size={30} />{`REGRESAR`}</Title>
                            <div className='flex flex-col gap-4'>
                                <Title className='font-spacemono font-bold tracking-[4px] md:text-[32px] text-center md:text-left'>SOLICITUD</Title>
                                <div className='flex items-center gap-[2rem] justify-center md:justify-start'>
                                    <Subtitle className='leading-none font-ralewayBase md:text-[5rem]'>{pedido?.user.name}</Subtitle>
                                    <div className='bg-grayTranslucent w-fit p-1 px-3 rounded-md'>
                                        <Text>{pedido?.user.curso} | {pedido?.materia}</Text>
                                    </div>
                                </div>
                                <div className='flex gap-2 justify-center md:justify-start'>
                                    <Pill colorBg={coloresPedido[pedido?.estado ?? "PENDIENTE"]}>{pedido?.estado}</Pill>
                                    {pedido?.aprobador && <Pill colorBg="bg-[#9b7894]">{pedido?.aprobador?.name}</Pill>}
                                </div>
                            </div>
                            <div className='solicitud flex flex-col flex-grow justify-between bg-appshell_secondary rounded-lg overflow-y-auto p-8 pt-0'>
                                {
                                    pedido?.observacionesProfesor.map((observacion, index) => {
                                        return (
                                            <div key={index} className='flex flex-col md:flex-row gap-6 items-center py-8 border-b-[1px] border-b-pink_tic'>
                                                <Pill colorBg='bg-[#FF6C31]' className='w-[80px] self-start h-fit justify-center'>{observacion.profesor.name}</Pill>
                                                <Text className='flex-grow md:w-min text-sm md:text-[20px]'>{observacion.texto}</Text>
                                            </div>
                                        )
                                    })
                                }
                                {
                                    pedido?.observacionesProfesor.length === 0 && (
                                        <div className='flex h-full flex-col items-center justify-center pt-8'>
                                            <IconMessageX size={80} />
                                            <Text className='text-lg text-center'>No hay notas</Text>
                                            <Text className='text-sm text-center'>(Poca pala)</Text>
                                        </div>
                                    )
                                }
                            </div>
                            <div className='solicitud flex w-full justify-between bg-appshell_secondary min-h-[100px] p-4 gap-4 rounded-lg'>
                                <TextZone
                                    value={note}
                                    setValue={setNote}
                                    placeholder='Opino que...'
                                    className='resize-none w-full'
                                />
                                <ActionButton
                                    className='flex items-center  self-end font-spacemono'
                                    isLoading={isSendingNote}
                                    onClick={handleCreateComment}
                                >
                                    {isSendingNote ? "" : "Enviar"}
                                </ActionButton>
                            </div>
                            <ActionButton
                                className='font-spacemono px-8 text-lg w-fit'
                                onClick={() => downloadAsZip(files, studentInfo)}
                            >
                                DESCARGAR TODO
                            </ActionButton>
                        </>
                    )}
                </div>
                <div className='flex h-full w-full md:w-1/2 pt-[4rem]'>
                    <Glassbox
                        className='h-full w-full'
                        containerClassName='w-full h-full'
                    >
                        <Carousel
                            stl_list={pedido?.piezas.map(pieza => pieza.url) ?? []}
                            activeIndex={activeIndex}
                            setActiveIndex={setActiveIndex}
                            isFetching={isLoading}
                            activeFile={{
                                nombre: nombrePieza,
                                cantidad: cantidadPieza
                            }}
                        />
                    </Glassbox>
                </div>
            </div>
        </>
    );
};

export default Solicitud;