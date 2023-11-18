import { type Dispatch, type SetStateAction, useState, ChangeEvent } from "react";
import { IconEyeClosed, IconEye } from "@tabler/icons-react";

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
  label,
  handleFiles,
  isError,
}: {
  label: string;
  handleFiles: (e: ChangeEvent<HTMLInputElement>) => void;
  isError: boolean;
}) => {
  return (
    <div className="flex flex-col gap-1">
      <h2 className="text-lg font-bold">{label}</h2>
      <input
        multiple
        type="file"
        onChange={(e) => { handleFiles(e) }}
      />
    </div>
  );
};