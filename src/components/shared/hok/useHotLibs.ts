import {useEffect, useState} from "react";
import {useSWRConfig} from "swr";
import {ResponseHotLibType} from "@/lib/types";
import {Simulate} from "react-dom/test-utils";
import copy = Simulate.copy;

type UpdateLibType = ResponseHotLibType & {
    open: boolean
}
type NameLibType = 'My' | 'All'
export const useHotLibs = (nameLib: NameLibType) => {
    const {cache, mutate} = useSWRConfig()
    const myLib: ResponseHotLibType[] = cache.get('/api/getHotLib')?.data
    const allLib: ResponseHotLibType[] = cache.get('/api/getAllHotLib')?.data
    const [resultLink, setResultLink] = useState<UpdateLibType[]>([])
    useEffect(() => {
        const updateLib: UpdateLibType[] = nameLib === 'My'
            ? myLib && myLib.map(link => {
            return (
                {...link, open: false}
            )
        })
            : allLib && allLib.map(link => {
            return (
                {...link, open: false}
            )
        })
        setResultLink(updateLib)
    }, [myLib]);
    const openLink = (id: string) => {
        const updateLib = resultLink.map(link => link._id === id ? {...link, open: true} : {...link, open: false})
        setResultLink(updateLib)
    }
    const closeLik = (id: string) => {
        const updateLib = resultLink.map(link => link._id === id ? {...link, open: false} : link)
        setResultLink(updateLib)
    }
    const copyText = (text: string) =>{
        navigator.clipboard.writeText(text)
    }

    return {resultLink, closeLik, openLink, copyText}
}