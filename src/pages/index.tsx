import type { NextPage } from "next";
import Head from "next/head";
import HomeHeader from "~/components/home/homeHeader";
import Glassbox from "~/components/utils/glassbox";
import PrinterIcon from "~/components/icons/printerIcon";
import GitHubButton from "react-github-btn";
import HomeFooter from "~/components/home/homeFooter";
import { useRouter } from "next/router";
import { ActionButton } from "~/components/utils/buttons";
import { Subtitle, Title, Text, Heading } from "~/components/utils/texts";
import { TextZone } from "~/components/utils/inputs";
import { useState } from "react";

const Home: NextPage = () => {
  const router = useRouter();
  const [feedback, setFeedback] = useState("");

  return (
    <>
      <Head>
        <title>PrinTIC</title>
        <meta name="description" content="PrinTIC" />
        <link rel="icon" href="/general/ticLogo.ico" />
      </Head>
      <HomeHeader />
      <main className="relative z-10 flex min-h-screen flex-col items-center justify-around gap-10 p-10 pt-0 lg:gap-0 overflow-x-hidden">
        <div className="flex min-h-screen flex-col items-center justify-center gap-4">
          <div className="flex flex-col items-center">
            <Title>{"<PrinTIC/>"}</Title>
            <Subtitle className="text-center">La forma más fácil de imprimir en TIC</Subtitle>
          </div>
          <ActionButton className="font-spacemono text-lg" onClick={() => void router.push("/ingreso")}>
            Entrar
          </ActionButton>
        </div>
        <div className="flex min-h-screen flex-col items-center justify-around gap-20 md:gap-0 lg:flex-row">
          <Glassbox
            className="h-fit w-full p-10 lg:w-1/2"
            containerClassName="bg-none gap-5"
          >
            <div className="flex items-center justify-between">
              <Heading>¿Qué es esto?</Heading>
              <a
                href="https://github.com/BautyGarcia/PrinTIC"
                target="_blank"
                rel="noopener noreferrer"
                className="3xl:w-15 3xl:h-15 2xl:w-13 2xl:h-13 lg:h-13 lg:w-13 mr-4 rounded-full bg-github bg-contain bg-center bg-no-repeat sm:h-9 sm:w-9 md:h-11 md:w-11"
                aria-label="Repositorio en GitHub"
              />
            </div>
            <Text>
              Esta web busca facilitar la experiencia de usuario tanto para
              alumnos como para profesores en el momento de utilizar las
              impresoras de TIC. No mas formularios de Google, ni hojas de
              Excel, esta es una aplicación 100% hecha por y para las personas
              de TIC.
            </Text>
            <Text>
              Si te gusta este proyecto, ponete la 10 y dale una estrellita al
              repositorio de GitHub.
            </Text>
            <GitHubButton
              href="https://github.com/BautyGarcia/PrinTIC"
              data-icon="octicon-star"
              data-size="large"
              data-show-count="true"
              aria-label="Star BautyGarcia/PrinTIC on GitHub"
            />
          </Glassbox>
          <PrinterIcon height={350} width={350} />
        </div>
        <div className="flex min-h-screen w-screen flex-col items-center justify-center gap-6">
          <div className="flex flex-col items-center">
            <Title>{"<Feedback/>"}</Title>
            <Subtitle>Ayudame a mejorar PrinTIC</Subtitle>
          </div>
          <div className="flex w-screen flex-col items-center gap-8 p-10">
            <TextZone
              placeholder="Cambiaría..."
              className="w-full md:w-1/3 min-h-[300px] md:min-w-[550px] max-w-[250px] sm:max-w-[400px] md:max-w-[800px] max-h-[800px]"
              setValue={setFeedback}
            />
            <ActionButton className="w-2/3 max-w-[200px] font-spacemono">Enviar</ActionButton>
          </div>
        </div>
      </main>
      <HomeFooter />
    </>
  );
};

export default Home;
