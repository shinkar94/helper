import {useSession, signIn, signOut} from 'next-auth/react'
export const GoogleAuth = () =>{
    const {data: session} = useSession()
    if(session){
        return(
            <>
                <div>Welcome {session.user?.email}</div>
                <button onClick={()=> signOut()}>SignOut from Google</button>
            </>
        )
    }else{
        return(
            <>
                <div>You are not sign in</div>
                <button onClick={()=> signIn()}>SignIn to Google</button>
            </>

        )
    }
}