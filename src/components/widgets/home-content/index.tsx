'use client'
import {useAuthStore} from "@/app/store/authStore";
import s from './homeContent.module.scss'
import Image from "next/image";
import {UserDefault} from "@/components/shared";
import {AddToHomeScreen} from "@/components/features";
import {Workbox, WorkboxMessageEvent} from 'workbox-window';
import {useEffect, useState} from "react";

export const HomeContent = () => {
    const user = useAuthStore((state) => state.user)
    const [showRefreshButton, setShowRefreshButton] = useState(false);
    const [version, setVersion] = useState('')
    const [scriptUrl, setScriptUrl] = useState('')


    const wb = new Workbox('/sw.js');

    const checkUrl = async (url:string) =>{
        const response = await fetch(`${url}`)
        console.log(response)
    }

    useEffect(()=>{
        const scripts = document.getElementsByTagName('script');
        // console.log("script", scripts[0].src)
        setScriptUrl(scripts[0].src)
        const currentScript = scripts[scripts.length - 1];
        // console.log("current script", currentScript.src)
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            scriptUrl && checkUrl(scriptUrl);
        }, 10000);

        return () => {
            clearInterval(interval);
        };
    }, [scriptUrl]);

    const handleCacheUpdate = (event:WorkboxMessageEvent) => {
        if (event.data.type === 'CACHE_UPDATED') {
            const {updatedURL} = event.data.payload;
            alert(`A newer version of ${updatedURL} is available!`);
            setShowRefreshButton(true);
        }
    }

    // const handleRefresh = () => {
    //     if (wb) {
    //         wb.addEventListener('controlling', () => {
    //             window.location.reload();
    //         });
    //         wb.messageSkipWaiting();
    //     }
    // };

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
                        <p>test send query</p>
                    </div>
                </div>
                <AddToHomeScreen/>
                {/*{showRefreshButton && <button onClick={handleRefresh}>Refresh</button>}*/}
            </div>
        </div>
    )
}