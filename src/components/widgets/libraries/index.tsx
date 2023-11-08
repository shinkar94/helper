'use client'
import s from './libraries.module.scss';
import {AdditionForm} from "@/components/widgets/libraries/addition-form";
import {toggleModalWindow, useSwitchStore} from "@/app/store/switchStore";
import {ModalWindow} from "@/components/widgets/modal-window";
import {ManagersStoreState, useLibStore} from "@/app/store/LibStore";

export const LibrariesContent = () => {
    const myLib: LibType[] = useLibStore((state: ManagersStoreState)=> state.myHotLib)
    const modalStatus = useSwitchStore((state) => state.statusModalWindow)
    const openModal = () =>{
        toggleModalWindow(true)
    }
    const mappedLib = myLib.map(lib => {
        return(
            <div className={s.blockLink} key={lib.id}>
                <p className={s.titleLink}>{lib.title}</p>
                <div className={s.resultBlock}>
                    <p className={s.resultLink}>{lib.code}</p>
                </div>
            </div>
        )
    })
    return (
        <div className={s.wrapper}>
            <div className={s.btnPanel}>
                <h3>Hot Libraries</h3>
                <div className={s.panel}>
                    <button onClick={openModal}>+ NEW</button>
                </div>
            </div>
            <div className={s.content}>
                {mappedLib}
            </div>
            {modalStatus && <ModalWindow><AdditionForm /></ModalWindow>}
        </div>
    )
}