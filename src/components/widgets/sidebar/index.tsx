'use client'
import s from './sideBar.module.css'
import Link from "next/link";
import {useState} from "react";
import {
    ChatIcon,
    CodeIcon,
    ExitIcon,
    HomeIcon,
    LibIcon,
    LinkIcon,
    SettingsIcon,
    TodoIcon,
    UserDefault
} from "@/components/shared";
import {useAuthStore} from "@/app/store";
import Image from "next/image";
import {removeUser} from "@/app/store/authStore";
import {PayloadType} from "@/app/service/generate-token/generateToken";
export const Sidebar = () =>{
    const user:PayloadType = useAuthStore((state) => state.user)
    const initialization = useAuthStore((state) => state.initialization)
    const [showSideBar, setShowSideBar] = useState(false)
    const toggleShowSidebar = () => {
        setShowSideBar(!showSideBar)
    }
    const logOut = async (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault()
        try {
            const response = await fetch("/api/auth/logout", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });
            if(response.status){
                removeUser()
            }
            console.log(response)
        } catch (error) {
            console.log(error);
        }
    };
    return(
        <div className={`${s.Sidebar} ${showSideBar && s.open}`}>
            <div className={s.blockLink}>
                <div className={s.linkImage}><Link href={'/'} ><div className={s.linkSvg}>{user.avatarUrl ? <Image src={user.avatarUrl} width={30} height={30} alt={'logoImg'}/> : <UserDefault/>}</div></Link></div>
            </div>
            <hr className={s.line}/>
            <div className={s.blockLink}>
                <div className={s.link}><Link href={'/'} ><div className={s.linkSvg}><HomeIcon /></div> Home</Link></div>
                <div className={s.link}><Link href={'/Page/library'} ><div className={s.linkSvg}><LibIcon/></div> Hot Libraries</Link></div>
                <div className={s.link}><Link href={'/Page/example'} ><div className={s.linkSvg}><CodeIcon/></div> Example</Link></div>
                <div className={s.link}><Link href={'/Page/link'} ><div className={s.linkSvg}><LinkIcon/></div> Link</Link></div>
                <div className={s.link}><Link href={'/Page/todos'} ><div className={s.linkSvg}><TodoIcon/></div> Todos</Link></div>
                <div className={s.link}><Link href={''} ><div className={s.linkSvg}><ChatIcon/></div> Chat</Link></div>
            </div>
            <hr className={s.line}/>
            <div className={s.blockLink}>
                <div className={s.link}><Link href={''} ><div className={s.linkSvg}><SettingsIcon/></div> Settings</Link></div>
                {initialization
                    ? <div className={s.link} onClick={logOut}><Link href={''} ><div className={s.linkSvg}><ExitIcon/></div> Logout</Link></div>
                    : <div className={s.link}><Link href={'/Page/user/sign-up'} ><div className={s.linkSvg}><ExitIcon/></div> SignUp</Link></div>}
            </div>
        </div>
    )
}