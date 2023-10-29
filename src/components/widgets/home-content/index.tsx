'use client'
import {useAuthStore} from "@/app/store/authStore";


export const HomeContent = () =>{
    const user = useAuthStore((state)=> state.user)
    return(
        <>
            <h3>Email: {user.email}</h3>
            This home content
        </>
    )
}