'use client'
import {removeUser, toggleInitial, toggleUser, useAuthStore} from "@/app/store/authStore";
import {signIn, signOut, useSession} from 'next-auth/react'
import {TypeSignInSchema, UserResponseType} from "@/lib/types";
import {PayloadType} from "@/app/service/generate-token/generateToken";
import {useSWRConfig} from "swr";


export const UseAuthUser = () => {
    const {data: session} = useSession()
    const {setLoading} = useAuthStore()
    const {mutate} = useSWRConfig()
    async function logOut(event: React.MouseEvent<HTMLDivElement>) {
        event.preventDefault()
        setLoading(true)
        try {
            const response = await fetch("/api/auth/logout", {
                method: "GET",
                headers: {"Content-Type": "application/json"},
            });
            if (response.status) {
                signOutGoogle()
                mutate('/api', null, {revalidate: false});
                removeUser()
            }
            console.log(response)
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }
    const sendDataUser = async (dataForm: TypeSignInSchema) => {
        try {
            setLoading(true)
            const response = await fetch("/api/auth/login", {
                method: "POST",
                body: JSON.stringify(dataForm),
                headers: {"Content-Type": "application/json"},
            });
            const data: UserResponseType = await response.json();
            const {_id, email, avatarUrl, fullName} = data
            const user: PayloadType = {id: _id, email, avatarUrl, fullName}
            toggleUser(user)
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }
    const sendGoogleData = async (email: string) => {
        setLoading(true)
        const dataForm = {email}
        try {
            const response = await fetch("/api/auth/loginGoogle", {
                method: "POST",
                body: JSON.stringify(dataForm),
                headers: { "Content-Type": "application/json" },
            });
            const data: UserResponseType = await response.json();
            const { _id, email, avatarUrl, fullName } = data;
            const user: PayloadType = { id: _id, email, avatarUrl, fullName };
            toggleUser(user)
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }
    function signOutGoogle(){
        signOut()
    }

    function googleLogin (event: React.MouseEvent<HTMLDivElement>) {
        event.preventDefault()
        signIn()
    }

    return {logOut, googleLogin,signOutGoogle,sendGoogleData,sendDataUser, session}
}