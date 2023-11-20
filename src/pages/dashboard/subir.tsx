import { type NextPage } from "next";
import Dashboard from ".";
import { FileInput } from "~/components/utils/inputs";
import { type ChangeEvent, useState } from "react";
import React from "react";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";

const SubirArchivo: NextPage = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const inputFileRef = React.useRef<HTMLInputElement | null>(null);
  const { mutate: getSignedUrls } = api.files.signFiles.useMutation();
  const { data: sessionData } = useSession();

  const handleFiles = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = inputFileRef.current?.files;
    const allowedExtensions = ["stl"];
    const fileNames: Array<string> = [];

    if (!files) {
      return;
    }

    for (const file of files) {
      const extension = file.name.split(".").pop();
      if (!allowedExtensions.includes(extension!)) {
        setErrorMessage('Todos los archivos tienen que ser .stl');
        break;
      }
      fileNames.push(`${sessionData?.user?.name}_${file.name.split(".")[0]}_${Date.now()}.stl`);
    }

    getSignedUrls({
      fileNames: fileNames
    }, {
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSuccess: async (data) => {
        for (const object of data) {
          const index = data.indexOf(object);

          const currentFile = files[index];

          const newFile = new File([currentFile ?? ""], fileNames[index] ?? "", {
            type: "application/octet-stream",
            lastModified: currentFile?.lastModified,
          });

          await fetch(object.fetchUrl, {
            method: "PUT",
            body: newFile,
            headers: {
              'Content-Type': "application/octet-stream",
            },
          }).then(() => {
            console.log("Archivo subido");
          }).catch()
        }
      },
      onError: () => {
        console.log("Error generando la URL de google");
      }
    })
  }

  return (
    <Dashboard>
      <div className="flex flex-col h-full justify-center">
        <FileInput
          inputFileRef={inputFileRef}
          errorMessage={errorMessage}
          handleFiles={handleFiles}
          title="Soltá tus problemas acá abajo"
          withArrowIcon
        />
      </div>
    </Dashboard>
  );
};

export default SubirArchivo;
