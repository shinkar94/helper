import useSWR from "swr";
import {ResponseUserHotLibType} from "@/lib/types";
import {getAllLibs} from "@/app/api/api-query/getAllHotLib";
import {Loader} from "@/components/entities";
import s from "@/components/widgets/libraries/libraries.module.scss";
import {CodeIcon, DeleteIcon, DownIcon, EditIcon, StaticCopyIcon, UpIcon} from "@/components/shared";
import {useHotLibs} from "@/components/shared/hok/useHotLibs";

export const MappedAllLibs = () => {
    const {data, isLoading} = useSWR<ResponseUserHotLibType[] | null>('/api/getAllHotLib', getAllLibs);
    const {resultLink, openLink, closeLik, copyText} = useHotLibs('All')
    return (
        isLoading ? <Loader/> :
            resultLink && resultLink.map(({_id: id, title, code, open}) => {
                return (
                    <div className={s.containerLink} key={id}>
                        <div className={`${s.blockLink} ${open && s.openBlockLink}`}>
                            <div className={s.titleLink}>
                                <div className={s.linkBtn}>
                                    <button className={s.startBtn}><CodeIcon /></button>
                                    <button><DeleteIcon /></button>
                                    <button><EditIcon /></button>
                                    <button onClick={()=>{copyText(code)}}><StaticCopyIcon /></button>
                                    {!open
                                        ? <button className={s.endBtn} onClick={()=>{openLink(id)}}><DownIcon /></button>
                                        : <button className={s.endBtn} onClick={()=>{closeLik(id)}}><UpIcon /></button>}
                                </div>
                                <div className={`${s.title} ${open && s.openTitle}`}><p>{title}</p></div>
                            </div>
                            <div className={s.resultBlock}>
                                <p className={s.resultLink}>{open && code}</p>
                            </div>
                        </div>
                    </div>
                )
            })
    )
}