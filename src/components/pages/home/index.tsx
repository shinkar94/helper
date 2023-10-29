'use client'
import {Header, HomeContent, Sidebar, SignIn} from "@/components/widgets";
import s from './home.module.css'
import {FC, ReactNode, useEffect} from "react";
import {useAuthStore} from "@/app/store";
import useSWR from "swr";
import {getUserData} from "@/app/api/api-query/getUserData";
import {toggleInitial, toggleUser} from "@/app/store/authStore";

type PropsType = {
    children: ReactNode;
}
export const HomePage: FC<PropsType> = ({children}) => {
    const {data, isLoading, error} = useSWR("/api", getUserData);
    const initialization = useAuthStore((state) => state.initialization)
    useEffect(() => {
        console.log(data)
        if (data != undefined) {
            if (data.error) {
                toggleInitial(false)
                // router.push('/Page/user/signUp');
            } else {
                toggleUser(data)
                toggleInitial(true)
            }
        }
    }, [data]);
    return (
        <div className={s.homeWrapper}>
            <Header/>
            <div className={s.contentWrapper}>
                <Sidebar/>
                {isLoading
                    ? <h1>Loading.....</h1>
                    : <div className={'content'}>
                        {initialization ? <HomeContent/> : <SignIn/>}
                    </div>
                }
            </div>
        </div>
    )
}