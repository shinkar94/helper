'use client'
import {Sidebar, SignIn} from "@/components/widgets";
import {FC, ReactNode} from "react";
import {useAuthStore} from "@/app/store";
import {Loader} from "@/components/entities";

type HomePageType = {
    children: ReactNode
}
export const HomePage:FC<HomePageType> = ({children}) => {
    const initialization = useAuthStore((state) => state.initialization)
    const loading = useAuthStore((state) => state.loading)
    return (
            <div className={'homeWrapper'}>
                <div className={'contentWrapper'}>
                    <Sidebar/>
                    <div className={'content'}>
                        {loading === false && (initialization ? children : <SignIn/>)}
                    </div>
                    {loading && <Loader />}
                </div>
            </div>
    )
}