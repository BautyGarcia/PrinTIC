import { type NextPage } from "next";
import Dashboard from ".";
import Head from "next/head";

const Solicitudes: NextPage = () => {
    return (
        <>
            <Head>
                <title>PrinTIC - Solicitudes</title>
                <meta name="description" content="PrinTIC" />
                <link rel="icon" href="/general/ticLogo.ico" />
            </Head>
            <Dashboard>
                <h1>Solicitudes</h1>
            </Dashboard>
        </>
    )
}

export default Solicitudes