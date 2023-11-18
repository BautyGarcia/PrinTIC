import { type NextPage } from "next"
import { useSession } from "next-auth/react"

const Dashboard: NextPage = () => {
    const { data: sessionData } = useSession();
    console.log(sessionData);
    return <h1>En progreso...</h1>
}

export default Dashboard;