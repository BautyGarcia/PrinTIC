/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react"
import { twMerge } from "tailwind-merge"

export const Title = ({
    children,
    className
}: {
    children: any,
    className?: string
}) => {
    return <h1 className={twMerge(
        "font-raleway text-[40px] sm:text-[80px]",
        className
    )}>{children}</h1>
}

export const Subtitle = ({
    children,
    className
}: {
    children: any,
    className?: string
}) => {
    return <h2 className={twMerge(
        "font-spacemono text-[20px] sm:text-[30px]",
        className
    )}>{children}</h2>
}

export const Heading = ({
    children,
    className,
    onClick
}: {
    children: any,
    className?: string,
    onClick?: () => any
}) => {
    return <h2 className={twMerge(
        "text-[40px] font-spacemono font-bold",
        className,
    )}
        onClick={onClick}
    >{children}</h2>
}

export const Text = ({
    children,
    className
}: {
    children: any,
    className?: string
}) => {
    return <p className={twMerge(
        "text-[20px] font-spacemono",
        className
    )}>{children}</p>
}

export const Pill = ({
    children,
    className,
    colorBg,
    onClick
}: {
    children: any,
    className?: string,
    colorBg: string,
    onClick?: () => any
}) => {
    return (
        <Heading
            onClick={onClick}
            className={twMerge(
                `text-[15px] ${colorBg} w-fit p-2 px-4 rounded-full`,
                className,
            )}>{children}
        </Heading>
    )
}