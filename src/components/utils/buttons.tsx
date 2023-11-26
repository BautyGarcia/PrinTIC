/* eslint-disable @typescript-eslint/no-explicit-any */
import { twMerge } from "tailwind-merge"
import { Loader } from "~/components/utils/loaders";
import { IconTrash } from "@tabler/icons-react";
import { useState } from "react";

interface options {
    label: string,
    onClick: () => any
}[]

export const ShowcaseButton = ({
    children,
    className,
    onClick,
}: {
    children: string,
    className?: string,
    onClick?: () => any
}) => {
    return (
        <button
            onClick={onClick}
            className={twMerge(
                "bg-blue_tic font-spacemono font-bold p-3 px-4 rounded-xl hover:bg-blue_tic_hover flex justify-center button-animation",
                className,
            )}>
            {children}
        </button>
    )
}

export const ActionButton = ({
    children,
    className,
    isLoading,
    onClick,
    withAnimation = true
}: {
    children?: any,
    className?: string,
    isLoading?: boolean,
    onClick?: (e: any) => any
    withAnimation?: boolean
}) => {
    return (
        <button
            onClick={onClick}
            disabled={isLoading}
            className={twMerge(
                `bg-pink_tic hover:bg-pink_tic_hover font-bold py-2 px-4 rounded-md flex justify-center gap-4 ${withAnimation ? "button-animation" : ""}`,
                className
            )}>
            {isLoading && <Loader />}
            {children}
        </button>
    )
}

export const TrashButton = ({
    onClick,
    className,
    bodyText,
    isLoading
}: {
    onClick: () => any,
    className?: string
    bodyText?: string,
    isLoading?: boolean
}) => {
    return (
        <button
            onClick={onClick}
            disabled={isLoading}
            className={twMerge(
                "bg-red_tic hover:bg-red_tic_hover font-bold py-3 px-4 rounded-md flex justify-center gap-4 button-animation",
                className
            )}>
                {bodyText}
            <IconTrash/>
        </button>
    )
}

export const DropdownMenu = ({ options }: { options: options[] }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative inline-block">
            <ActionButton 
                onClick={() => setIsOpen(!isOpen)}
                className="font-spacemono text-[18px]"
            >
                Acciones
            </ActionButton>
            {isOpen && (
                <div className="solicitud absolute flex flex-col right-0 w-[178px] p-1 mt-1 rounded-lg items-center bg-pink_tic">
                    {options.map((option, index) => (
                        <ActionButton 
                            key={index} 
                            className="block font-spacemono"
                            onClick={() => {
                                setIsOpen(false);
                                option.onClick();
                            }}
                        >
                            {option.label}
                        </ActionButton>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DropdownMenu;