import {useEffect, useState} from "react";
import {useSWRConfig} from "swr";
import {ResponseHotLibType} from "@/lib/types";
import {TransferLink} from "@/app/api/api-query";
import {useAuthStore} from "@/app/store";
import {toast} from "react-toastify";
import {DeleteLink} from "@/app/api/api-query/hot-lib";
import {ResponseDeleteType} from "@/app/api/api-query/hot-lib/deleteLink";

type UpdateLibType = ResponseHotLibType & {
    open: boolean
}
type NameLibType = 'My' | 'All'
export const useHotLibs = (nameLib: NameLibType) => {
    const user = useAuthStore((state)=> state.user)
    const {cache, mutate} = useSWRConfig()
    const myLib: ResponseHotLibType[] = cache.get('/api/getHotLib')?.data
    const allLib: ResponseHotLibType[] = cache.get('/api/getAllHotLib')?.data
    const [resultLink, setResultLink] = useState<UpdateLibType[]>([])
    let updateLib: UpdateLibType[] = []
    useEffect(() => {
        if(myLib && myLib.length >= 1 && nameLib === 'My'){
            updateLib = myLib.map(link => {
                return (
                    {...link, open: false}
                )
            })
        }else if(allLib && allLib.length >= 1 && nameLib === 'All'){
            updateLib = allLib.map(link => {
                return (
                    {...link, open: false}
                )
            })
        }else{
            updateLib = []
        }
        setResultLink(updateLib)
    }, [myLib, allLib]);

    const transferLink = async (id: string) => {
        const response: ResponseHotLibType | {error: string} = await TransferLink(id, user.id)
        if("error" in response){
            console.log('error')
            toast.error(`Error adding: ${response.error}`)
        }else{
            cache.set('/api/getHotLib', { data: [...myLib, response] });
            await mutate('/api/getHotLib');
            toast.success("Successfully Added!")
        }

    }
    const openLink = (id: string) => {
        const updateLib: UpdateLibType[] = resultLink.map(link => link._id === id ? {...link, open: true} : {...link, open: false})
        setResultLink(updateLib)
    }
    const closeLink = (id: string) => {
        const updateLib: UpdateLibType[] = resultLink.map(link => link._id === id ? {...link, open: false} : link)
        setResultLink(updateLib)
    }
    const copyText = (text: string, types: string) =>{
        if(types){
            navigator.clipboard.writeText(text + ' && ' + types)
            toast.success("Copied to clipboard")
        }else{
            navigator.clipboard.writeText(text)
            toast.success("Copied to clipboard")
        }
    }
    const copyOneString = (text: string) => {
        navigator.clipboard.writeText(text)
        toast.success("Copied to clipboard")
    }

    const deleteMyLink = async (idLink: string, idUser: string) => {
        const response: ResponseDeleteType  = await DeleteLink(idLink, idUser)
        if("error" in response){
            toast.error(response.error)
        }else{
            if(myLib && myLib.length >= 1){
                const newMyLib =  myLib.filter(el => el._id === idLink)
                cache.set('/api/getHotLib', { data: [...newMyLib] })
                await mutate('/api/getHotLib');
                let updateLib: UpdateLibType[] =  myLib.map(link => {
                    return (
                        {...link, open: false}
                    )
                })
                setResultLink(updateLib)
            }

            if(allLib && allLib.length >= 1 ){
                const newAllLib = allLib.filter(el => el._id === idLink)
                cache.set('/api/getAllHotLib', { data: [...newAllLib] })
                await mutate('/api/getAllHotLib');
            }
            toast.success(response.success)
        }
    }

    return {resultLink, closeLink, openLink, copyText, transferLink, copyOneString, deleteMyLink}
}