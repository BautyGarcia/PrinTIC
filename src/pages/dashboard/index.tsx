import { type NextPage } from "next";
import AppShell from "~/components/dashboard/appShell";
import SessionChecker from "~/components/utils/sessionChecker";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

interface DashboardProps {
  children: React.ReactNode;
}

const Dashboard: NextPage<DashboardProps> = ({ children }) => {
  const { data: sessionData } = useSession();
  const router = useRouter();

  useEffect(() => {
    const route = router.pathname;

    if(route === "/dashboard") {
      sessionData?.user?.role === "STUDENT" && void router.push("/dashboard/subir");
      sessionData?.user?.role === "TEACHER" && void router.push("/dashboard/solicitudes");
    }
  }, [sessionData, router]);

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
