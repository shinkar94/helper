import {create} from "zustand";
import {immer} from "zustand/middleware/immer";
import {devtools} from "zustand/middleware";

export type LibType = {
    "title": "CRA",
    "code": "CRA",
    "author": "romka94shinkarenko@gmail.com",
    "idAuthor": "654bc13b001dbf1dc88c6ce4",
    "id": "654be30b001dbf1dc88c6d14",
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