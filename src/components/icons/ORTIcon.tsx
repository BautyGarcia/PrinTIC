import Image from "next/image";

const ORTIcon = ({ width, height }: { width: number, height: number }) => {
    return (
        <Image src={"/general/ORT.png"} width={width} height={height} alt="ORT" />
    )
}

export default ORTIcon;