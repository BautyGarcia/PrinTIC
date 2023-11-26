import React, { useEffect, useState } from 'react';
import { Heading } from '~/components/utils/texts';
import { useRouter } from 'next/router';
import { type NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { api } from '~/utils/api';
import { StlViewer } from 'react-stl-viewer';
import { ActionButton } from '~/components/utils/buttons';
import Head from 'next/head';
import Glassbox from '~/components/utils/glassbox';

const Solicitud: NextPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const { data: sessionData } = useSession();
    const { data: pedido } = api.pedidos.getPedidoById.useQuery({
        id: id as string
    });
    const [nombrePieza, setNombrePieza] = useState("");
    const [cantidadPieza, setCantidadPieza] = useState(0);
    const [urlPieza, setUrlPieza] = useState("");
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        if (pedido) {
            setNombrePieza(pedido.piezas[0]?.nombre ?? "");
            setCantidadPieza(pedido.piezas[0]?.cantidad ?? 0);
            setUrlPieza(pedido.piezas[0]?.url ?? "");
        }
    }, [pedido]);

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
            <div className='relative z-10 w-screen h-screen max-h-screen'>
                <div className='flex flex-col h-full w-full justify-between gap-8 p-5 px-10'>
                    <div className='flex flex-col gap-8'>
                        <Heading className='truncate'>{`${sessionData?.user?.name} - ${nombrePieza}`}</Heading>
                        <Heading className='truncate'>{`Cantidad: ${cantidadPieza}`}</Heading>
                        <div className='flex w-[50%] h-[80px] gap-5 overflow-x-scroll'>
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
                    </div>
                    <div className='flex flex-row w-full h-full gap-6 self-end'>
                        {
                            urlPieza && (
                                <Glassbox
                                    className='min-w-[50%] h-[95%]'
                                    containerClassName='w-full h-full'
                                >
                                    <StlViewer
                                        url={urlPieza}
                                        orbitControls
                                        className='h-full w-full'
                                    />
                                </Glassbox>
                            )
                        }
                        <div className='flex flex-col justify-between h-[95%]'>
                            <Heading className='w-[50%] h-[70%]'>{`${pedido?.observacionesAlumno}`}</Heading>
                            <ActionButton 
                                className='text-xl w-min p-3 font-spacemono'
                                onClick={() => handleDownload(urlPieza, nombrePieza)}
                            >Descargar</ActionButton>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Solicitud;
