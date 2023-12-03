/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react"
import { twMerge } from "tailwind-merge" 

export const Title = ({
    children, 
    className 
}: { 
    children: string, 
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
    children: string, 
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
    children: string, 
    className?: string 
}) => {
    return <p className={twMerge(
        "text-[20px] font-spacemono",
        className
    )}>{children}</p>
}