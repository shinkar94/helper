import {create} from "zustand";
import {PayloadType} from "@/app/service/generate-token/generateToken";
import {immer} from "zustand/middleware/immer";
import {devtools} from "zustand/middleware";

interface ManagersStoreState {
    initialization: boolean,
    user: PayloadType
}

interface ManagersStoreActions {
    toggleInitial: (status: boolean) => void
    toggleUser: (payload: PayloadType) => void
    removeUser: () => void
}


export const useAuthStore = create(
    immer<ManagersStoreState & ManagersStoreActions>((set) => ({
            initialization: false,
            user: {
                id: '',
                email: '',
                fullName: '',
                avatarUrl: ''
            },
            toggleInitial: (status: boolean) =>
                set({initialization: status}),
            toggleUser: (payload: PayloadType) => {
                set((state) => {
                    state.user = {
                        id: payload.id,
                        email: payload.email,
                        fullName: payload.fullName,
                        avatarUrl: payload.avatarUrl
                    }
                    state.initialization = true
                })
            },
            removeUser: () => {
                set((state) => {
                    state.user = {
                        id: '',
                        email: '',
                        fullName: '',
                        avatarUrl: ''
                    }
                    state.initialization = false
                })
            }
        })
    ))

export const {toggleInitial, toggleUser, removeUser} = useAuthStore.getState()