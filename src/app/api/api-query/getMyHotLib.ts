import {ResponseHotLibType} from "@/lib/types";

export const getMyHotLib: (sendData: { idUser: string }) => Promise<{ data: ResponseHotLibType[] }> = async (sendData: {idUser: string})=>{
    try {
        const response = await fetch("/api/lib-link/get-link", {
            method: "POST",
            body: JSON.stringify(sendData),
            headers: { "Content-Type": "application/json" },
        });
        const data: ResponseHotLibType[] = await response.json();
        const resultData = data
        return {data}
    }catch (e) {
        console.log(e)
        throw e;
    }
}