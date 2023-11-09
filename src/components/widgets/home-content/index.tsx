'use client'
import {useAuthStore} from "@/app/store/authStore";
import s from './homeContent.module.scss'
import Image from "next/image";
import {useSWRConfig} from "swr";
import {UserType} from "@/lib/types";

export const HomeContent = () => {
    const {cache} = useSWRConfig()
    const userData:UserType = cache.get('/api')?.data
    return (
        <div className={s.wrapper}>
            <div className={s.content}>
                <div className={s.userBlock}>
                    <Image src={userData.avatarUrl} alt={'userImg'} width={'80'} height={'80'} priority/>
                    <div className={s.infoUser}>
                        <h3>{userData.fullName}</h3>
                        <p>{userData.email}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}