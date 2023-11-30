import DashboardNavBar from "./dashboardNavBar";
import DashboardHeader from "./dashboardHeader";
import React, { useState } from "react";
import { useWindowSize } from "~/hooks/useWindowSize";

const AppShell = ({ children, nombre, curso }: { children: React.ReactNode, nombre: string, curso: string }) => {
  const [opened, setOpened] = useState(false);
  const { width } = useWindowSize();
  const isOverflowHidden = width > 1120;

  return (
    <>
      <section className={`relative overflow-hidden z-10 flex h-screen flex-col`}>
        <DashboardHeader opened={opened} setIsOpened={setOpened} nombre={nombre} curso={curso} />
        <div className="flex h-full">
          <DashboardNavBar isOpened={opened} nombre={nombre} curso={curso} setOpen={setOpened}/>
          {children}
        </div>
      </section>
    </>
  );
};

export default AppShell;
