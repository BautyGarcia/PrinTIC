import Image from "next/image"

const TicLogo: React.FC = () => {
    return (
        <Image src={"/general/ticLogo.png"} width={50} height={50} alt="Tic"/>
    )
}

export default TicLogo;