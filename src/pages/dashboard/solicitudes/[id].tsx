import React, { useEffect, useState } from 'react';
import { Heading } from '~/components/utils/texts';
import { useRouter } from 'next/router';
import { type NextPage } from 'next';
import { api } from '~/utils/api';
import { StlViewer } from 'react-stl-viewer';
import { ActionButton } from '~/components/utils/buttons';
import Head from 'next/head';
import Glassbox from '~/components/utils/glassbox';
import { PageLoader } from '~/components/utils/loaders';

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
            <div className='flex flex-col md:flex-row relative z-10 w-screen h-screen p-5 gap-5'>
                <div className='flex flex-col justify-center h-full w-full md:w-1/2 gap-5'>
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
                                        {/*eslint-disable-next-line*/}
                                        {pedido?.observacionesAlumno || "No hay notas"}
                                    </Heading>
                                </div>
                            </>
                        )
                    }
                </div>
            </div>
        </>
    );
};

export default Solicitud;