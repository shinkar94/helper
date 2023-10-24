'use client'
import {getUserData} from "@/app/api/api-query/getUserData";
import useSWR from "swr";
import {useEffect} from "react";
import {toggleInitial, toggleUser, useAuthStore} from "@/app/store/authStore";
import { useRouter } from 'next/navigation'

export const HomeContent = () =>{
    const user = useAuthStore((state)=> state.user)
    const { data, isLoading, error } = useSWR("/api", getUserData);
    const router = useRouter();
    useEffect(() => {
        if(data != undefined){
            if(data.error){
                toggleInitial(false)
                router.push('/Page/user/signUp');
            }else {
                toggleUser(data)
                toggleInitial(true)
            }
        }
    }, [data]);

    return(
        <>
            {isLoading && <h1>Loading.....</h1>}
            <h1>Email: {user.fullName}</h1>
            This home content
        </>
    )
}