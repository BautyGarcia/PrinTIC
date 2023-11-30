import Image from "next/image";

const TicIcon = () => {
  return (
    <Image src={"/general/ticLogo.svg"} width={10} height={10} className="w-[30px] h-[30px] md:w-[45px] md:h-[45px]" alt="Tic" priority/>
  );
};

export default TicIcon;
