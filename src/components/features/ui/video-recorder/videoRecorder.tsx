'use client'
import React, { useEffect, useRef, useState} from 'react';

import s from './videoRecorder.module.scss'
import {CircularProgressBar} from "@/components/shared/ui";

import {RecordBottomPanel} from "@/components/features/ui/record-buttom-panel";
import {AudioMessage} from "@/components/features/ui";


export const VideoRecorder = () => {
    const videoRef = useRef<HTMLVideoElement | null>(null);

    const [percentage, setPercentage] = useState({time: 0, percent: 0});
    const [isRecording, setIsRecording] = useState(false);
    const [isAudioRecording, setIsAudioRecording] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const [audioUrl, setAudioUrl] = useState<string[] | []>([]);

    useEffect(() => {
        const checkIsMobile = () => {
            const isMobileDevice = typeof window.orientation !== 'undefined' || navigator.userAgent.indexOf('Mobile') !== -1;
            setIsMobile(isMobileDevice);
        };

        checkIsMobile();
        window.addEventListener('resize', checkIsMobile);

        return () => {
            window.removeEventListener('resize', checkIsMobile);
        };
    }, []);
    useEffect(() => {
        const getAudio = localStorage.getItem('myAudio');
        const audio = getAudio ? JSON.parse(getAudio) : null;
        setAudioUrl([audio]);
    }, []);

    console.log(audioUrl)

    return (
        <div className={s.wrapperRecorder}>
            <div className={s.chat}>
                <div className={`${s.messageContent} ${isRecording && s.messageBlur}`}>
                    <p>Lorem ipsum dolor sit.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore dolores illum nam nostrum
                        placeat?</p>
                    {isMobile ? <p>Открыто на мобильном устройстве</p> : <p>Открыто на ПК</p>}
                </div>
                <div className={`${s.wrapperBlur} ${isRecording && s.activeBlur}`}>
                    <div className={s.progressBlock}>
                        <CircularProgressBar
                            strokeWidth={5}
                            sqSizeQuery={210}
                            percentage={percentage}
                        />
                        <div className={s.videoContent}>
                            <video ref={videoRef} playsInline autoPlay muted/>
                        </div>
                    </div>
                </div>
            </div>
            <RecordBottomPanel
                isRecording={isRecording}
                isAudioRecording={isAudioRecording}
                setIsRecording={setIsRecording}
                setIsAudioRecording={setIsAudioRecording}
                isMobile={isMobile}
                videoRef={videoRef}
                setPercentage={setPercentage}/>

            {audioUrl.length > 0 && audioUrl.map((url, index) => <AudioMessage key={index} url={url}/>)}

        </div>
    );
};

