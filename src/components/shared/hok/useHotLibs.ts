import {PayloadType} from "@/app/service/generate-token/generateToken";
import {useAuthStore} from "@/app/store";
import {getAllLink, LibType} from "@/app/store/LibStore";


export const useHotLibs = () =>{
    const user:PayloadType = useAuthStore((state)=> state.user)
    const getMyHotLib = async ()=>{
        try {
            const dataForm = {idUser: user.id}
            const response = await fetch("/api/lib-link/get-link", {
                method: "POST",
                body: JSON.stringify(dataForm),
                headers: { "Content-Type": "application/json" },
            });
            const data: LibType[] = await response.json();
            getAllLink(data)
            console.log(data)
        }catch (e) {
            console.log(e)
        }
    }

    return {getMyHotLib}
}