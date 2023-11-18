import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import AppShell from "~/components/dashboard/appShell";

interface DashboardProps {
  children: React.ReactNode;
}

const Dashboard: NextPage<DashboardProps> = ({ children }) => {
  const { data: session } = useSession();
  
  return (
    <AppShell>
      <div className="w-full h-full">
        <h1>asdasd</h1>
      </div>
    </AppShell>
  );
};

export default Dashboard;
