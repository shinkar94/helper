import {toast} from "react-toastify";

export const copyTextInBuffer = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success("Copied to clipboard")
}