import Image from "next/image";

const PrinterIcon = ({ width, height }: { width: number, height: number }) => {
    return (
        <Image src={"/utils/printerIcon.svg"} alt="printer" width={width} height={height} className="hidden md:block"/>
    )
}

export default PrinterIcon;