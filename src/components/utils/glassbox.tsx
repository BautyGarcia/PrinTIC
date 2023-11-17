import { twMerge } from "tailwind-merge";

const Glassbox = ({
    children,
    className,
    containerClassName,
    ...props
}: {
    children: React.ReactNode;
    className?: string;
    containerClassName?: string;
    props?: string;
}) => {
    return (
        <div className={twMerge(className, "glass")} {...props}>
            <div
                className={twMerge(
                    "glass-container flex flex-col justify-between",
                    containerClassName
                )}
            >
                {children}
            </div>
        </div>
    );
};

export default Glassbox;