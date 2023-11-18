import { useSession } from "next-auth/react";
import { useWindowSize } from "~/hooks/useWindowSize";

const DashboardNavBar = ({ isOpened }: { isOpened: boolean }) => {
    const { data: session } = useSession();
    const { width } = useWindowSize();
    const isMobile = width < 800;

    return (
        <section className={isMobile ? 
            `dashboard-nav ${isOpened ? "dashboard-nav-open" : ""} md:block h-full bg-appshell_background` :
            `w-[300px] h-full bg-appshell_background`
        }>

        </section>
    )
}

export default DashboardNavBar;