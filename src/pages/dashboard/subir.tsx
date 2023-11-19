import { type NextPage } from "next";
import Dashboard from ".";
import { FileInput } from "~/components/utils/inputs";
import { type ChangeEvent, useState } from "react";
import { Heading } from "~/components/utils/texts";
import Head from "next/head";
import { IconCornerRightDown } from "@tabler/icons-react";

const SubirArchivo: NextPage = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const handleFiles = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
  }

  return (
    <Dashboard>
      <div className="flex flex-col h-full justify-center">
        <FileInput
          isError={errorMessage.length === 0 ? true : false}
          handleFiles={handleFiles}
          title="Soltá tus problemas acá abajo"
          withArrowIcon
        />
      </div>
    </Dashboard>
  );
};

export default SubirArchivo;
