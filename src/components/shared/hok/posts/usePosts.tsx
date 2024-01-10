import {useSWRConfig} from "swr";
import {useAuthStore} from "@/app/store";
import {ChangeEvent, useEffect, useState} from "react";
import {v1 as uuidv1} from "uuid";
import {DataCodeType, ResponseCodePosts, TextareaType} from "@/lib";
import {AddCodeMutation} from "@/app/api/api-query/posts-code";
import {toast} from "react-toastify";
import s from "@/components/widgets/example-content/examle.module.scss";
import {copyTextInBuffer, StaticCopyIcon} from "@/components/shared";
export const usePosts = () => {
    const {cache, mutate} = useSWRConfig()
    const user = useAuthStore((state) => state.user)
    const [textareas, setTextareas] = useState<TextareaType[]>([]);
    const [titleValue, setTitleValue] = useState("");
    const [postsList, setPostLists] = useState<ResponseCodePosts[] | []>([])
    const [openAddNewList, setOpenAddNewList] = useState(false)

    const openPosts = (id: string, isShow: boolean) => {
        setPostLists(postsList.map(el => el._id === id ? {...el, show: !isShow } : el))
    }
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
    const getAllPosts = async (sendData: { userEmail: string }): Promise<{ data: ResponseCodePosts[] }> => {
        try {
            const response = await fetch("/api/posts/get-all-posts", {
                method: "POST",
                body: JSON.stringify(sendData),
                headers: {"Content-Type": "application/json"},
            });
            const data: ResponseCodePosts[] = await response.json();
            return {data}
        } catch (e) {
            console.log(e);
            throw e;
        }
    };
    const deletePost = async (sendData: { idPost: string }) => {
        try {
            const response = await fetch("/api/posts/delete-post", {
                method: "POST",
                body: JSON.stringify(sendData),
                headers: {"Content-Type": "application/json"},
            });
            const data: {error: string} | {success: string} = await response.json();
            if("success" in data){
                const dataCacheCode: ResponseCodePosts[] = cache.get('/api/getAllPosts')?.data
                const newCache: ResponseCodePosts[] = dataCacheCode.filter(el => el._id !== sendData.idPost)
                cache.set('/api/getAllPosts', {data: [...newCache]})
                await mutate('/api/getAllPosts')
                toast.success(data.success)
            }else{
                toast.error(data.error)
            }

        } catch (e) {
            console.log(e);
            throw e;
        }
    }
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
            const dataCacheCode: ResponseCodePosts[] = cache.get('/api/getAllPosts')?.data
            if (dataCacheCode.length > 0) {
                const formatResponse: ResponseCodePosts = {...response}
                cache.set('/api/getAllPosts', {data: [...dataCacheCode, formatResponse]})
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
    const formatTeg = (id: string, tagName: string, text: string) => {
        const tagParts = tagName.split(' ');
        const secondWord = tagParts[1];
        if (secondWord === "blcok-code") {
            return (<code key={id} className={s[secondWord]}>
                <button onClick={() => copyTextInBuffer(text)}><StaticCopyIcon/></button>
                <pre className={s.code}>{text.trim()}</pre>
            </code>)
        } else if (secondWord === "blcok-h1") {
            return <h1 key={id} className={s[secondWord]}>{text}</h1>
        } else if (secondWord === "blcok-h2") {
            return <h2 key={id} className={s[secondWord]}>{text}</h2>
        } else if (secondWord === "blcok-h3") {
            return <h3 key={id} className={s[secondWord]}>{text}</h3>
        } else {
            return <p key={id} className={s[secondWord]}>{text}</p>
        }

    }

    return {
        addH1,
        addH2,
        addH3,
        addText,
        addTitle,
        addCode,
        formatTeg,
        closeTextarea,
        sendNewPost,
        getAllPosts,
        deletePost,
        addTextNewText,
        setTextareas,
        setPostLists,
        setOpenAddNewList,
        openPosts,
        openAddNewList,
        postsList,
        textareas,
        titleValue,
        user
    }
}