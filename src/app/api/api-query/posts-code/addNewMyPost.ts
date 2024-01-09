import {DataCodeType, NewPostCodeType, ResponseCodePosts} from "@/lib/types";

export const AddCodeMutation = async (dataPost: DataCodeType[], title: string, author: string) => {
    try {
        const sendData: NewPostCodeType = {dataPost, title, author}
        const response = await fetch("/api/posts/send-code-post", {
            method: "POST",
            body: JSON.stringify(sendData),
            headers: { "Content-Type": "application/json" },
        });
        const data: ResponseCodePosts = await response.json();
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