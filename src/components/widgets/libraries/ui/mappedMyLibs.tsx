import s from "@/components/widgets/libraries/libraries.module.scss";
import useSWR, {useSWRConfig} from "swr";
import {ResponseHotLibType, UserType} from "@/lib/types";
import {getMyHotLib} from "@/app/api/api-query/getMyHotLib";
import {Loader} from "@/components/entities";
import {PayloadType} from "@/app/service/generate-token/generateToken";

type PropsType = {
    user: PayloadType
}
export const MappedMyLibs = ({user} : PropsType) => {
    const {cache, mutate} = useSWRConfig()
    const myLib:ResponseHotLibType[] = cache.get('/api/getHotLib')?.data
    const { isLoading, error } = useSWR<ResponseHotLibType[], any>(
        '/api/getHotLib',
        () => getMyHotLib({ idUser: user.id }).then((response) => response.data)
    );
    return (
        isLoading ? <Loader /> :
        myLib && myLib.map(({ _id:id, title, code }) => {
            return(
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