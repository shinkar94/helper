import useSWR, {useSWRConfig} from "swr";
import {ResponseHotLibType, ResponseUserHotLibType} from "@/lib/types";
import {getAllLibs} from "@/app/api/api-query/getAllHotLib";
import {Loader} from "@/components/entities";
import s from "@/components/widgets/libraries/libraries.module.scss";
import {CodeIcon, DeleteIcon, DownIcon, EditIcon, StaticCopyIcon, UpIcon} from "@/components/shared";

export const MappedAllLibs = () => {
    const {cache, mutate} = useSWRConfig()
    const myLib: ResponseHotLibType[] = cache.get('/api/getAllHotLib')?.data
    const {data, isLoading} = useSWR<ResponseUserHotLibType[] | null>('/api/getAllHotLib', getAllLibs);
    return (
        isLoading ? <Loader/> :
            myLib && myLib.map(({_id: id, title, code}) => {
                return (
                    <div className={s.containerLink} key={id}>
                        <div className={`${s.blockLink} `}>
                            <div className={s.titleLink}>
                                <div className={s.linkBtn}>
                                    <button className={s.startBtn}><CodeIcon /></button>
                                    <button><DeleteIcon /></button>
                                    <button><EditIcon /></button>
                                    <button><StaticCopyIcon /></button>
                                    <button className={s.endBtn}><DownIcon /></button>
                                </div>
                                <div className={`${s.title}`}><p>{title}</p></div>
                            </div>
                            <div className={s.resultBlock}>
                                <p className={s.resultLink}>{code}</p>
                            </div>
                        </div>
                    </div>
                )
            })
    )
}