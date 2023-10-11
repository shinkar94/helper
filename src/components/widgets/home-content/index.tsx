'use client'
import {getUserData} from "@/app/api/api-query/getUserData";
import useSWR from "swr";
import {useEffect} from "react";
import useAuthStore from "@/app/store/authStore/authStore";
import { useRouter } from 'next/navigation'



export const HomeContent = () =>{
    const {toggleUser,toggleInitial,user,initialization} = useAuthStore()
    const { data, isLoading, error } = useSWR("/api", getUserData);
    const router = useRouter();
    useEffect(() => {
        if (!initialization) {
            router.push('/Page/user/signUp');
        }
    }, [initialization]);
    useEffect(() => {
        console.log(data)
        if(data != undefined){
            if(data.error){
                toggleInitial(false)
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