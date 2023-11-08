'use client'
import {Sidebar, SignIn} from "@/components/widgets";
import {FC, ReactNode} from "react";
import {useAuthStore} from "@/app/store";

type HomePageType = {
    children: ReactNode
}
export const HomePage:FC<HomePageType> = ({children}) => {
    const initialization = useAuthStore((state) => state.initialization)
    return (
            <div className={'homeWrapper'}>
                <div className={'contentWrapper'}>
                    <Sidebar/>
                    <div className={'content'}>
                        {initialization ? children : <SignIn/>}
                    </div>
                </div>
            </div>
    )
}