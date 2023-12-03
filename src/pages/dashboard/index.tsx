import { type NextPage } from "next";
import AppShell from "~/components/dashboard/appShell";
import SessionChecker from "~/components/utils/sessionChecker";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Head from "next/head";

interface DashboardProps {
  children: React.ReactNode;
  isOverflowHidden?: boolean;
}

const Dashboard: NextPage<DashboardProps> = ({ children, isOverflowHidden = true }) => {
  const { data: sessionData } = useSession();
  const router = useRouter();

  useEffect(() => {
    const route = router.pathname;

    if (route !== "/dashboard/cuantoFalta" && route !== "/dashboard/subir" && route !== "/dashboard/solicitudes") {
      sessionData?.user?.role === "STUDENT" && void router.push("/dashboard/subir");
      sessionData?.user?.role === "TEACHER" && void router.push("/dashboard/solicitudes");
    }
  }, [sessionData, router]);

  return (
    <>
      <Head>
        <title>PrinTIC - Dashboard</title>
        <meta name="description" content="PrinTIC" />
        <link rel="icon" href="/general/ticLogo.ico" />
      </Head>
      <SessionChecker />
      <AppShell nombre={sessionData?.user?.name ?? "Anonimo"} curso={sessionData?.user?.curso ?? "Anonimo"}>
        <div className={`w-full h-full ${isOverflowHidden ? "overflow-hidden" : "overflow-auto"}`}>
          {children}
        </div>
      </AppShell>
    </>
  );
};

export default Dashboard;
