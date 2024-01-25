'use client'
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {toast} from "react-toastify";
import s from './videoRecorder.module.scss'
import {CircularProgressBar} from "@/components/shared/ui";
import {VideoRecordIcon} from "@/components/shared";

export const VideoRecorder = () => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const mediaStreamRef = useRef<MediaStream | null>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [percentage, setPercentage] = useState(0);
    const [isRecording, setIsRecording] = useState(false);
    const [recordTimeout, setRecordTimeout] = useState<NodeJS.Timeout | null>(null);
    const [elapsedTime, setElapsedTime] = useState<number>(0);
    const [intervalRef, setIntervalRef] = useState<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const handleMouseUp = () => {
            if (isRecording) {
                stopRecording();
            }
        };

        if (isRecording) {
            document.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isRecording]);
    const startRecording = useCallback(async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            const startTime = Date.now();
            // Очистка предыдущего интервала, если он существует
            if (intervalRef) {
                clearInterval(intervalRef);
                setIntervalRef(null);
            }
            // Обновление прошедшего времени каждую секунду
            const interval = setInterval(() => {
                const currentTime = Date.now();
                const elapsedTime = currentTime - startTime;
                // const time = Math.floor(elapsedTime / 1000)
                // const progressPercentage = (elapsedTime / 10000) * 100;
                setElapsedTime(Math.floor(elapsedTime / 1000)); // Преобразование в секунды
                // setElapsedTime(8)
                // setPercentage((elapsedTime / 10000) * 100);
                // Проверка, если время записи истекло, остановить интервал
                if (elapsedTime >= 60000) {
                    clearInterval(interval);
                    setIntervalRef(null);
                }
            }, 1000);
            setIntervalRef(interval);
            if(videoRef.current){
                videoRef.current.srcObject = stream;
            }
            mediaStreamRef.current = stream;
            mediaRecorderRef.current = new MediaRecorder(stream);

            mediaRecorderRef.current.start();

            mediaRecorderRef.current.addEventListener('dataavailable', (event) => {
                const videoBlob = new Blob([event.data], { type: 'video/webm' });
                const videoUrl = URL.createObjectURL(videoBlob);
                setVideoUrl(videoUrl)
            });
            setIsRecording(true);
            const timeout = setTimeout(stopRecording, 60000);
            setRecordTimeout(timeout);

        } catch (error) {
            toast.error('Ошибка при получении медиа-потока:' );
        }
    }, []);

    const stopRecording = useCallback(() => {
        console.log("stop record")
        if (mediaRecorderRef.current && mediaStreamRef.current) {
            mediaRecorderRef.current.stop();
            mediaStreamRef.current.getTracks().forEach((track) => track.stop());
        }
        setIsRecording(false);
        if (recordTimeout) {
            clearTimeout(recordTimeout);
            setRecordTimeout(null);
        }
        if (intervalRef) {
            clearInterval(intervalRef);
            setIntervalRef(null); // Очистка ссылки на интервал в состоянии
        }
        setElapsedTime(0);
    },[ intervalRef]);

    const showVideoUrl = useCallback(() => {
        if (videoUrl) {
            alert(`Ссылка на видео: ${videoUrl}`);
        } else {
            alert('Видео еще не записано');
        }
    },[videoUrl]);

    return (
        <div className={s.wrapperRecorder}>
            <div className={s.chat}>
                <div className={`${s.messageContent} ${isRecording && s.messageBlur}`}>
                    <p>Lorem ipsum dolor sit.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore dolores illum nam nostrum placeat?</p>
                </div>
                <div className={`${s.wrapperBlur} ${isRecording && s.activeBlur}`}>
                    <div className={s.progressBlock}>
                        <CircularProgressBar
                            strokeWidth={5}
                            sqSizeQuery={210}
                            percentage={elapsedTime}
                        />
                        <div className={s.videoContent}>
                            <video ref={videoRef} autoPlay muted />
                        </div>
                    </div>
                </div>
            </div>
            <div className={s.btnPanel}>
                <button onClick={stopRecording}>Остановить запись</button>
                <button onClick={showVideoUrl}>Показать ссылку на видео</button>
                <button onMouseDown={startRecording}
                        disabled={isRecording} className={`${s.recordVideo} ${isRecording && s.recordVideoActive}`}>
                    <VideoRecordIcon />
                </button>
            </div>
            {/*{isRecording && elapsedTime !== null && <p>Прошло времени: {elapsedTime} секунд</p>}*/}
        </div>
    );
};

