import { type NextPage } from "next";
import AppShell from "~/components/dashboard/appShell";
import SessionChecker from "~/components/utils/sessionChecker";
import { useSession } from "next-auth/react";

interface DashboardProps {
  children: React.ReactNode;
}

const Dashboard: NextPage<DashboardProps> = ({ children }) => {
  const { data: sessionData } = useSession();
  
  return (
    <>
      <SessionChecker />
      <AppShell nombre={sessionData?.user?.name ?? "Anonimo"} curso={sessionData?.user?.curso ?? "Anonimo"}>
        <div className="w-full h-full">
          {children}
        </div>
      </AppShell>
    </>
  );
};

export default Dashboard;
