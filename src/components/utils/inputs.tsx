import { type Dispatch, type SetStateAction, useState } from "react";
import { IconEyeClosed, IconEye } from "@tabler/icons-react";

export const TextInput = (
    { 
        label, 
        placeholder, 
        value, 
        setValue, 
        isError 
    }: { 
        label: string,
        placeholder: string, 
        value: string, 
        setValue: Dispatch<SetStateAction<string>>, 
        isError: boolean }) => {
    return (
        <div className="flex flex-col gap-1">
            <h2 className="text-lg font-bold">{label}</h2>
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                className={`bg-input_background border-solid border-2  rounded-md w-full p-3 ${ isError ? "border-red_tic" : "border-input_border" }`}
                onChange={(e) => {setValue(e.target.value)}}
            />
        </div>
    )
}

export const PasswordInput = (
    { 
        label, 
        placeholder, 
        value, 
        setValue, 
        isError 
    }: { 
        label: string, 
        placeholder: string, 
        value: string, 
        setValue: Dispatch<SetStateAction<string>>, 
        isError: boolean 
    }) => {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <div className="flex flex-col gap-1">
            <h2 className="text-lg font-bold">{label}</h2>
            <div className="flex w-full items-center">
                <input
                    type={showPassword ? "text" : "password"}
                    placeholder={showPassword ? placeholder : placeholder.replaceAll(/./g, "*")}
                    className={`bg-input_background border-solid border-2 rounded-md w-full p-3 ${ isError ? "border-red_tic" : "border-input_border" }`}
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                />
                <div className="flex justify-end" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <IconEye className="absolute self-center mr-4 p-1 rounded-lg hover:bg-input_border" size={30} /> : <IconEyeClosed className="absolute self-center mr-4 p-1 rounded-lg hover:bg-input_border" size={30} />}
                </div>
            </div>
        </div>
    )
}