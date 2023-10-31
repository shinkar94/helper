'use client'
import {removeUser} from "@/app/store/authStore";


export const UseLogOut = () => {
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

    return {logOut}
}