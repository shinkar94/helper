import s from "@/components/widgets/libraries/libraries.module.scss";
import useSWR from "swr";
import {ResponseHotLibType} from "@/lib/types";
import {getMyHotLib} from "@/app/api/api-query/getMyHotLib";
import {Loader} from "@/components/entities";
import {PayloadType} from "@/app/service/generate-token/generateToken";
import {CodeIcon, DeleteIcon, DownIcon, EditIcon, StaticCopyIcon, UpIcon} from "@/components/shared";
import {useHotLibs} from "@/components/shared/hok/useHotLibs";

type PropsType = {
    user: PayloadType
}
export const MappedMyLibs = ({user} : PropsType) => {
    const { isLoading, error } = useSWR<ResponseHotLibType[], any>(
        '/api/getHotLib',
        () => getMyHotLib({ idUser: user.id }).then((response) => response.data)
    );

    const {resultLink, openLink, closeLik} = useHotLibs()
    return (
        isLoading ? <Loader /> :
            resultLink && resultLink.map(({ _id:id, title, code , open}) => {
            return(
                <div className={s.containerLink} key={id}>
                    <div className={`${s.blockLink} ${open && s.openBlockLink}`}>
                        <div className={s.titleLink}>
                            <div className={s.linkBtn}>
                                <button className={s.startBtn}><CodeIcon /></button>
                                <button><DeleteIcon /></button>
                                <button><EditIcon /></button>
                                <button><StaticCopyIcon /></button>
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