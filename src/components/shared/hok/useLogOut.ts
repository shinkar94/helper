'use client'
import {removeUser} from "@/app/store/authStore";
import {useSession, signIn, signOut} from 'next-auth/react'


export const UseAuthUser = () => {
    const {data: session} = useSession()
    async function logOut(event: React.MouseEvent<HTMLDivElement>) {
        event.preventDefault()
        try {
            const response = await fetch("/api/auth/logout", {
                method: "GET",
                headers: {"Content-Type": "application/json"},
            });
            if (response.status) {
                removeUser()
            }
            console.log(response)
        } catch (error) {
            console.log(error);
        }
    }

    function googleLogin (event: React.MouseEvent<HTMLDivElement>) {
        event.preventDefault()
        signIn()
    }

    return {logOut, googleLogin, session}
}