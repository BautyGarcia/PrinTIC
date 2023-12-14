import React, { useEffect, useState } from 'react';
import { Heading, Subtitle, Title, Text, Pill } from '~/components/utils/texts';
import { useRouter } from 'next/router';
import { type NextPage } from 'next';
import { api } from '~/utils/api';
import { StlViewer } from 'react-stl-viewer';
import { ActionButton } from '~/components/utils/buttons';
import Head from 'next/head';
import Glassbox from '~/components/utils/glassbox';
import { PageLoader } from '~/components/utils/loaders';
import { IconChevronLeft } from '@tabler/icons-react';

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

const Solicitud: NextPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const { data: pedido, isLoading } = api.pedidos.getPedidoById.useQuery({
        id: id as string
    });
    const [nombrePieza, setNombrePieza] = useState("");
    const [cantidadPieza, setCantidadPieza] = useState(0);
    const [urlPieza, setUrlPieza] = useState("");
    const [activeIndex, setActiveIndex] = useState(0);
    const [isLoadingSTL, setIsLoadingSTL] = useState(true);

    useEffect(() => {
        if (pedido) {
            setNombrePieza(pedido.piezas[activeIndex]?.nombre ?? "");
            setCantidadPieza(pedido.piezas[activeIndex]?.cantidad ?? 0);
            setUrlPieza(pedido.piezas[activeIndex]?.url ?? "");
        }
    }, [pedido, activeIndex]);

    const handleDownload = (url: string, fileName: string) => {
        const a = document.createElement("a");
        a.href = url;
        a.download = fileName || 'download';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    return (
        <>
            <Head>
                <title>PrinTIC - Piezas</title>
                <meta name='description' content='PrinTIC' />
                <link rel='icon' href='/general/ticLogo.ico' />
            </Head>
            <div className='flex flex-col md:flex-row relative z-10 w-screen h-screen p-12 px-12 gap-10 pb-[6rem]'>
                <div className='flex flex-col h-full w-1/2 gap-8'>
                    <Title className='font-spacemono font-bold flex items-center md:text-[24px] hover:cursor-pointer'><IconChevronLeft size={30} />{`REGRESAR`}</Title>
                    <div className='flex flex-col gap-4'>
                        <Title className='font-spacemono font-bold tracking-[4px] md:text-[32px]'>SOLICITUD</Title>
                        <div className='flex items-center gap-[2rem]'>
                            <Subtitle className='leading-none font-ralewayBase md:text-[5rem]'>{pedido?.user.name}</Subtitle>
                            <div className='bg-grayTranslucent w-fit p-1 px-3 rounded-md'>
                                <Text>{pedido?.user.curso} | {pedido?.materia}</Text>
                            </div>
                        </div>
                        <div className='flex gap-2'>
                            <Pill colorBg={coloresPedido[pedido?.estado ?? "PENDIENTE"]}>{pedido?.estado}</Pill>
                            {pedido?.aprobador && <Pill colorBg="bg-[#9b7894]">{pedido?.aprobador?.name}</Pill>}
                        </div>
                    </div>
                    <div className='solicitud flex flex-col flex-grow bg-appshell_secondary rounded-lg p-8 overflow-y-auto gap-8'>
                        {
                            pedido?.observacionesProfesor.map((observacion, index) => {
                                return (
                                    <div key={index} className='flex gap-6 items-center pb-8 border-b-[1px] border-b-pink_tic'>
                                        <Pill colorBg='bg-[#FF6C31]' className='w-[80px] h-fit text-center'>{observacion.profesor.name}</Pill>
                                        <Text className='flex-grow w-min'>{observacion.texto}</Text>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <ActionButton className='font-spacemono px-8 text-lg w-fit'>
                        DESCARGAR TODO
                    </ActionButton>
                </div>
                <div className='flex h-full w-1/2 pt-[4rem]'>
                    <Glassbox
                        className='h-full w-full'
                        containerClassName='w-full h-full'
                    >
                        <></>
                    </Glassbox>
                </div>
            </div>
        </>
    );
};

export default Solicitud;


/**
 *                 <div className='flex flex-col justify-center h-full w-full md:w-1/2 gap-5'>
                    <div className='flex w-full h-[80px] gap-5 overflow-x-auto'>
                        {
                            pedido?.piezas.map((pieza, index) => {
                                return (
                                    <ActionButton
                                        key={index}
                                        className={`w-min h-min p-5 px-8 text-xl font-spacemono  ${activeIndex === index ? "bg-[#FFF] text-pink_tic hover:bg-[#DDD]" : ""}`}
                                        onClick={() => {
                                            setNombrePieza(pieza.nombre);
                                            setCantidadPieza(pieza.cantidad);
                                            setUrlPieza(pieza.url);
                                            setActiveIndex(index);
                                        }}
                                    >{`${index + 1}`}</ActionButton>
                                )
                            })
                        }
                    </div>
                    {
                        urlPieza && (
                            <Glassbox
                                className='h-2/3 w-full'
                                containerClassName='w-full h-full'
                            >
                                {
                                    isLoadingSTL && (
                                        <div className='flex w-full h-full justify-center items-end mt-10'>
                                            <PageLoader />
                                        </div>
                                    )
                                }
                                <StlViewer
                                    url={urlPieza}
                                    orbitControls
                                    className={`h-full w-full`}
                                    onFinishLoading={() => setIsLoadingSTL(false)}
                                    onError={() => setIsLoadingSTL(false)}
                                />
                            </Glassbox>
                        )
                    }
                    <ActionButton
                        className='text-xl w-fit p-3 font-spacemono self-center md:self-start'
                        onClick={() => handleDownload(urlPieza, nombrePieza)}
                    >Descargar esta pieza</ActionButton>
                </div>
                <div className={`flex flex-col h-min w-1/2 gap-4 items-center self-center text-center`}>
                    {
                        isLoading ? (
                            <PageLoader />
                        ) : (
                            <>
                                <div>
                                    <Heading className='md:text-[75px]'>{`${pedido?.user.name} - ${pedido?.user.curso}`}</Heading>
                                    <Heading className=''>{`Materia: ${pedido?.materia}`}</Heading>
                                </div>
                                <div>
                                    <Heading className='flex flex-row'>{`${cantidadPieza}x ${nombrePieza}`}</Heading>
                                </div>
                                <div>
                                    <Heading>
                                        {pedido?.observacionesAlumno || "No hay notas"}
                                    </Heading>
                                </div>
                            </>
                        )
                    }
                </div>
 */