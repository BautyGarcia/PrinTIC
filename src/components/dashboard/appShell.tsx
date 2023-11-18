import DashboardNavBar from "./dashboardNavBar";
import DashboardHeader from "./dashboardHeader";
import React, { useState } from "react";

const AppShell = ({ children }: { children: React.ReactNode }) => {
  const [opened, setOpened] = useState(false);
  
  return (
    <section className="flex h-screen flex-col">
      <DashboardHeader opened={opened} setIsOpened={setOpened}/>
      <div className="flex h-full">
        <DashboardNavBar isOpened={opened}/>
        {children}
      </div>
    </section>
  );
};

export default AppShell;
