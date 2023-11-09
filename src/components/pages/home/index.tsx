'use client'
import {Sidebar, SignIn} from "@/components/widgets";
import {FC, ReactNode} from "react";
import {Loader} from "@/components/entities";
import useSWR, {useSWRConfig} from "swr";
import {getUserData} from "@/app/api/api-query/getUserData";
import {UserType} from "@/lib/types";

type HomePageType = {
    children: ReactNode
}
export const HomePage:FC<HomePageType> = ({children}) => {
    const {isLoading} = useSWR('/api', getUserData)
    const {cache} = useSWRConfig()
    const userData:UserType = cache.get('/api')?.data
    return (
            <div className={'homeWrapper'}>
                <div className={'contentWrapper'}>
                    <Sidebar/>
                    <div className={'content'}>
                        {!isLoading && (userData?.id ? children : <SignIn/>)}
                    </div>
                    {isLoading && <Loader />}
                </div>
            </div>
    )
}