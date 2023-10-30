import {create} from "zustand";
import {immer} from "zustand/middleware/immer";

interface ManagersStoreState {
    librariesLink: any[],
}

interface ManagersStoreActions {
    saveLink: () => void
}
export const useHotLibrariesStore = create(
    immer<ManagersStoreState & ManagersStoreActions>((set) => ({
            librariesLink: [],
            saveLink: () =>
                set((state) => {
                    return state.librariesLink
                })
        })
    ))

export const {saveLink} = useHotLibrariesStore.getState()