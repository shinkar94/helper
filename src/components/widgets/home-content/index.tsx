'use client'
import {useAuthStore} from "@/app/store/authStore";
import {useSession, signIn, signOut} from 'next-auth/react'

export const HomeContent = () => {
    const {data: session} = useSession()
    const user = useAuthStore((state) => state.user)
    return (
        <>
            <h3>Email: {user.email}</h3>
            This home content

            <h5>Email google: </h5>
            {session
                ? (<>
                    <div>Welcome {session.user?.email}</div>
                    <button onClick={() => signOut()}>SignOut from Google</button>
                </>)
                : (<>
                        <div>You are not sign in</div>
                        <button onClick={() => signIn()}>SignIn to Google</button>
                    </>
                )
            }
        </>
    )
}