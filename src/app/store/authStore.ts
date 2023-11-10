import {create} from "zustand";
import {PayloadType} from "@/app/service/generate-token/generateToken";
import {immer} from "zustand/middleware/immer";

export interface ManagersStoreState {
    initialization: boolean,
    user: PayloadType
    loading: boolean
}

export interface ManagersStoreActions {
    toggleInitial: (status: boolean) => void
    toggleUser: (payload: PayloadType) => void
    setLoading: (status: boolean) => void
    removeUser: () => void
}


export const useAuthStore = create(
    immer<ManagersStoreState & ManagersStoreActions>((set) => ({
            initialization: false,
            loading: false,
            user: {
                id: '',
                email: '',
                fullName: '',
                avatarUrl: ''
            },
            toggleInitial: (status: boolean) =>
                set((state) => {
                    state.initialization = status
                    state.loading = false
                }),
            setLoading: (status: boolean) =>
                set({loading: status}),
            toggleUser: (payload: PayloadType) => {
                set((state) => {
                    state.user = {
                        id: payload.id,
                        email: payload.email,
                        fullName: payload.fullName,
                        avatarUrl: payload.avatarUrl
                    }
                    state.initialization = true
                    state.loading = false
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
                    state.loading = false
                })
            }
        })
    ))

export const {toggleInitial, toggleUser, removeUser, setLoading} = useAuthStore.getState()