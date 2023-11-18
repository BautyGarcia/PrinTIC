import { twMerge } from "tailwind-merge"

export const ShowcaseButton = ({
        value, 
        className,
        isLoading,
        onClick,
    }: {
        value: string, 
        className?: string
        isLoading?: boolean
        onClick?: () => void
    }) => {
    return (
        <button
        onClick={onClick}
        className={twMerge(
            "bg-blue_tic font-spacemono font-bold p-3 px-4 rounded-xl hover:bg-blue_tic_hover", 
            className,
        )}>
            {value}
        </button>
    )
}

export const ActionButton = ({
    value, 
    className,
    isLoading,
    onClick
}: {
    value: string, 
    className?: string
    isLoading?: boolean,
    onClick?: () => void
}) => {
    return (
        <button
        onClick={onClick}
        className={twMerge(
            "bg-pink_tic hover:bg-pink_tic_hover font-bold py-2 px-4 rounded-md", 
            className
        )}>
            {value}
        </button>
    )
}