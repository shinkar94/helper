'use client'
import s from './sideBar.module.scss'
import Link from "next/link";
import {
    ChatIcon,
    CodeIcon,
    ExitIcon,
    HomeIcon,
    LibIcon,
    LinkIcon,
    SettingsIcon, TestingIcon,
    TodoIcon, ToolsIcon,
    UserDefault
} from "@/components/shared";
import {useAuthStore} from "@/app/store";
import Image from "next/image";
import {UseAuthUser} from "../../shared/hok";

export const Sidebar = () => {
    const user = useAuthStore((state) => state.user)
    const {logOut, session} = UseAuthUser()

    return (
        <div className={`${s.Sidebar}`}>
            <div className={s.blockLink}>
                <div className={s.linkImage}>
                    <Link href={'/'} ><div className={s.linkSvg}>{user.avatarUrl
                        ? <Image src={session?.user?.image ?? user.avatarUrl} width={30} height={30} alt={'logoImg'}/>
                        : <UserDefault/>}</div>
                    </Link>
                </div>
            </div>
            <hr className={s.line}/>
            <div className={s.blockLink}>
                <div className={s.link}><Link href={'/'} ><div className={s.linkSvg}><HomeIcon /></div> Home</Link></div>
                <div className={s.link}><Link href={'/Page/library'} ><div className={s.linkSvg}><LibIcon/></div> Hot Libraries</Link></div>
                <div className={s.link}><Link href={'/Page/example'} ><div className={s.linkSvg}><CodeIcon/></div> Example</Link></div>
                <div className={s.link}><Link href={'/Page/link'} ><div className={s.linkSvg}><LinkIcon/></div> Link</Link></div>
                <div className={s.link}><Link href={'/Page/testing'} ><div className={s.linkSvg}><TestingIcon/></div> Test</Link></div>
                <div className={s.link}><Link href={'/Page/tools'} ><div className={s.linkSvg}><ToolsIcon/></div> Tools</Link></div>
                <div className={s.link}><Link href={'/Page/todos'} ><div className={s.linkSvg}><TodoIcon/></div> Todos</Link></div>
                <div className={s.link}><Link href={''} ><div className={s.linkSvg}><ChatIcon/></div> Chat</Link></div>
            </div>
            <hr className={s.line}/>
            <div className={s.blockLink}>
                <div className={s.link}><Link href={''} ><div className={s.linkSvg}><SettingsIcon/></div> Settings</Link></div>
                {user.id
                    ? <div className={s.link} onClick={logOut}><Link href={''} ><div className={s.linkSvg}><ExitIcon/></div> Logout</Link></div>
                    : (<div className={s.link}><Link href={'/Page/user/sign-up'} ><div className={s.linkSvg}><ExitIcon/></div> SignUp</Link></div>)}
            </div>
        </div>
    )
}