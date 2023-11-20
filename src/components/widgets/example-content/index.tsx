'use client'
import {useAuthStore} from "@/app/store";
import s from './examle.module.scss'
import {AddNewExapmle} from "@/components/features";

export const ExampleContent = () =>{
    const user = useAuthStore((state)=> state.user)
    return(
        <div className={s.wrapper}>
            <div className={s.content}>
                Example {user.email}
                <AddNewExapmle active={true}/>
            </div>
        </div>
    )
}