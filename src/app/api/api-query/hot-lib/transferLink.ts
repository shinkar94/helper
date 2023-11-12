import {ResponseHotLibType} from "@/lib/types";

export const TransferLink = async (idLink: string, idUser: string) => {
    try {
        const sendData = {idLink, idUser}
        const response = await fetch("/api/lib-link/transfer-link", {
            method: "POST",
            body: JSON.stringify(sendData),
            headers: { "Content-Type": "application/json" },
        });
        const data: ResponseHotLibType | {error: string} = await response.json();
        return data;
    }catch (e) {
        if (typeof e === "string") {
            return { error: e };
        } else {
            console.error(e);
            return { error: "Произошла ошибка" };
        }
    }
}