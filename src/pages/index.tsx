import Head from "next/head";

const Home = () => {
  return (
    <>
      <Head>
        <title>PrinTIC</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className=" flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <p className="text-white text-[50px]">Se viene...</p>
        <h1 className="text-white text-[100px]">PrinTIC</h1>
      </main>
    </>
  );
}

export default Home;