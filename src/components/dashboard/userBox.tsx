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
        <div className={twMerge("gap-5", className)}>
            <Heading className="sm:text-[30px]">{nombre}</Heading>
            <Heading className="sm:text-[30px]">{curso}</Heading>
        </div>
    );
}

export default UserBox;