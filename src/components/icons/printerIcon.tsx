import Image from "next/image";

const PrinterIcon = ({ width, height }: { width: number, height: number }) => {
    return (
        <Image src={"/utils/printerIcon.png"} alt="printer" width={width} height={height}/>
    )
}

export default PrinterIcon;