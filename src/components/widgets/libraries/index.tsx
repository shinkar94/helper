'use client'
import s from './libraries.module.css';
import {useAuthStore} from "@/app/store";
import {LibrariesLinkType, useHotLibrariesStore} from "@/app/store/hotLibrariesStore";

export const LibrariesContent = () => {
    const user = useAuthStore((state)=> state.user)
    const libraries: LibrariesLinkType[] = useHotLibrariesStore(state => state.librariesLink)

    const mappedLib = libraries.map(lib => {
        return(
            <div className={s.blockLink} key={lib.id}>
                <p className={s.titleLink}>{lib.title}</p>
                <div className={s.resultBlock}>
                    <p className={s.resultLink}>{lib.textLibrary}</p>
                </div>
            </div>
        )
    })
    return (
        <div className={s.wrapper}>
            librariesContent {user.email}
            <div className={s.content}>
                {mappedLib}
            </div>
        </div>
    )
}