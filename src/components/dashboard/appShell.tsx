import DashboardNavBar from "./dashboardNavBar";
import DashboardHeader from "./dashboardHeader";
import React, { useState } from "react";

const AppShell = ({ children, nombre, curso }: { children: React.ReactNode, nombre: string, curso: string }) => {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <section className="relative z-10 flex h-screen flex-col">
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
