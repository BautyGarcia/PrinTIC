import { type NextPage } from "next";
import Dashboard from ".";
import { FileInput } from "~/components/utils/inputs";
import { useState } from "react";
import React from "react";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import { Heading } from "~/components/utils/texts";
import { ActionButton } from "~/components/utils/buttons";

const SubirArchivo: NextPage = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const inputFileRef = React.useRef<HTMLInputElement | null>(null);
  const [files, setFiles] = useState<FileList | null>(null);
  const [fileNameList, setFileNameList] = useState<Array<string>>([]);
  const [areFilesSelected, setAreFilesSelected] = useState(false);
  const { mutate: getSignedUrls } = api.files.signFiles.useMutation();
  const { mutate: crearPedido } = api.pedidos.crearPedido.useMutation();
  const [notes, setNotes] = useState("");
  const [materia, setMateria] = useState("");
  const [cantidades, setCantidades] = useState<Array<number>>([]);
  const { data: sessionData } = useSession();

  const handleFiles = (files: FileList, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
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
            if (index === data.length - 1) {
              const piezasObject = data.map((object) => {
                const currentFileIndex = data.indexOf(object);
                const currentFile = files[currentFileIndex];
                return {
                  nombre: currentFile?.name.split(".")[0] ?? "",
                  url: object.fileUrl,
                  cantidad: currentFileIndex + 1
                }
              });

              crearPedido({
                materia: "Proyecto",
                notas: notes,
                piezas: piezasObject,
              }, {
                onSuccess: () => {
                  console.log("Pedido creado");
                },
                onError: () => {
                  console.log("Error creando el pedido");
                }
              })
            }
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
      <div className="flex flex-col h-full justify-center p-5 md:p-0">
        {
          !areFilesSelected ? (
            <FileInput
              inputFileRef={inputFileRef}
              errorMessage={errorMessage}
              setFilesSelected={setAreFilesSelected}
              setFiles={setFiles}
              setFileNameList={setFileNameList}
              setCantidades={setCantidades}
              title="Soltá tus problemas acá abajo"
              withArrowIcon
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-10">
              <div className="flex flex-col justify-between w-full h-full md:max-h-[75%] md:max-w-[80%] overflow-auto">
                <div className="flex flex-col gap-8">
                {
                  fileNameList.map((fileName, index) => (
                    <div key={index} className="flex h-[150px] bg-appshell_background rounded-lg p-5">
                      <Heading className="sm:text-[30px]">{fileName.split(".")[0] ?? ""}</Heading>
                    </div>
                  ))
                }
                </div>
              </div>
              <ActionButton className="font-spacemono mb-1 text-[20px]">Enviar</ActionButton>
            </div>
          )
        }
      </div>
    </Dashboard>
  );
};

export default SubirArchivo;
