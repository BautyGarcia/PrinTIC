import { type NextPage } from "next";
import Dashboard from ".";
import { FileInput, AmountInput, TextZone, SelectInput } from "~/components/utils/inputs";
import { useState } from "react";
import React from "react";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import { Heading } from "~/components/utils/texts";
import { ActionButton, TrashButton } from "~/components/utils/buttons";
import { toast } from "react-toastify";
import Head from "next/head";

const SubirArchivo: NextPage = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const inputFileRef = React.useRef<HTMLInputElement | null>(null);
  const [files, setFiles] = useState<FileList | null>(null);
  const [fileNameList, setFileNameList] = useState<Array<string>>([]);
  const [areFilesSelected, setAreFilesSelected] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const { mutate: getSignedUrls } = api.files.signFiles.useMutation();
  const { mutate: crearPedido } = api.pedidos.crearPedido.useMutation();
  const [notes, setNotes] = useState("");
  const [materia, setMateria] = useState("Proyecto");
  const [cantidades, setCantidades] = useState<Array<number>>([]);
  const { data: sessionData } = useSession();

  const handleReset = () => {
    setErrorMessage("");
    setFiles(null);
    setFileNameList([]);
    setAreFilesSelected(false);
    setIsUploading(false);
    setNotes("");
    setMateria("Proyecto");
    setCantidades([]);
  }

  const handleFiles = (files: FileList, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    return new Promise<void>((resolve, reject) => {
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

      setIsUploading(true);
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
                    cantidad: cantidades[currentFileIndex] ?? 1
                  }
                });

                crearPedido({
                  materia: materia,
                  notas: notes,
                  piezas: piezasObject,
                }, {
                  onSuccess: () => {
                    resolve();
                    setIsUploading(false);
                    handleReset();
                  },
                  onError: () => {
                    reject();
                    setIsUploading(false);
                  }
                })
              }
            }).catch()
          }
        },
        onError: () => {
          console.log("Error generando la URL de google");
          setIsUploading(false);
        }
      })
    });
  }

  return (
    <>
      <Head>
        <title>PrinTIC - Subir Archivos</title>
        <meta name="description" content="PrinTIC" />
        <link rel="icon" href="/general/ticLogo.ico" />
      </Head>
      <Dashboard>
        <div className="flex flex-col w-full h-full justify-center items-center p-8 md:p-12">
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
              <div className="w-full h-full flex flex-col lg:flex-row gap-8 items-center lg:items-start pb-20 overflow-scroll">
                <div className="flex flex-col w-full lg:w-2/3 rounded-lg gap-8">
                  {
                    fileNameList.map((fileName, index) => (
                      <div key={index} className="flex flex-col bg-appshell_background rounded-lg p-5 gap-3">
                        <Heading className="sm:text-[30px] min-h-[100px] break-all">{fileName.split(".")[0] ?? ""}</Heading>
                        <AmountInput
                          index={index}
                          cantidades={cantidades}
                          setCantidades={setCantidades}
                        />
                      </div>
                    ))
                  }
                </div>
                <div className="flex flex-col w-full lg:w-1/3 h-fit bg-appshell_background rounded-lg p-5 gap-5">
                  <SelectInput
                    setValue={setMateria}
                    title="Materia"
                    options={["Proyecto", "TIMI"]}
                    value={materia}
                  />
                  <TextZone
                    placeholder="Fijate que..."
                    className="w-full resize-y max-h-[400px] min-h-[200px]"
                    title="Notas"
                    setValue={setNotes}
                  />
                  <div className="flex gap-3">
                    <ActionButton
                      className="font-spacemono mb-1 text-[20px] w-full"
                      isLoading={isUploading}
                      onClick={async (e) => {
                        await toast.promise(
                          handleFiles(files ?? new FileList, e as React.MouseEvent<HTMLButtonElement, MouseEvent>),
                          {
                            pending: 'Subiendo archivos 📤',
                            success: 'Subido 👌',
                            error: 'Hubo un problema 🤯'
                          }
                        )
                      }}
                    >{isUploading ? "Enviando..." : "Enviar"}</ActionButton>
                    <TrashButton
                      className="h-fit mb-1 flex items-center justify-center"
                      onClick={() => {
                        handleReset();
                      }} />
                  </div>
                </div>
              </div>
            )
          }
        </div>
      </Dashboard>
    </>
  );
};

export default SubirArchivo;