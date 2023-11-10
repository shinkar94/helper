'use client'
import s from './libraries.module.scss';
import {AdditionForm} from "@/components/widgets/libraries/addition-form";
import {toggleModalWindow, useSwitchStore} from "@/app/store/switchStore";
import {ModalWindow} from "@/components/widgets/modal-window";
import useSWR, {useSWRConfig} from "swr";
import {getMyHotLib} from "@/app/api/api-query/getMyHotLib";
import {ResponseHotLibType} from "@/lib/types";
import {useAuthStore} from "@/app/store";
import {Loader} from "@/components/entities";
import {Plus} from "@/components/shared";

export const LibrariesContent = () => {
    const user = useAuthStore((state) => state.user)
    const {cache, mutate} = useSWRConfig()
    const myLib:ResponseHotLibType[] = cache.get('/api/getHotLib')?.data
    console.log(cache.get('/api/getHotLib')?.data)
    const modalStatus: boolean = useSwitchStore((state) => state.statusModalWindow)
    const { isLoading, error } = useSWR<ResponseHotLibType[], any>(
        '/api/getHotLib',
        () => getMyHotLib({ idUser: user.id }).then((response) => response.data)
    );
    const openModal = () =>{
        toggleModalWindow(true)
    }
    const mappedLib = myLib && myLib.map(({ _id:id, title, code }) => {
        return(
            <div className={s.blockLink} key={id}>
                <p className={s.titleLink}>{title}</p>
                <div className={s.resultBlock}>
                    <p className={s.resultLink}>{code}</p>
                </div>
            </div>
        )
    })
    return (
        <div className={s.wrapper}>
            <div className={s.btnPanel}>
                <h3>Hot Libraries</h3>
                <div className={s.panel}>
                    <button onClick={openModal}><Plus /> ADD</button>
                    <button onClick={openModal}><Plus /> ALL</button>
                </div>
            </div>
            <div className={s.content}>
                {isLoading ? <Loader /> : mappedLib}
            </div>
            {modalStatus && <ModalWindow><AdditionForm /></ModalWindow>}
        </div>
    )
}