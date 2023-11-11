import {ResponseUserHotLibType} from "@/lib/types";

export const getAllLibs = async (): Promise<ResponseUserHotLibType[] | null> => {
    try {
        const response = await fetch("/api/lib-link/get-all-link");
        const data: ResponseUserHotLibType[] | null = await response.json();
        return data;
    } catch (e) {
        console.log(e);
        throw e;
    }
};