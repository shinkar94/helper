'use client'
import Link from "next/link";
import Image from "next/image";
import s from './header.module.css'
import {UserDefault} from "@/components/shared";
import {useAuthStore} from "@/app/store";

export const Header = () =>{
    const user = useAuthStore((state) => state.user)
    const initialization = useAuthStore((state) => state.initialization)
    let email = '';
    let fulName = '';
    if(user?.fullName){
        email = removeLength(user.email)
        fulName = removeLength(user.fullName)
    }

    function removeLength (queryStr:string){
        const countLine = queryStr.length
        if(countLine > 15){
            const fullCount = queryStr.length
            const removeCount = fullCount - 15
            return  queryStr.slice(0, -removeCount) + "..."
        }
        return queryStr;
    }
    return(
        <header className={s.header}>
            <div className={s.logoUser}>
                {user.avatarUrl ? <Image src={user.avatarUrl} width={40} height={40} alt={'logoImg'}/> : <UserDefault />}
                <div className={s.textInfo}>
                    <h4>{fulName}</h4>
                    <p>{email}</p>
                </div>
            </div>
            <div className="title">
                <Link href={'/'} >Helper</Link>
            </div>
            <div className="btnPanel">
                <Link href={''} >SignUp</Link>
                |
                {initialization
                    ? <Link href={'/Page/user/log-out'} >logOut</Link>
                    : <Link href={'/Page/user/signIn'} >SignIn</Link>}
            </div>
        </header>
    )
}