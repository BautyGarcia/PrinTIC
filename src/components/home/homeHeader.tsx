import TicIcon from "~/components/icons/ticIcon";
import { useRouter } from "next/router";
import { ShowcaseButton } from "../utils/buttons";

const HomeHeader = () => {
    const router = useRouter();
    return (
        <header className="flex items-center h-[100px] bg-purple_tic w-screen px-7">
            <div className="flex w-full justify-between">
                <TicIcon />
                <ShowcaseButton value="Entrar" onClick={() => void router.push("/ingreso")} className="bg-transparent p-3"/>
            </div>
        </header>
    )
}

export default HomeHeader;