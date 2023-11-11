import useSWR, {useSWRConfig} from "swr";
import {ResponseHotLibType, ResponseUserHotLibType} from "@/lib/types";
import {getAllLibs} from "@/app/api/api-query/getAllHotLib";
import {Loader} from "@/components/entities";
import s from "@/components/widgets/libraries/libraries.module.scss";

export const MappedAllLibs = () => {
    const {cache, mutate} = useSWRConfig()
    const myLib: ResponseHotLibType[] = cache.get('/api/getAllHotLib')?.data
    const {data, isLoading} = useSWR<ResponseUserHotLibType[] | null>('/api/getAllHotLib', getAllLibs);
    return (
        isLoading ? <Loader/> :
            myLib && myLib.map(({_id: id, title, code}) => {
                return (
                    <div className={s.blockLink} key={id}>
                        <p className={s.titleLink}>{title}</p>
                        <div className={s.resultBlock}>
                            <p className={s.resultLink}>{code}</p>
                        </div>
                    </div>
                )
            })
    )
}