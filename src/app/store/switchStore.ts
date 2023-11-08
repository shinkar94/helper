import {create} from "zustand";
import {immer} from "zustand/middleware/immer";

export type WidgetNameType = 'HotLibraries' | 'Example' | 'Link' | 'Todos' | 'Chat'
interface ManagersStoreState {
    switchWidget: WidgetNameType
    statusModalWindow: boolean
}

interface ManagersStoreActions {
    toggleSwitch: (newWidget: WidgetNameType) => void
    toggleModalWindow: (status: boolean) => void
}


export const useSwitchStore = create(
    immer<ManagersStoreState & ManagersStoreActions>((set) => ({
            switchWidget: 'HotLibraries',
            statusModalWindow: false,
            toggleSwitch: (newWidget: WidgetNameType) => {
                set((state) => {
                    state.switchWidget = newWidget
                })
            },
            toggleModalWindow: (status: boolean) =>{
                set((state) =>{
                    state.statusModalWindow = status
                })
            }
        })
    ))

export const {toggleSwitch, toggleModalWindow} = useSwitchStore.getState()