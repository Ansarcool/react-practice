import  { type ReactNode, useEffect} from "react";
import "./Modal.css";

type ModalProps = {
    children: ReactNode,
    onClose: () => void
}
export default function Modal({children, onClose}: ModalProps) {
    useEffect(() => {
     const handleEscapeClose = (e: KeyboardEvent)=> {
         if (e.key === "Escape") {
             onClose()
         }
        }
        document.addEventListener('keydown', handleEscapeClose);

        return ()=> {
            document.removeEventListener('keydown', handleEscapeClose);
        }
    }, [onClose]);
    return (
        <div className={'modal'}>
            <div className={'modal-content'}>
                <button className={"close-button"} onClick={onClose}>X</button>
                {children}
            </div>
        </div>
    )
}