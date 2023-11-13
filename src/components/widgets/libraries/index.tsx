'use client'
import s from './libraries.module.scss';
import {AdditionForm} from "@/components/widgets/libraries/addition-form";
import {setNewShow, toggleModalWindow, useSwitchStore} from "@/app/store/switchStore";
import {ModalWindow} from "@/components/widgets/modal-window";
import {useAuthStore} from "@/app/store";
import {Plus} from "@/components/shared";
import {MappedAllLibs, MappedMyLibs} from "@/components/widgets/libraries/ui";

export const LibrariesContent = () => {
    const user = useAuthStore((state) => state.user)
    const showLinks = useSwitchStore((state) => state.showLinks)
    const modalStatus: boolean = useSwitchStore((state) => state.statusModalWindow)
    const openModal = () =>{
        toggleModalWindow(true)
    }
    const openAllLink = () => {
        setNewShow('All')
    }
    const openMyLink = () =>{
        setNewShow('My')
    }
    const mappedAllLink = []
    return (
        <div className={s.wrapper}>
            <div className={s.btnPanel}>
                <h3>Hot Libraries</h3>
                <div className={s.panel}>
                    <button onClick={openModal}><Plus /> ADD</button>
                    <button onClick={openMyLink}><Plus /> My</button>
                    <button onClick={openAllLink}><Plus /> ALL</button>
                </div>
            </div>
            <div className={s.content}>
                {showLinks === 'My' ? <MappedMyLibs user={user} /> : <MappedAllLibs user={user}/>}
            </div>
            {modalStatus && <ModalWindow><AdditionForm /></ModalWindow>}
        </div>
    )
}