'use client'
import {useAuthStore} from "@/app/store";

export const LinkContent = () => {
    const user = useAuthStore((state)=> state.user)
    return(
        <>{user.email}</>
    )
}