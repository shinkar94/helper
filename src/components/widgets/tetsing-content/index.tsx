"use client"
import s from './testingContent.module.scss'
import {QrReaderC, VideoRecorder} from "@/components/features/ui";
export const TestingContent = () => {
    return(
        <div className={s.wrapper}>
            {/*<div>Testing page</div>*/}
            {/*<VideoRecorder />*/}
            {/*<h3>QR reader</h3>*/}
            <QrReaderC />
        </div>
    )
}