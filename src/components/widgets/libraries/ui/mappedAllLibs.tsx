import useSWR from "swr";
import {ResponseHotLibType} from "@/lib/types";
import {getAllLibs} from "@/app/api/api-query/getAllHotLib";
import {Loader} from "@/components/entities";
import s from "@/components/widgets/libraries/libraries.module.scss";
import {CodeIcon, DownIcon, DownloadIcon, StaticCopyIcon, UpIcon} from "@/components/shared";
import {useHotLibs} from "@/components/shared/hok/useHotLibs";
import {PayloadType} from "@/app/service/generate-token/generateToken";
type PropsType = {
    user: PayloadType
}
export const MappedAllLibs = ({user} : PropsType) => {
    const {isLoading} = useSWR<ResponseHotLibType[]>(
        '/api/getAllHotLib',
        () => getAllLibs({ idUser: user.id }).then((response) => response.data))


    const {resultLink, openLink, closeLink, copyText, transferLink, copyOneString} = useHotLibs('All')
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
                                    <button onClick={() => {
                                        transferLink(id)
                                    }}><DownloadIcon/></button>
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
            : <>The list of hot libraries is empty</>)
    )
}