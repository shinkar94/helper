import s from './addNewExample.module.scss'
import {FC} from "react";
import {TextareaType} from "@/lib";
import {usePosts} from "@/components/shared/hok";

type Props = {
    active: boolean
    closeCallBack: () => void
}
export const AddNewExapmle: FC<Props> = ({active, closeCallBack}) => {
    const {
        addText,
        addH3,
        addH2,
        addH1,
        addCode,
        addTitle,
        setTextareas,
        closeTextarea,
        sendNewPost,
        addTextNewText,
        titleValue,
        textareas
    } = usePosts()
    const closeModal = () => {
        setTextareas([])
        closeCallBack()
    }

    return (
        <div className={`${s.containerRedactor} ${active && s.active}`}>
            <div className={s.wrapperContainer}>
                <h3>Add new Example</h3>
                <button onClick={closeModal} className={s.closeBtn}>Close</button>
                <div className={s.redactorHed}>
                    <button onClick={addH1}>H1</button>
                    <button onClick={addH2}>H2</button>
                    <button onClick={addH3}>H3</button>
                    <button onClick={addText}>P</button>
                    <button onClick={addCode}>CODE</button>
                </div>
                <div className={s.redactorTitle}>
                    TITLE: <input type="text" value={titleValue} onChange={(e) => addTitle(e)} placeholder={'title'}/>
                </div>
                <div className={s.redactorContent}>
                    {textareas.map(({text, id, tagName}: TextareaType) => (
                        <div key={id} className={`${s.wrapTextarea} ${tagName}`}>
                            <span className={s.titleBlock}>{tagName.split(' ')[1].split('-')[1]}</span>
                            <textarea className={tagName} onChange={(e) => addTextNewText(id, e)} value={text}/>
                            <button className={s.closeTextarea} onClick={() => closeTextarea(id)}>X</button>
                        </div>

                    ))}
                </div>
                <button onClick={sendNewPost} className={s.sendPost}>Send Post</button>
            </div>
        </div>
    )
}