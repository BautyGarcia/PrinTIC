import Image from "next/image";

const TicIcon = ({ width, height }: { width: number; height: number }) => {
  return (
    <Image src={"/general/ticLogo.svg"} width={width} height={height} alt="Tic" priority/>
  );
};

export default TicIcon;
