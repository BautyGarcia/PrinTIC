import { Button } from "@mantine/core";
import TicIcon from "~/components/icons/ticIcon";
import { useRouter } from "next/router";

const HomeHeader = () => {
    const router = useRouter();
    return (
        <header className="flex items-center h-[100px] bg-purple_tic w-screen px-7">
            <div className="flex w-full justify-between">
                <TicIcon />
                <Button 
                    className="text-[#FFF] mr-5 font-spacemono font-bold"
                    onClick={() => void router.push("/ingreso")}
                >Entrar</Button>
            </div>
        </header>
    )
}

export default HomeHeader;