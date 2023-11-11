import {create} from "zustand";
import {immer} from "zustand/middleware/immer";

export type WidgetNameType = 'HotLibraries' | 'Example' | 'Link' | 'Todos' | 'Chat'
export type ShowLinksType = 'My' | 'All'

interface ManagersStoreState {
    switchWidget: WidgetNameType
    statusModalWindow: boolean
    showLinks: ShowLinksType
}

interface ManagersStoreActions {
    toggleSwitch: (newWidget: WidgetNameType) => void
    toggleModalWindow: (status: boolean) => void
    setNewShow: (nameLibs: ShowLinksType) => void
}


export const useSwitchStore = create(
    immer<ManagersStoreState & ManagersStoreActions>((set) => ({
            switchWidget: 'HotLibraries',
            statusModalWindow: false,
            showLinks: 'My',
            toggleSwitch: (newWidget: WidgetNameType) => {
                set((state) => {
                    state.switchWidget = newWidget
                })
            },
            toggleModalWindow: (status: boolean) => {
                set((state) => {
                    state.statusModalWindow = status
                })
            },
            setNewShow: (nameLibs: ShowLinksType) => {
                set((state) => {
                    state.showLinks = nameLibs
                })
            }
        })
    ))

export const {toggleSwitch, toggleModalWindow, setNewShow} = useSwitchStore.getState()