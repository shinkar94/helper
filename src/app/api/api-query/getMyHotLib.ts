import {LibType} from "@/app/store/LibStore";

export const getMyHotLib: (sendData: { idUser: string }) => Promise<{ data: LibType[] }> = async (sendData: {idUser: string})=>{
    try {
        const response = await fetch("/api/lib-link/get-link", {
            method: "POST",
            body: JSON.stringify(sendData),
            headers: { "Content-Type": "application/json" },
        });
        const data: LibType[] = await response.json();
        return {data}
    }catch (e) {
        console.log(e)
        throw e;
    }
}