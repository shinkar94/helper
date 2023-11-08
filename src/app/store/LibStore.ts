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
}

export interface ManagersStoreActions {
    addOneLink: (link: LibType) => void
}


export const useLibStore = create(devtools(
    immer<ManagersStoreState & ManagersStoreActions>((set) => ({
            myHotLib: [],
            addOneLink: (link: LibType) =>
                set((state) => {
                    state.myHotLib = [...state.myHotLib, link]
                }),
        })
    )))

export const {addOneLink} = useLibStore.getState()