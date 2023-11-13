'use client'
import {Sidebar, SignIn} from "@/components/widgets";
import {FC, ReactNode} from "react";
import {Loader} from "@/components/entities";
import useSWR from "swr";
import {getUserData} from "@/app/api/api-query/getUserData";
import {useAuthStore} from "@/app/store";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

type HomePageType = {
    children: ReactNode
}
export const HomePage:FC<HomePageType> = ({children}) => {
    const user = useAuthStore((state) => state.user)
    const {initialization} = useAuthStore()
    const {isLoading} = useSWR(['/api', initialization], getUserData)

    return (
            <div className={'homeWrapper'}>
                <div className={'contentWrapper'}>
                    <Sidebar/>
                    <div className={'content'}>
                        {!isLoading && (user.id ? children : <SignIn />)}
                    </div>
                    <ToastContainer
                        position="bottom-right"
                        autoClose={3000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="dark"
                    />
                    {isLoading && <Loader />}
                </div>
            </div>
    )
}