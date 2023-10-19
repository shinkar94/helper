import {create} from "zustand";
import {PayloadType} from "@/app/service/generate-token/generateToken";
import {immer} from "zustand/middleware/immer";

interface ManagersStoreState {
    initialization: boolean,
    user: PayloadType
}
interface ManagersStoreActions {
    toggleInitial: (status: boolean)=>void
    toggleUser: (payload: PayloadType)=>void
}


export const useAuthStore = create(
    immer<ManagersStoreState & ManagersStoreActions>((set)=>({
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
))

export const { toggleInitial, toggleUser } = useAuthStore.getState()