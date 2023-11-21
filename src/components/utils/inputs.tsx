import { type Dispatch, type SetStateAction, useState, type ChangeEvent } from "react";
import { IconEyeClosed, IconEye, IconUpload, IconCornerRightDown } from "@tabler/icons-react";
import { ActionButton } from "./buttons";
import { Heading } from "./texts";

export const TextInput = ({
  label,
  placeholder,
  value,
  setValue,
  isError,
}: {
  label: string;
  placeholder: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  isError: boolean;
}) => {
  return (
    <div className="flex flex-col gap-1">
      <h2 className="text-lg font-bold">{label}</h2>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        className={`w-full rounded-md border-2  border-solid bg-input_background p-3 ${isError ? "border-red_tic" : "border-input_border"
          }`}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
    </div>
  );
};

export const PasswordInput = ({
  label,
  placeholder,
  value,
  setValue,
  isError,
}: {
  label: string;
  placeholder: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  isError: boolean;
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col gap-1">
      <h2 className="text-lg font-bold">{label}</h2>
      <div className="flex w-full items-center">
        <input
          type={showPassword ? "text" : "password"}
          placeholder={
            showPassword ? placeholder : placeholder.replaceAll(/./g, "*")
          }
          className={`w-full rounded-md border-2 border-solid bg-input_background p-3 ${isError ? "border-red_tic" : "border-input_border"
            }`}
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        <div
          className="flex justify-end"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <IconEye
              className="absolute mr-4 self-center rounded-lg p-1 hover:bg-input_border"
              size={30}
            />
          ) : (
            <IconEyeClosed
              className="absolute mr-4 self-center rounded-lg p-1 hover:bg-input_border"
              size={30}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export const FileInput = ({
  title,
  setFilesSelected,
  setFiles,
  setFileNameList,
  withArrowIcon,
  errorMessage,
  inputFileRef,
}: {
  title?: string,
  withArrowIcon?: boolean,
  setFilesSelected: React.Dispatch<React.SetStateAction<boolean>>
  setFiles: React.Dispatch<React.SetStateAction<FileList | null>>,
  setFileNameList: React.Dispatch<React.SetStateAction<string[]>>,
  errorMessage: string;
  inputFileRef: React.MutableRefObject<HTMLInputElement | null>;
}) => {
  const isError = !(errorMessage.length === 0);
  return (
    <div className="flex flex-col h-full items-center justify-center gap-10 px-5">
      <div className="flex items-center justify-center text-center">
        <Heading>{title ?? ""}</Heading>
        {withArrowIcon && <IconCornerRightDown size={50} className="hidden lg:block mt-8" />}
      </div>
      <label className="flex flex-col items-center justify-center w-full py-20 md:w-2/3 max-w-[800px] h-2/3 max-h-[500px] bg-appshell_background rounded-xl border-dashed border-[3px] border-pink_tic gap-10">
        <input
          multiple
          ref={inputFileRef}
          type="file"
          accept=".stl"
          id="fileInput"
          onChange={() => {
            setFiles(inputFileRef.current?.files ?? null);
            setFilesSelected(true);

            for (const file of inputFileRef.current?.files ?? []) {
              setFileNameList((prev) => [...prev, file.name]);
            }
          }}
          className="hidden"
        />
        <IconUpload size={120} />
        <div className="flex flex-col lg:flex-row items-center gap-5">
          {
            !isError && (
              <>
                <Heading className="sm:text-[20px]">
                  Arrastralos acá ó
                </Heading>
                <ActionButton onClick={() => document.getElementById("fileInput")?.click()} className="font-spacemono">Seleccionalos</ActionButton>
              </>
            )
          }
          {
            isError && (
              <div className="flex flex-col items-center gap-10">
                <Heading className="text-red_tic text-center text-lg">{errorMessage}</Heading>
                <ActionButton onClick={() => document.getElementById("fileInput")?.click()} className="font-spacemono w-fit">Vamos de vuelta</ActionButton>
              </div>
            )
          }
        </div>
      </label>
    </div>
  );
};