import {useEffect, useState} from "react";
import {useSWRConfig} from "swr";
import {ResponseHotLibType} from "@/lib/types";

type UpdateLibType = ResponseHotLibType & {
    open: boolean
}
export const useHotLibs = () =>{
    const {cache, mutate} = useSWRConfig()
    const myLib:ResponseHotLibType[] = cache.get('/api/getHotLib')?.data
    const [resultLink, setResultLink] = useState<UpdateLibType[]>([])
    useEffect(() => {
        const updateLib:UpdateLibType[] = myLib && myLib.map(link => {
            return(
                {...link, open: false}
            )
        })
        setResultLink(updateLib)
    }, [myLib]);
    const openLink = (id: string) =>{
        const updateLib = resultLink.map(link => link._id === id ? {...link, open: true} : {...link, open: false})
        setResultLink(updateLib)
    }
    const closeLik = (id: string) =>{
        const updateLib = resultLink.map(link => link._id === id ? {...link, open: false} : link)
        setResultLink(updateLib)
    }

    return {resultLink, closeLik, openLink}
}