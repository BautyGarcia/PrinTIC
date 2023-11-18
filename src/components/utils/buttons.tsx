/* eslint-disable @typescript-eslint/no-explicit-any */
import { twMerge } from "tailwind-merge"
import { Loader } from "~/components/utils/loaders";

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
                "bg-blue_tic font-spacemono font-bold p-3 px-4 rounded-xl hover:bg-blue_tic_hover flex justify-center",
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
    children: string,
    className?: string,
    isLoading?: boolean,
    onClick?: () => any
}) => {
    return (
        <button
            onClick={onClick}
            className={twMerge(
                "bg-pink_tic hover:bg-pink_tic_hover font-bold py-2 px-4 rounded-md flex justify-center gap-4",
                className
            )}>
            {isLoading && <Loader />}
            {children}
        </button>
    )
}