import s from './modalWindow.module.scss'
import {ReactNode} from "react";
type PropsType = {
    children: ReactNode
}
export const ModalWindow = ({children}:PropsType) => {
    return <div className={s.modalWrapper}>{children}</div>
}