'use client'
import {useAuthStore} from "@/app/store/authStore";
import s from './homeContent.module.scss'
import Image from "next/image";
import {UserDefault} from "@/components/shared";
import {AddToHomeScreen} from "@/components/features";
import {Workbox, WorkboxMessageEvent} from 'workbox-window';
import {useEffect} from "react";

export const HomeContent = () => {
    const user = useAuthStore((state) => state.user)

    const wb = new Workbox('/sw.js');

    const handleCacheUpdate = (event:WorkboxMessageEvent) => {
        if (event.data.type === 'CACHE_UPDATED') {
            const {updatedURL} = event.data.payload;
            alert(`A newer version of ${updatedURL} is available!`);
        }
    }

    useEffect(() => {
        wb.addEventListener('message', handleCacheUpdate);

        return () => {
            wb.removeEventListener('message', handleCacheUpdate);
        };
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