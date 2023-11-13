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
export const MappedMyLibs = ({user}: PropsType) => {
    const {isLoading, error} = useSWR<ResponseHotLibType[], any>(
        '/api/getHotLib',
        () => getMyHotLib({idUser: user.id}).then((response) => response.data)
    );

    const {resultLink, openLink, closeLink, copyText, copyOneString} = useHotLibs('My')
    return (
        isLoading ? <Loader/> :
            (resultLink && resultLink.length >= 1
                ? resultLink.map(({_id: id, title, code,typesCode, open}) => {
                    return (
                        <div className={s.containerLink} key={id}>
                            <div className={`${s.blockLink} ${open && s.openBlockLink}`}>
                                <div className={s.titleLink}>
                                    <div className={s.linkBtn}>
                                        <button className={s.startBtn}><CodeIcon/></button>
                                        <button><DeleteIcon/></button>
                                        <button><EditIcon/></button>
                                        <button onClick={() => {
                                            copyText(code, typesCode)
                                        }}><StaticCopyIcon/></button>
                                        {!open
                                            ? <button className={s.endBtn} onClick={() => {
                                                openLink(id)
                                            }}><DownIcon/></button>
                                            : <button className={s.endBtn} onClick={() => {
                                                closeLink(id)
                                            }}><UpIcon/></button>}
                                    </div>
                                    <div className={`${s.title} ${open && s.openTitle}`}><p>{title}</p></div>
                                </div>
                                <div className={s.resultBlock}>
                                    {open && <div className={s.resultCode}>
                                        <button onClick={()=>copyOneString(code)}><StaticCopyIcon /></button>
                                        <p className={s.resultLink}>{code}</p>
                                    </div>}
                                    {open && typesCode && <div className={s.resultCode}>
                                        <button onClick={()=>copyOneString(typesCode)}><StaticCopyIcon /></button>
                                        <p className={s.resultLink}>{typesCode}</p>
                                    </div>}
                                </div>
                            </div>
                        </div>
                    )
                })
                : <>You don't have hot libraries yet</>)
    )
}