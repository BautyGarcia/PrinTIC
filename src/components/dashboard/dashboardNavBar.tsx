import { useWindowSize } from "~/hooks/useWindowSize";
import { useEffect, useState } from "react";
import { ActionButton } from "../utils/buttons";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import UserBox from "./userBox";

const DashboardNavBar = ({ isOpened, nombre, curso }: { isOpened: boolean, nombre: string, curso: string }) => {
    const [isMounted, setIsMounted] = useState(false);
    const { data: sessionData } = useSession();
    const { width } = useWindowSize();
    const isMobile = width < 800;
    const router = useRouter();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <section className={isMobile ?
            `${isOpened ? "dashboard-nav-open w-screen" : "dashboard-nav"} absolute h-full bg-appshell_background` :
            `w-[300px] h-full bg-appshell_background`
        }>
            {/* Este div se muestra solo en Mobile mode */}
            <div className="flex flex-col md:hidden">
                <UserBox nombre={nombre} curso={curso} className="flex" />
            </div>
            {/* Este div se muestra solo en Desktop mode */}
            <div className="hidden md:flex flex-col p-5 gap-5">
                {
                    sessionData?.user?.role !== "STUDENT" && (
                        <ActionButton className="font-spacemono" onClick={() => void router.push("/dashboard/solicitudes")}>Solicitudes</ActionButton>
                    )
                }

                {
                    sessionData?.user?.role !== "TEACHER" && (
                        <>
                            <ActionButton className="font-spacemono" onClick={() => void router.push("/dashboard/subir")}>Subir Archivo</ActionButton>
                            <ActionButton className="font-spacemono" onClick={() => void router.push("/dashboard/cuantoFalta")}>¿Cuanto falta?</ActionButton>
                        </>
                    )
                }
            </div>
        </section>
    )
}

export default DashboardNavBar;