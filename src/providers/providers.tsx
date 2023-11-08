import {SessionProvider} from "next-auth/react";
import {createContext, ReactNode} from "react";
import {useAuthStore} from "@/app/store/authStore";
import {useLibStore} from "@/app/store/LibStore";

interface Props{
    children: ReactNode
}
export const AuthContext = createContext<ReturnType<typeof useAuthStore>>(null);
export const HotLibContext = createContext<ReturnType<typeof useLibStore>>(null);
const Providers = ({children}: Props) => {
    const authData = useAuthStore();
    const hotLibData = useLibStore()
    return (
        <SessionProvider>
            <AuthContext.Provider value={authData}>
                <HotLibContext.Provider value={hotLibData}>
                    {children}
                </HotLibContext.Provider>
            </AuthContext.Provider>
        </SessionProvider>
    )
}

export default Providers