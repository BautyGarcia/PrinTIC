import { twMerge } from "tailwind-merge"
import { Heading } from "../utils/texts";

const UserBox = ({
    nombre,
    curso,
    className
}: {
    nombre: string,
    curso: string,
    className?: string
}) => {
    return (
        <div className={twMerge("flex items-center gap-5", className)}>
            <Heading className="sm:text-[30px] w-min md:w-fit">{`${nombre}`}</Heading>
            <Heading className="sm:text-[30px] w-min md:w-fit">{curso}</Heading>
        </div>
    );
}

export default UserBox;