'use client'
import s from './sideBar.module.css'
import Link from "next/link";
import {useState} from "react";
export const Sidebar = () =>{
    const [showSideBar, setShowSideBar] = useState(false)
    const toggleShowSidebar = () => {
        setShowSideBar(!showSideBar)
    }
    return(
        <div className={`${s.Sidebar} ${showSideBar && s.open}`}>
            <div className={s.blockLink}>
                <Link href={'/'} >Home</Link>
                <Link href={'/Page/library'} >Hot Libraries</Link>
                <Link href={'/Page/example'} >Example</Link>
                <Link href={'/Page/link'} >Link</Link>
                <Link href={'/Page/todos'} >Todos</Link>
                <Link href={''} >Chat</Link>
            </div>
            <button onClick={toggleShowSidebar} className={s.openBar}>||</button>
        </div>
    )
}