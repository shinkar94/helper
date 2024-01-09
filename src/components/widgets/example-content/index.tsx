'use client'
import {useAuthStore} from "@/app/store";
import s from './examle.module.scss'
import {AddNewExapmle} from "@/components/features";
import {CodePostsState, ResponseCodePosts} from "@/lib";
import useSWR from "swr";
import {Loader} from "@/components/entities";
import {useEffect, useState} from "react";
import {copyTextInBuffer, StaticCopyIcon} from "@/components/shared";

export const ExampleContent = () => {
    const user = useAuthStore((state) => state.user)
    const [postsList, setPostLists] = useState<CodePostsState[] | []>([])
    const [openAddNewList, setOpenAddNewList] = useState(false)
    const {data, isLoading} = useSWR<ResponseCodePosts[]>(
        '/api/getAllPosts',
        () => getAllPosts({userEmail: user.email}).then((response) => response.data))
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
    const openPosts = (id: string, isShow: boolean) => {
        setPostLists(postsList.map(el => el._id === id ? {...el, show: !isShow } : el))
    }
    useEffect(() => {
        if (data && data.length > 0) {
            console.log(data)
            const formatData: CodePostsState[] = data.map((el: ResponseCodePosts) => ({...el, show: false}))
            setPostLists([...formatData])
        }
    }, [data])
    return (
        <div className={s.wrapper}>
            <div className={s.content}>
                {isLoading ? <Loader/> :
                    <>
                        {openAddNewList && <AddNewExapmle active={true} closeCallBack={()=> setOpenAddNewList(false)}/>}
                        <div className={s.btnPanel}>
                            <button onClick={()=> setOpenAddNewList(true)}>Add New Posts</button>
                        </div>
                        <div className={s.listPosts}>
                            {postsList.map((el) => {
                                return (
                                    <div className={s.posts} key={el._id}>
                                        <div className={s.topTitle} onClick={() => openPosts(el._id, el.show)}>
                                            <h3 className={s.title}>{el.title}</h3>
                                        </div>
                                        <div className={`${s.postsContent} ${el.show && s.openContent}`}>
                                            {el.dataCode.map((el) => {
                                                return formatTeg(el._id, el.tag, el.text)
                                            })}
                                        </div>
                                        <p className={s.authorPosts}>{`Author: ${el.author}`}</p>
                                    </div>
                                )
                            })}

                        </div>
                    </>
                }
            </div>
        </div>
    )
}