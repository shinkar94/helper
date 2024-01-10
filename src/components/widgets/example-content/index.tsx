'use client'
import s from './examle.module.scss'
import {AddNewExapmle} from "@/components/features";
import {ResponseCodePosts} from "@/lib";
import useSWR from "swr";
import {Loader} from "@/components/entities";
import {useEffect} from "react";
import {usePosts} from "@/components/shared/hok";

export const ExampleContent = () => {
    const {
        user,
        postsList,
        openAddNewList,
        getAllPosts,
        deletePost,
        setPostLists,
        openPosts,
        setOpenAddNewList,
        formatTeg
    } = usePosts()
    const {data, isLoading} = useSWR<ResponseCodePosts[]>(
        '/api/getAllPosts',
        () => getAllPosts({userEmail: user.email}).then((response) => response.data))

    useEffect(() => {
        if (data && data.length > 0) {
            console.log(data)
            const formatData: ResponseCodePosts[] = data.map((el: ResponseCodePosts) => ({...el, show: false}))
            setPostLists([...formatData])
        }
    }, [data])
    return (
        <div className={s.wrapper}>
            <div className={s.content}>
                {isLoading ? <Loader/> :
                    <>
                        {openAddNewList &&
                            <AddNewExapmle active={true} closeCallBack={() => setOpenAddNewList(false)}/>}
                        <div className={s.btnPanel}>
                            <button onClick={() => setOpenAddNewList(true)}>Add New Posts</button>
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
                                        <div className={s.bottomPanel}>
                                            <div className={s.btnBottom}>
                                                {user.email === el.author && <>
                                                    <button className={s.crudBtn}>Edit Posts</button>
                                                    <button className={s.crudBtn}
                                                            onClick={() => deletePost({idPost: el._id})}>Delete Posts
                                                    </button>
                                                </>}
                                            </div>
                                            <p className={s.authorPosts}>{`Author: ${el.author}`}</p>
                                        </div>

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