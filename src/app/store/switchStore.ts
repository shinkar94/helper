import {create} from "zustand";
import {immer} from "zustand/middleware/immer";

export type WidgetNameType = 'HotLibraries' | 'Example' | 'Link' | 'Todos' | 'Chat'
interface ManagersStoreState {
    switchWidget: WidgetNameType
}

interface ManagersStoreActions {
    toggleSwitch: (newWidget: WidgetNameType) => void
}


export const useSwitchStore = create(
    immer<ManagersStoreState & ManagersStoreActions>((set) => ({
            switchWidget: 'HotLibraries',
            toggleSwitch: (newWidget: WidgetNameType) => {
                set((state) => {
                    state.switchWidget = newWidget
                })
            },
        })
    ))

export const {toggleSwitch} = useSwitchStore.getState()