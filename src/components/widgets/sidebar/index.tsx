'use client'
import s from './sideBar.module.css'
import Link from "next/link";
import {useState} from "react";
import {ChatIcon, CodeIcon, ExitIcon, HomeIcon, LibIcon, LinkIcon, SettingsIcon, TodoIcon} from "@/components/shared";
export const Sidebar = () =>{
    const [showSideBar, setShowSideBar] = useState(false)
    const toggleShowSidebar = () => {
        setShowSideBar(!showSideBar)
    }
    return(
        <div className={`${s.Sidebar} ${showSideBar && s.open}`}>
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
                <div className={s.link}><Link href={''} ><div className={s.linkSvg}><ExitIcon/></div> Logout</Link></div>
            </div>
        </div>
    )
}