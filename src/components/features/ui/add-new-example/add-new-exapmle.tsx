
import s from './addNewExample.module.scss'
import {FC, useState} from "react";
import {useAuthStore} from "@/app/store";

type Props = {
    active: boolean
}
export const AddNewExapmle:FC<Props> = ({active}) => {
    const user = useAuthStore((state)=> state.user)
    const [textareas, setTextareas] = useState<string[]>([]);
    const addH1 = () => {
        setTextareas([...textareas, 'redactorblock blcok-h1']);
    };

    const addH2 = () => {
        setTextareas([...textareas, 'redactorblock blcok-h2']);
    };

    const addH3 = () => {
        setTextareas([...textareas, 'redactorblock blcok-h3']);
    };

    const addText = () => {
        setTextareas([...textareas, 'redactorblock blcok-text']);
    };

    const addCode = () => {
        setTextareas([...textareas, 'redactorblock blcok-code']);
    };
    return(
        <div className={`${s.containerRedactor} ${active && s.active}`}>
            <h3>Add new Example</h3>
            <div className={s.redactorHed}>
                <button onClick={addH1}>H1</button>
                <button onClick={addH2}>H2</button>
                <button onClick={addH3}>H3</button>
                <button onClick={addText}>P</button>
                <button onClick={addCode}>CODE</button>
            </div>
            <div className={s.redactorTitle}>
                TITLE: <input type="text" placeholder={'title'}/>
            </div>
            <div className={s.redactorContent}>
                {textareas.map((className, index) => (
                    <div key={index} className={`${s.wrapTextarea} ${className}`}>
                        <span className={s.titleBlock}>{className.split(' ')[1].split('-')[1]}</span>
                        <textarea className={className} />
                    </div>

                ))}
            </div>
            Author: {user.email}
        </div>
    )
}