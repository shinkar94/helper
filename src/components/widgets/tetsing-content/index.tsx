"use client"
import s from './testingContent.module.scss'
import {VideoRecorder} from "@/components/features/ui";
export const TestingContent = () => {
    return(
        <div className={s.wrapper}>
            <div>Testing page</div>
            <VideoRecorder />
        </div>
    )
}