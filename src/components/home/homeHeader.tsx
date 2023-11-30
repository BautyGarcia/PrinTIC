import TicIcon from "~/components/icons/ticIcon";
import { useRouter } from "next/router";
import { ShowcaseButton } from "../utils/buttons";

const HomeHeader = () => {
    const router = useRouter();
    
    return (
        <header className="relative z-10 flex items-center h-[60px] md:h-[100px] w-screen px-7">
            <div className="flex w-full justify-between items-center">
                <TicIcon redirect="/"/>
                <ShowcaseButton onClick={() => void router.push("/ingreso")} className="bg-transparent p-3">Entrar</ShowcaseButton>
            </div>
        </header>
    )
}

export default HomeHeader;