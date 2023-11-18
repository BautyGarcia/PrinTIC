import DashboardNavBar from "./dashboardNavBar";
import DashboardHeader from "./dashboardHeader";
import React from "react";

const AppShell = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="flex h-screen flex-col">
      <DashboardHeader />
      <div className="flex h-full">
        <DashboardNavBar />
        {children}
      </div>
    </section>
  );
};

export default AppShell;
