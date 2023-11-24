import { type NextPage } from "next";
import Dashboard from ".";
import Head from "next/head";

const CuantoFalta: NextPage = () => {
    return (
        <>
            <Head>
                <title>PrinTIC - ¿Cuanto falta?</title>
                <meta name="description" content="PrinTIC" />
                <link rel="icon" href="/general/ticLogo.ico" />
            </Head>
            <Dashboard>
                <h1>Cuanto Falta?</h1>
            </Dashboard>
        </>
    )
}

export default CuantoFalta