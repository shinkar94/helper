export type ResponseDeleteType = { success: string } | {error: string}
export const DeleteLink = async (idLink: string, idUser: string):Promise<ResponseDeleteType> => {
    try {
        const sendData = {idLink, idUser}
        const response = await fetch("/api/lib-link/delete-link", {
            method: "POST",
            body: JSON.stringify(sendData),
            headers: { "Content-Type": "application/json" },
        });
        return await response.json()
    }catch (e) {
        return { error: `${e}` };
    }
}