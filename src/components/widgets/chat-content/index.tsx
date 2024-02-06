"use client"
import s from './chat.module.scss'
import {UserDefault} from "@/components/shared";
import {useRouter} from "next/navigation";


export const ChatContent = () => {
    const router = useRouter()
    const backPage = () =>{
        router.push("/")
    }
    return (
        <div className={s.chatWrapper}>
            <div className={s.chatHeader}>
                <button onClick={backPage}>Back</button>Header</div>
            <div className={s.content}>
                <div className={s.margeList}>
                    <div className={s.userMarge}></div>
                    <div className={s.userMarge}></div>
                    <div className={s.userMarge}></div>
                    <div className={s.userMarge}></div>
                    <div className={s.userMarge}></div>
                    <div className={s.userMarge}></div>
                    <div className={s.userMarge}></div>
                    <div className={s.userMarge}></div>
                    <div className={s.userMarge}></div>
                    <div className={s.userMarge}></div>
                </div>
                <div className={s.messagesList}>
                    <div className={s.messagesBlock}>
                        <div className={s.leftPanel}>
                            <div className={s.avatarBlock}>
                                <UserDefault/>
                            </div>
                            <div className={s.infoBlock}>
                                <div className={s.infoTitle}>Title</div>
                                <div className={s.infoText}>Lorem asd asd asd fjsdl...</div>
                            </div>
                            <div className={s.timeBlock}>11:32</div>
                        </div>
                        <div className={s.rightPanel}>
                            <button>Dl</button>
                            <button>Ch</button>
                        </div>
                    </div>
                    <div className={s.messagesBlock}>
                        <div className={s.leftPanel}>
                            <div className={s.avatarBlock}>
                                <UserDefault/>
                            </div>
                            <div className={s.infoBlock}>
                                <div className={s.infoTitle}>Title</div>
                                <div className={s.infoText}>Lorem asd asd asd fjsdl...</div>
                            </div>
                            <div className={s.timeBlock}>11:32</div>
                        </div>
                        <div className={s.rightPanel}>
                            <button>Dl</button>
                            <button>Ch</button>
                        </div>
                    </div>
                    <div className={s.messagesBlock}>
                        <div className={s.leftPanel}>
                            <div className={s.avatarBlock}>
                                <UserDefault/>
                            </div>
                            <div className={s.infoBlock}>
                                <div className={s.infoTitle}>Title</div>
                                <div className={s.infoText}>Lorem asd asd asd fjsdl...</div>
                            </div>
                            <div className={s.timeBlock}>11:32</div>
                        </div>
                        <div className={s.rightPanel}>
                            <button>Dl</button>
                            <button>Ch</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};