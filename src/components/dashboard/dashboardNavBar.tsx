import { useWindowSize } from "~/hooks/useWindowSize";
import UserBox from "./userBox";

const DashboardNavBar = ({ isOpened, nombre, curso }: { isOpened: boolean, nombre: string, curso: string }) => {
    const { width } = useWindowSize();
    const isMobile = width < 800;
    
    return (
        <section className={isMobile ? 
            `dashboard-nav ${isOpened ? "dashboard-nav-open" : ""} md:block h-full bg-appshell_background` :
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