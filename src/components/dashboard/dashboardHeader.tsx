import TicXIcon from "../icons/ticIcon";
import { IconMenu2 } from "@tabler/icons-react";
import UserBox from "./userBox";

const DashboardHeader = ({ 
  opened, 
  setIsOpened, 
  nombre, 
  curso 
}: { 
  opened: boolean, 
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>,
  nombre: string,
  curso: string
}) => {
  return (
    <header className={`${ opened ? "hidden": "flex" } justify-between relative z-10 w-full h-[60px] md:h-[100px] bg-appshell_background items-center p-5`}>
      <TicXIcon />
      <UserBox nombre={nombre} curso={curso} className="hidden md:flex"/>
      <div onClick={() => setIsOpened(!opened)} className="md:hidden hover:bg-appshell_background_hover rounded-md">
        <IconMenu2 className="" size={50} />
      </div>
    </header>
  );
};

export default DashboardHeader;
