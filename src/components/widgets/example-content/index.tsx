'use client'
import {useAuthStore} from "@/app/store";

export const ExampleContent = () =>{
    const user = useAuthStore((state)=> state.user)
    return(
        <>Example {user.email}</>
    )
}