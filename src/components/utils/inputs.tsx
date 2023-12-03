/* eslint-disable */
import { type Dispatch, type SetStateAction, useState, useEffect, useRef } from "react";
import { IconEyeClosed, IconEye, IconUpload, IconCornerRightDown, IconPlus, IconMinus, IconChevronDown } from "@tabler/icons-react";
import { ActionButton } from "./buttons";
import { Heading } from "./texts";
import { twMerge } from "tailwind-merge"

export const TextInput = ({
  label,
  placeholder,
  value,
  setValue,
  isError = false,
  className,
  titleClassName,
}: {
  label: string,
  placeholder: string,
  value: string,
  setValue: Dispatch<SetStateAction<string>>,
  isError?: boolean,
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
        <button
          className="flex justify-end"
          onClick={() => setShowPassword(!showPassword)}
          type="button"
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
        </button>
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

  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    // Your drag over logic here
  };

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    const droppedFiles = event.dataTransfer.files;
    setFiles(droppedFiles);
    setFilesSelected(true);

    for (const file of droppedFiles) {
      setFileNameList((prev) => [...prev, file.name]);
      setCantidades((prev) => [...prev, 1]);
    }
    // And other state updates as necessary
  };

  return (
    <div className="flex flex-col h-full w-full items-center justify-center gap-10 px-5">
      <div className="flex items-center justify-center text-center">
        <Heading>{title ?? ""}</Heading>
        {withArrowIcon && <IconCornerRightDown size={50} className="hidden lg:block mt-8" />}
      </div>
      <label
        className="flex flex-col items-center justify-center w-full py-20 md:w-2/3 max-w-[800px] h-2/3 max-h-[500px] bg-appshell_background rounded-xl border-solid border-[3px] border-pink_tic gap-10"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
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
                <Heading className="sm:text-[20px] text-center">
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
        <Heading className="text-[18px] text-center">{`${cantidades[index]}`}</Heading>
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
  value
}: {
  title?: string;
  placeholder: string;
  className?: string;
  setValue: Dispatch<SetStateAction<string>>;
  value: string;
}) => {
  return (
    <div className="flex flex-col">
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
        value={value}
      />
    </div>
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

export const DropdownSelect = ({
  labels,
  values,
  setValue,
  title,
  inputClassName,
  initialValue,
}: {
  labels: string[],
  values: string[],
  setValue: Dispatch<SetStateAction<string>>,
  title: string
  inputClassName?: string
  initialValue?: string
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [label, setLabel] = useState(initialValue || "");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const initialIndex = labels.indexOf(initialValue ?? "")
    setValue(values[initialIndex] || "");
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col">
      <Heading className="text-[25px]">{title}</Heading>
      <div className="relative z-0 inline-block" ref={dropdownRef}>
        <ActionButton
          className={twMerge("bg-input_background border-2 border-input_border w-[150px] md:w-[200px] hover:bg-[#000] flex justify-between px-2", inputClassName)}
          onClick={() => setIsOpen(!isOpen)}
          withAnimation={false}
        >
          {label || title} <IconChevronDown />
        </ActionButton>
        {
          isOpen && (
            <div className="absolute flex flex-col right-0 w-[178px] p-1.5 mt-1 rounded-lg bg-input_background">
              {labels.map((label, index) => (
                <ActionButton
                  key={index}
                  className="block font-spacemono bg-input_background text-left hover:bg-input_border"
                  onClick={() => {
                    setIsOpen(false);
                    setLabel(label);
                    setValue(values[index] ?? "");
                  }}
                >
                  {label}
                </ActionButton>
              ))}
            </div>
          )
        }
      </div>
    </div>
  );
}