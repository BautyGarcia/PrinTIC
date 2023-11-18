import TicXIcon from "../icons/ticIcon";
import { IconMenu2, IconX } from "@tabler/icons-react";

const DashboardHeader = ({ opened, setIsOpened }: { opened: boolean, setIsOpened: React.Dispatch<React.SetStateAction<boolean>> }) => {
  return (
    <header className="z-10 flex justify-between w-screen h-[100px] bg-appshell_background items-center p-5">
      <TicXIcon width={75} height={75} />
      <div onClick={() => setIsOpened(!opened)} className="p-1 hover:bg-appshell_background_hover rounded-md">
        {opened ? <IconX className="md:hidden" size={50} /> : <IconMenu2 className="md:hidden" size={50} />}
      </div>
    </header>
  );
};

export default DashboardHeader;
