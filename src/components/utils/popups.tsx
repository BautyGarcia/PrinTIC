import { useRef, type Dispatch, type ReactNode, type SetStateAction, useEffect } from 'react';

export const Modal = (
    {
        isOpen,
        children,
        className,
        close
    }: {
        isOpen: boolean,
        children: ReactNode,
        className?: string,
        close: Dispatch<SetStateAction<boolean>>
    }) => {

    const modalRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
            close(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className={`modal-backdrop ${isOpen ? 'open' : ''}`}>
            {isOpen && (
                <div ref={modalRef} className={`modal-content ${className} ${isOpen ? 'open' : ''}`}>
                    {children}
                </div>
            )}
        </div>
    );
}; 
