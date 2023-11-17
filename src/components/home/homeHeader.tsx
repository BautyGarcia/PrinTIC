import { Button } from "@mantine/core";
import TicLogo from "~/components/logos/ticLogo";

const HomeHeader: React.FC = () => {
    return (
        <header className="flex items-center h-[80px] bg-purple_tic w-screen px-7">
            <div className="flex w-full justify-between">
                <TicLogo />
                <Button className="text-[#FFF] font-spacemono font-bold">Entrar</Button>
            </div>
        </header>
    )
}

export default HomeHeader;