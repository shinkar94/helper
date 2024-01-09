import s from './addNewExample.module.scss'
import {ChangeEvent, FC, useState} from "react";
import {useAuthStore} from "@/app/store";
import {v1 as uuidv1} from 'uuid';
import {CodePostsState, DataCodeType, ResponseCodePosts} from "@/lib";
import {AddCodeMutation} from "@/app/api/api-query/posts-code";
import {toast} from "react-toastify";
import {useSWRConfig} from "swr";

type Props = {
    active: boolean
    closeCallBack: () => void
}
type TextareaType = {
    id: string
    tagName: string
    text: string
}
export const AddNewExapmle: FC<Props> = ({active, closeCallBack}) => {
    const {cache,mutate} = useSWRConfig()
    const user = useAuthStore((state) => state.user)
    const [textareas, setTextareas] = useState<TextareaType[]>([]);
    const [titleValue, setTitleValue] = useState("");
    const addH1 = () => {
        setTextareas([...textareas, {id: uuidv1(), tagName: 'redactorblock blcok-h1', text: ''}]);
    };

    const addH2 = () => {
        setTextareas([...textareas, {id: uuidv1(), tagName: 'redactorblock blcok-h2', text: ''}]);
    };

    const addH3 = () => {
        setTextareas([...textareas, {id: uuidv1(), tagName: 'redactorblock blcok-h3', text: ''}]);
    };

    const addText = () => {
        setTextareas([...textareas, {id: uuidv1(), tagName: 'redactorblock blcok-text', text: ''}]);
    };

    const addCode = () => {
        setTextareas([...textareas, {id: uuidv1(), tagName: 'redactorblock blcok-code', text: ''}]);
    };
    const sendNewPost = async () => {
        const dataPost: DataCodeType[] = textareas.map(el => {
            return {
                tag: el.tagName,
                text: el.text
            }
        })
        const title = titleValue;
        const author = user.email;
        const response: ResponseCodePosts | { error: string } = await AddCodeMutation(dataPost, title, author)
        if ("error" in response) {
            toast.error(response.error)
        } else {
            const dataCacheCode:ResponseCodePosts[]  = cache.get('/api/getAllPosts')?.data
            if(dataCacheCode.length > 0){
                const formatData: CodePostsState[] = dataCacheCode.map((el: ResponseCodePosts) => ({...el, show: false}))
                const formatResponse: CodePostsState = {...response, show: false}
                cache.set('/api/getAllPosts', {data: [...formatData, formatResponse]})
                await mutate('/api/getAllPosts')
                toast("posts updates")
            }
        }
        console.log("Response Data", response)
    }
    const addTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitleValue(e.currentTarget.value)
    }
    const closeTextarea = (id: string) => {
        setTextareas(textareas.filter(el => el.id !== id));
    }
    const addTextNewText = (id: string, e: ChangeEvent<HTMLTextAreaElement>) => {
        setTextareas(textareas.map(el => el.id === id ? {...el, text: e.currentTarget.value} : el))
    }
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