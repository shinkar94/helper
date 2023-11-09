import {create} from "zustand";
import {immer} from "zustand/middleware/immer";
import {devtools} from "zustand/middleware";

export type LibType = {
    "title": string,
    "code": string,
    "author": string,
    "idAuthor": string,
    "id": string,
}

export interface ManagersStoreState {
    myHotLib: LibType[],
    linksReceived: boolean
}

export interface ManagersStoreActions {
    addOneLink: (link: LibType) => void
    getAllLink: (links: LibType[]) => void
}


export const useLibStore = create(devtools(
    immer<ManagersStoreState & ManagersStoreActions>((set) => ({
            myHotLib: [],
            linksReceived: false,
            addOneLink: (link: LibType) =>
                set((state) => {
                    state.myHotLib = [...state.myHotLib, link]
                }),
            getAllLink: (links: LibType[]) =>
                set((state) => {
                    state.linksReceived = true
                    state.myHotLib = [...links]
                })
        })
    )))

export const {addOneLink, getAllLink} = useLibStore.getState()