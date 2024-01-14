import { type Dispatch, useState } from "react";
import { motion } from "framer-motion";
import { StlViewer } from "react-stl-viewer";
import { IconChevronLeft, IconChevronRight, IconDownload } from "@tabler/icons-react";
import { PageLoader } from "./loaders";
import { handleDownload } from "~/utils/downloadFile";

interface STLFile {
    nombre: string,
    cantidad: number,
}

const Carousel = ({
    stl_list,
    activeIndex,
    setActiveIndex,
    isFetching,
    activeFile
}: {
    stl_list: string[],
    activeIndex: number,
    setActiveIndex: Dispatch<React.SetStateAction<number>>,
    isFetching: boolean,
    activeFile: STLFile
}) => {
    const [isLoadingSTL, setIsLoadingSTL] = useState(true);

    const handleNext = () => {
        if (stl_list.length === 1) return;
        setIsLoadingSTL(true);
        setActiveIndex((prevIndex) =>
            prevIndex + 1 === stl_list.length ? 0 : prevIndex + 1
        );
    };

    const handlePrevious = () => {
        if (stl_list.length === 1) return;
        setIsLoadingSTL(true);
        setActiveIndex((prevIndex) =>
            prevIndex - 1 < 0 ? stl_list.length - 1 : prevIndex - 1
        );
    };

    return (
        <div className="h-full w-full">
            <div className="flex justify-end w-full absolute p-3">
                <motion.button 
                    whileHover={{
                        
                    }}
                    onClick={() => handleDownload(stl_list[activeIndex] ?? "", `${activeFile.cantidad}x ${activeFile.nombre}`)}
                    className="z-10 aspect-square items-center p-2.5 bg-pink_tic hover:bg-pink_tic_hover rounded-md button-animation">
                        <IconDownload size={40}/>
                </motion.button>
            </div>
            <div className="absolute w-full top-[50%] flex justify-between px-2">
                <motion.button
                    className="z-10 rounded-md cursor-pointer"
                    whileHover={{
                        backgroundColor: "rgba(255,255,255,0.15)",
                        transition: { duration: 0.1 },
                    }}
                    whileTap={{
                        translateY: 2,
                    }}
                    onClick={handlePrevious}
                >
                    <IconChevronLeft size={60} />
                </motion.button>
                <motion.button
                    className="z-10 rounded-md cursor-pointer"
                    whileHover={{
                        backgroundColor: "rgba(255,255,255,0.15)",
                        transition: { duration: 0.1 },
                    }}
                    whileTap={{
                        translateY: 2,
                    }}
                    onClick={handleNext}
                >
                    <IconChevronRight size={60} />
                </motion.button>
            </div>
            {
                isFetching ? (
                    <div className='flex w-full h-full justify-center items-center'>
                        <PageLoader />
                    </div>
                ) : (
                    <>
                        {
                            isLoadingSTL && (
                                <div className='flex w-full h-full justify-center items-center'>
                                    <PageLoader />
                                </div>
                            )
                        }
                        <StlViewer
                            url={stl_list[activeIndex] ?? ""}
                            orbitControls
                            canvasId="stl-canvas"
                            className={`h-full w-full`}
                            onFinishLoading={() => setIsLoadingSTL(false)}
                            onError={() => setIsLoadingSTL(false)}
                        />
                    </>
                )
            }
            <div className="flex justify-center absolute w-full h-5 bottom-[15px]">
                <h1 className="font-spacemono">{activeIndex + 1} de {stl_list.length}</h1>
            </div>
        </div>
    )
}

export default Carousel;