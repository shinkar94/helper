import {Header, Sidebar} from "@/components/widgets";
import s from './home.module.css'
import {FC, ReactNode} from "react";

type PropsType = {
    children: ReactNode;
}
export const HomePage:FC<PropsType> = ({children}) =>{
    return(
        <div className={s.homeWrapper}>
            <Header/>
            <div className={s.contentWrapper}>
              <Sidebar />
                <div className={'content'}>
                    {children}
                </div>
            </div>
        </div>
    )
}