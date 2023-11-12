import {ResponseHotLibType} from "@/lib/types";

export const getAllLibs = async (): Promise<ResponseHotLibType[]> => {
    try {
        const response = await fetch("/api/lib-link/get-all-link");
        // const data: ResponseHotLibType[] = await response.json();
        return await response.json();
    } catch (e) {
        console.log(e);
        throw e;
    }
};