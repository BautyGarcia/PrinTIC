import { type Dispatch, type SetStateAction, useState } from "react";
import { IconEyeClosed, IconEye, IconUpload, IconCornerRightDown, IconPlus, IconMinus } from "@tabler/icons-react";
import { ActionButton } from "./buttons";
import { Heading } from "./texts";
import { twMerge } from "tailwind-merge"

export const TextInput = ({
  label,
  placeholder,
  value,
  setValue,
  isError,
  className,
  titleClassName,
}: {
  label: string,
  placeholder: string,
  value: string,
  setValue: Dispatch<SetStateAction<string>>,
  isError: boolean,
  className?: string
  titleClassName?: string
}) => {
  return (
    <div className="flex flex-col">
      {label && <Heading className={twMerge("text-[25px]", titleClassName)}>{label}</Heading>}
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        className={
          twMerge(
            `rounded-md border-2 border-solid bg-input_background p-3 ${isError ? "border-red_tic" : "border-input_border"}`,
            className)}
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
  className,
}: {
  label: string;
  placeholder: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  isError: boolean;
  className?: string;
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
          className={twMerge(
            `rounded-md border-2 p-3 border-solid bg-input_background ${isError ? "border-red_tic" : "border-input_border"}`,
            className
          )}
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
  setCantidades,
  withArrowIcon,
  errorMessage,
  inputFileRef,
}: {
  title?: string,
  withArrowIcon?: boolean,
  setFilesSelected: React.Dispatch<React.SetStateAction<boolean>>
  setFiles: React.Dispatch<React.SetStateAction<FileList | null>>,
  setFileNameList: React.Dispatch<React.SetStateAction<string[]>>,
  setCantidades: React.Dispatch<React.SetStateAction<number[]>>,
  errorMessage: string;
  inputFileRef: React.MutableRefObject<HTMLInputElement | null>;
}) => {
  const isError = !(errorMessage.length === 0);
  return (
    <div className="flex flex-col h-full w-full items-center justify-center gap-10 px-5">
      <div className="flex items-center justify-center text-center">
        <Heading>{title ?? ""}</Heading>
        {withArrowIcon && <IconCornerRightDown size={50} className="hidden lg:block mt-8" />}
      </div>
      <label className="flex flex-col items-center justify-center w-full py-20 md:w-2/3 max-w-[800px] h-2/3 max-h-[500px] bg-appshell_background rounded-xl border-solid border-[3px] border-pink_tic gap-10">
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
              setCantidades((prev) => [...prev, 1]);
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

export const AmountInput = ({
  index,
  cantidades,
  setCantidades,
}: {
  index: number;
  cantidades: number[];
  setCantidades: React.Dispatch<React.SetStateAction<number[]>>;
}) => {
  return (
    <div className="flex justify-center items-center gap-5 w-fit h-[50px] bg-pink_tic p-3 rounded-lg">
      <button className="w-1/3 hover:bg-pink_tic_hover rounded-lg p-1 button-animation"
        onClick={() => {
          setCantidades(prev => {
            const newCantidades = [...prev];
            newCantidades[index] -= 1;
            if (newCantidades[index]! < 1) newCantidades[index] = 1;
            return newCantidades;
          });
        }}>
        <IconMinus />
      </button>
      <div className="w-1/3">
        <Heading className="sm:text-[18px] text-center">{`${cantidades[index]}`}</Heading>
      </div>
      <button className="w-1/3 hover:bg-pink_tic_hover rounded-lg p-1 button-animation"
        onClick={() => {
          setCantidades(prev => {
            const newCantidades = [...prev];
            newCantidades[index] += 1;
            return newCantidades;
          });
        }}>
        <IconPlus />
      </button>
    </div>
  );
}

export const TextZone = ({
  title,
  placeholder,
  className,
  setValue,
}: {
  title?: string;
  placeholder: string;
  className?: string;
  setValue: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <>
      {title && <Heading className="text-[25px]">{title}</Heading>}
      <textarea
        className={twMerge(
          'p-3 resize rounded-md bg-input_background border-solid border-2 border-input_border',
          className
        )}
        placeholder={placeholder}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
    </>
  );
}

export const SelectInput = ({
  title,
  options,
  labels,
  value,
  setValue,
  className
}: {
  title: string;
  options: string[];
  labels: string[];
  value?: string;
  setValue: Dispatch<SetStateAction<string>>;
  className?: string;
}) => {
  return (
    <div className="flex flex-col">
      {title && <Heading className="text-[25px]">{title}</Heading>}
      <select
        className={twMerge(
          "rounded-md border-2 border-solid bg-input_background p-3 border-input_border outline-none",
          className
        )}
        onChange={(e) => setValue((e.target.value).toUpperCase())}
        value={value}
      >
        {options.map((option, index) => (
          <option key={index} value={option} label={labels[index]}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}