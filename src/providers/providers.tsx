import {SessionProvider} from "next-auth/react";
import {createContext, ReactNode} from "react";
import {useAuthStore} from "@/app/store/authStore";

interface Props{
    children: ReactNode
}
export const AuthContext = createContext<ReturnType<typeof useAuthStore>>(null);
const Providers = ({children}: Props) => {
    const authData = useAuthStore();
    return (
        <SessionProvider>
            <AuthContext.Provider value={authData}>
                {children}
            </AuthContext.Provider>
        </SessionProvider>
    )
}

export default Providers