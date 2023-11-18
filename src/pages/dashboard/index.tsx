import { type NextPage } from "next";
import AppShell from "~/components/dashboard/appShell";
import { useSession } from "next-auth/react";

interface DashboardProps {
  children: React.ReactNode;
}

const Dashboard: NextPage<DashboardProps> = ({ children }) => {
  const { data: session } = useSession();
  
  return (
    <AppShell>
      <div className="w-full h-full">
        {children}
      </div>
    </AppShell>
  );
};

export default Dashboard;
