/* eslint-disable @typescript-eslint/no-explicit-any */
import { twMerge } from "tailwind-merge"
import { Loader } from "~/components/utils/loaders";
import { IconTrash } from "@tabler/icons-react";

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
    onClick
}: {
    children?: string,
    className?: string,
    isLoading?: boolean,
    onClick?: (e: any) => any
}) => {
    return (
        <button
            onClick={onClick}
            disabled={isLoading}
            className={twMerge(
                "bg-pink_tic hover:bg-pink_tic_hover font-bold py-2 px-4 rounded-md flex justify-center gap-4 button-animation",
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