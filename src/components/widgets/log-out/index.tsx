"use client"
import React, {useEffect} from 'react';
import {logoutQuery} from "@/app/api/api-query/logoutQuery";
import {useRouter} from "next/navigation";
import {removeUser} from "@/app/store/authStore";
import useSWR from "swr";

export const LogOut = () => {
    const { data, isLoading, error } = useSWR("/api/auth/logout", logoutQuery);
    const router = useRouter();
    useEffect(() => {
        if(data != undefined){
            if(data.status){
                removeUser()
                router.push('/');
            }
        }
    }, [data]);
    return (
        <div>
            {isLoading && <h1>Loading.....</h1>}
        </div>
    );
};