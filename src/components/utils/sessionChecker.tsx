import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const SessionChecker = () => {
    const { data: sessionData } = useSession();
    const router = useRouter();
    
    useEffect(() => {
      const redirectTimeout = setTimeout(() => {
        if (!sessionData) {
          void router.push("/ingreso");
        }
      }, 500);
      return () => clearTimeout(redirectTimeout);
    }, [router, sessionData]);

    return null;
}

export default SessionChecker;