"use client"
import s from './testingContent.module.scss'
import {QrReaderC, VideoRecorder} from "@/components/features/ui";
import {useState} from "react";
import {VideoRecorderSecond} from "@/components/features/ui/video-recorder";
export const TestingContent = () => {
    const [isQrScanner, setQrScanner] = useState(false)
    return(
        <div className={s.wrapper}>
            <div>Testing page</div>
            <VideoRecorder />
            <h3>QR reader</h3>
            <button onClick={()=> setQrScanner(true)}>open QrScanner</button>
            {isQrScanner && <QrReaderC callBack={()=> setQrScanner(false)}/>}
            <h3>Video recorder v1.2</h3>
            <VideoRecorderSecond />
        </div>
    )
}