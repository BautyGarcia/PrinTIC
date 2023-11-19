import { useWindowSize } from "~/hooks/useWindowSize";
import UserBox from "./userBox";
import { useEffect, useState } from "react";

const DashboardNavBar = ({ isOpened, nombre, curso }: { isOpened: boolean, nombre: string, curso: string }) => {
    const [isMounted, setIsMounted] = useState(false);
    const { width } = useWindowSize();
    const isMobile = width < 800;

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }
    
    return (
        <section className={isMobile ? 
            `${isOpened ? "dashboard-nav-open" : "dashboard-nav"} md:block h-full bg-appshell_background` :
            `w-[300px] h-full bg-appshell_background`
        }>
            {/* Este div se muestra solo en Desktop mode */}
            <div className="flex flex-col md:hidden">
                <UserBox nombre={nombre} curso={curso} className="flex"/>
            </div>
            {/* Este div se muestra solo en Mobile mode */}
            <div className="hidden md:flex flex-col">
                
            </div>
        </section>
    )
}

export default DashboardNavBar;