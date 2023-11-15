'use client'
import {useAuthStore} from "@/app/store/authStore";
import s from './homeContent.module.scss'
import Image from "next/image";
import {UserDefault} from "@/components/shared";
import {AddToHomeScreen} from "@/components/features";
import {useEffect} from "react";

export const HomeContent = () => {
    const user = useAuthStore((state) => state.user)
    return (
        <div className={s.wrapper}>
            <div className={s.content}>
                <div className={s.userBlock}>
                    {
                        user.avatarUrl
                            ?<Image src={user.avatarUrl} alt={'userImg'} width={'80'} height={'80'} priority/>
                            :<UserDefault />
                    }
                    <div className={s.infoUser}>
                        <h3>{user.fullName}</h3>
                        <p>{user.email}</p>
                    </div>
                </div>
                {/*<InstallPWA />*/}
                <AddToHomeScreen />
            </div>
        </div>
    )
}