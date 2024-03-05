'use client'
import {useAuthStore} from "@/app/store/authStore";
import s from './homeContent.module.scss'
import Image from "next/image";
import {UserDefault} from "@/components/shared";
import {AddToHomeScreen} from "@/components/features";
import addNotification from 'react-push-notification'
import {useEffect} from "react";
import logo from '../../../../public/helper-48.png'

export const HomeContent = () => {
    const user = useAuthStore((state) => state.user)
    useEffect(() => {
        const iconUrl = logo.src;
        addNotification({
            title: 'Helper',
            message: 'Hi! Welcome to helper app!',
            duration: 40000,
            icon: iconUrl,
            native: true
        })
    }, []);
    return (
        <div className={s.wrapper}>
            <div className={s.content}>
                <div className={s.userBlock}>
                    {
                        user.avatarUrl
                            ? <Image src={user.avatarUrl} alt={'userImg'} width={'80'} height={'80'} priority/>
                            : <UserDefault/>
                    }
                    <div className={s.infoUser}>
                        <h3>{user.fullName}</h3>
                        <p>{user.email}</p>
                    </div>
                </div>
                <AddToHomeScreen/>
            </div>
        </div>
    )
}