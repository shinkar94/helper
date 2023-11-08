import s from './modalWindow.module.scss'
type PropsType = {
    children: ChildNode
}
export const ModalWindow = ({children}:PropsType) => {
    return <div className={s.modalWrapper}>{children}</div>
}