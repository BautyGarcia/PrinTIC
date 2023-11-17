import { Button } from "@mantine/core";
import TicLogo from "~/components/logos/ticLogo";

const HomeHeader: React.FC = () => {
    return (
        <header className="flex items-center h-[80px] bg-purple_tic w-screen px-5">
            <div className="flex w-full justify-between">
                <TicLogo />
                <Button variant="light" color="purple" size="lg">Iniciar sesión</Button>
            </div>
        </header>
    )
}

export default HomeHeader;