import TicXIcon from "../icons/ticIcon";
import { IconMenu2, IconX } from "@tabler/icons-react";
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
    <header className="z-10 flex justify-between w-screen h-[100px] bg-appshell_background items-center p-5">
      <TicXIcon width={75} height={75} />
      <UserBox nombre={nombre} curso={curso} className="hidden md:flex"/>
      <div onClick={() => setIsOpened(!opened)} className="md:hidden p-1 hover:bg-appshell_background_hover rounded-md">
        {opened ? <IconX className="" size={50} /> : <IconMenu2 className="" size={50} />}
      </div>
    </header>
  );
};

export default DashboardHeader;
