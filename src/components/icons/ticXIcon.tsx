import Image from "next/image";

const TicXIcon = ({ width, height }: { width: number, height: number }) => {
    return (
        <Image src={"/general/ticX.svg"} width={width} height={height} alt="TicX" />
    )
}

export default TicXIcon;