"use client"
import s from './testingContent.module.scss'
import {QrReaderC, VideoRecorder} from "@/components/features/ui";
import {useState} from "react";
export const TestingContent = () => {
    const [isQrScanner, setQrScanner] = useState(false)
    return(
        <div className={s.wrapper}>
            <div>Testing page</div>
            <VideoRecorder />
            <h3>QR reader</h3>
            <button onClick={()=> setQrScanner(true)}>open QrScanner</button>

            {isQrScanner && <QrReaderC callBack={()=> setQrScanner(false)}/>}
        </div>
    )
}