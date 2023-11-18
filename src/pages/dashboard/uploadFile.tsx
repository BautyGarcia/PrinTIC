import { type NextPage } from "next";
import Dashboard from ".";
import { FileInput } from "~/components/utils/inputs";
import { ChangeEvent, useState } from "react";

const UploadFile: NextPage = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const handleFiles = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
  }

  return (
    <Dashboard>
      <FileInput
        label="Archivo"
        isError={errorMessage.length === 0 ? true : false}
        handleFiles={handleFiles}
      />
    </Dashboard>
  );
};

export default UploadFile;
