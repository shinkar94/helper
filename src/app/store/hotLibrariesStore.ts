import {create} from "zustand";
import {immer} from "zustand/middleware/immer";

export type LibrariesLinkType = {
    id: string,
    priority: number,
    title: string,
    textLibrary: string
}
interface ManagersStoreState {
    librariesLink: any[],
}

interface ManagersStoreActions {
    saveLink: () => void
}
const initialState: LibrariesLinkType[] = [
    {id: '12sas12',priority: 1 , title: "CRA+RTK+RouterDom+AXIOS+Styled-components+UUID", textLibrary: "yarn create react-app newapp --template redux-typescript && yarn add uuid @types/uuid react-router-dom @types/react-router-dom axios styled-components @types/styled-components"},
    {id: '12sas12',priority: 1, title: "CRA", textLibrary: "yarn create react-app newapp --template typescript"},
    {id: '12sas12',priority: 1, title: "CRA+RTK", textLibrary: "yarn create react-app newapp --template redux-typescript"},
    {id: '12sas12',priority: 1, title: "RTK-VITE", textLibrary: "npx degit reduxjs/redux-templates/packages/vite-template-redux my-app"},
    {id: '12sas12',priority: 1, title: "UUID", textLibrary: "yarn add uuid yarn add @types/uuid"},
    {id: '12sas12',priority: 1, title: "RouterDom", textLibrary: "yarn add react-router-dom yarn add @types/react-router-dom"},
    {id: '12sas12',priority: 1, title: "Redux", textLibrary: "yarn add redux react-redux @types/react-redux"},
    {id: '12sas12',priority: 1, title: "AXIOS", textLibrary: "yarn add axios"},
    {id: '12sas12',priority: 1, title: "Redux-Thunk", textLibrary: "yarn add redux-thunk"},
    {id: '12sas12',priority: 1, title: "Redux-Tolkit", textLibrary: "yarn add @reduxjs/toolkit"},
    {id: '12sas12',priority: 1, title: "Styled-components", textLibrary: "yarn add styled-components yarn add @types/styled-components"},
    {id: '12sas12',priority: 1, title: "Toastify", textLibrary: "yarn add react-toastify"},
    {id: '12sas12',priority: 1, title: "Auto-Animate", textLibrary: "yarn add @formkit/auto-animate"},
    {id: '12sas12',priority: 1, title: "YUP", textLibrary: "yarn add yup"},
    {id: '12sas12',priority: 1, title: "Skeleton", textLibrary: "yarn add react-loading-skeleton"},
    {id: '12sas12',priority: 1, title: "Material UI", textLibrary: "yarn add @mui/material @emotion/react @emotion/styled yarn add @mui/icons-material"},
    {id: '12sas12',priority: 1, title: "Обновление TS если Material UI не пошел", textLibrary: "yarn add typescript"},
    {id: '12sas12',priority: 1, title: "Storybook", textLibrary: "npx storybook@latest init"},
    {id: '12sas12',priority: 1, title: "Chart.js", textLibrary: "yarn install chart.js"},
    {id: '12sas12',priority: 1, title: "Marquee", textLibrary: "yarn add react-fast-marquee"},
    {id: '12sas12',priority: 1, title: "Обновить все библиотеки", textLibrary: "yarn add react@latest"},
    {id: '12sas12',priority: 1, title: "CRA ERROR", textLibrary: "yarn add --dev @babel/plugin-proposal-private-property-in-object"},
]
export const useHotLibrariesStore = create(
    immer<ManagersStoreState & ManagersStoreActions>((set) => ({
            librariesLink: initialState,
            saveLink: () =>
                set((state) => {
                    return state.librariesLink
                })
        })
    ))

export const {saveLink} = useHotLibrariesStore.getState()