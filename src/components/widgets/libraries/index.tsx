'use client'
import s from './libraries.module.scss';
import {AdditionForm} from "@/components/widgets/libraries/addition-form";
import {toggleModalWindow, useSwitchStore} from "@/app/store/switchStore";
import {ModalWindow} from "@/components/widgets/modal-window";
import {LibType} from "@/app/store/LibStore";
import useSWR, {useSWRConfig} from "swr";
import {getMyHotLib} from "@/app/api/api-query/getMyHotLib";
import {UserType} from "@/lib/types";

export const LibrariesContent = () => {
    const {cache} = useSWRConfig()
    const userData:UserType = cache.get('/api')?.data
    const modalStatus: boolean = useSwitchStore((state) => state.statusModalWindow)
    const { data: myLib, isLoading, error } = useSWR<LibType[], any>(
        '/api/getHotLib',
        () => getMyHotLib({ idUser: userData.id }).then((response) => response.data)
    );
    const openModal = () =>{
        toggleModalWindow(true)
    }
    const mappedLib = myLib && myLib.map((lib) => {
        return(
            <div className={s.blockLink} key={lib.id}>
                <p>{lib.id}</p>
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