'use client'
import {useAuthStore} from "@/app/store";

export const TodosContent = () =>{
    const user = useAuthStore((state)=> state.user)
    return(
        <>TodosContent {user.email}</>
    )
}