import Image from "next/image";
import Link from "next/link";

const TicIcon = ({ redirect }: { redirect?: string }) => {
  return (
    <Link href={redirect ?? ""}>
      <Image src={"/general/ticLogo.svg"} width={10} height={10} className="w-[30px] h-[30px] md:w-[45px] md:h-[45px]" alt="Tic" priority />
    </Link>
  );
};

export default TicIcon;
