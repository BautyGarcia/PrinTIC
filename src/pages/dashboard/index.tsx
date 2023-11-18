import { type NextPage } from "next";
import AppShell from "~/components/dashboard/appShell";

interface DashboardProps {
  children: React.ReactNode;
}

const Dashboard: NextPage<DashboardProps> = ({ children }) => {  
  return (
    <AppShell>
      <div className="w-full h-full">
        {children}
      </div>
    </AppShell>
  );
};

export default Dashboard;
