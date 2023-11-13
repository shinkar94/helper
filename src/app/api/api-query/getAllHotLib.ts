import {ResponseHotLibType} from "@/lib/types";

export const getAllLibs = async (sendData: { idUser: string }): Promise<{ data: ResponseHotLibType[] }> => {
    try {
        const response = await fetch("/api/lib-link/get-all-link", {
            method: "POST",
            body: JSON.stringify(sendData),
            headers: { "Content-Type": "application/json" },
        });
        const data: ResponseHotLibType[] = await response.json();
        return {data}
    } catch (e) {
        console.log(e);
        throw e;
    }
};