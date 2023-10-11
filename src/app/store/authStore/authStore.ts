import {create} from "zustand";
import {PayloadType} from "@/app/service/generate-token/generateToken";


type StoreType = {
    toggleInitial: (status: boolean)=>void
    toggleUser: (payload: PayloadType)=>void
    initialization: boolean,
    user: PayloadType
}


const useAuthStore = create<StoreType>(
    (set)=>({
        initialization: false,
        user: {
            id: '',
            email: '',
            fullName: '',
            avatarUrl: ''
        },
       toggleInitial: (status: boolean) =>
           set({ initialization: status }),
       toggleUser: (payload: PayloadType)=>{
           set({user: {
               id: payload.id,
                   email: payload.email,
                   fullName: payload.fullName,
                   avatarUrl: payload.avatarUrl
           }})
       }
    })
)

export default useAuthStore