'use client'
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {toast} from "react-toastify";
import s from './videoRecorder.module.scss'
import {CircularProgressBar} from "@/components/shared/ui";
import {AudioRecordIcon, VideoRecordIcon} from "@/components/shared";

export const VideoRecorder = () => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const mediaStreamRef = useRef<MediaStream | null>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const [percentage, setPercentage] = useState({time: 0, percent: 0});
    const [isRecording, setIsRecording] = useState(false);
    const [recordTimeout, setRecordTimeout] = useState<NodeJS.Timeout | null>(null);
    const [recordAudioTimeout, setAudioRecordTimeout] = useState<NodeJS.Timeout | null>(null);

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
            const timeout = setTimeout(stopRecording, 10000);
            setIsRecording(true);
            setRecordTimeout(timeout);
            // setElapsedTime(100);
            setPercentage({time: 60, percent: 100})
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
        setPercentage({time: 0, percent: 0})
    },[]);

    const startAudioRecording = useCallback(async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaStreamRef.current = stream;
            mediaRecorderRef.current = new MediaRecorder(stream);

            mediaRecorderRef.current.start();

            mediaRecorderRef.current.addEventListener('dataavailable', (event) => {
                const audioBlob = new Blob([event.data], { type: 'audio/ogg; codecs=opus' });
                const audioUrl = URL.createObjectURL(audioBlob);
                setAudioUrl(audioUrl);
            });

            const timeout = setTimeout(stopAudioRecording, 60000);
            // setIsRecording(true);
            setAudioRecordTimeout(timeout);
            // setPercentage({ time: 60, percent: 100 });
        } catch (error) {
            console.error('Ошибка при получении медиа-потока:', error);
            toast.error('Ошибка при получении медиа-потока');
        }
    }, []);
    const stopAudioRecording = useCallback(() => {
        if (mediaRecorderRef.current && mediaStreamRef.current) {
            mediaRecorderRef.current.stop();
            mediaStreamRef.current.getTracks().forEach((track) => track.stop());
        }
        // setIsRecording(false);
        if (recordAudioTimeout) {
            clearTimeout(recordAudioTimeout);
            setAudioRecordTimeout(null);
        }
        // setPercentage({ time: 0, percent: 0 });
    }, []);

    const showVideoUrl = useCallback(() => {
        if (videoUrl) {
            // alert(`<a href="${videoUrl}">Ссылка на видео: ${videoUrl}</>`);
            const link = document.createElement('a');
            link.href = videoUrl;
            link.target = '_blank'; // Открыть ссылку в новой вкладке
            link.click();
        } else {
            alert('Видео еще не записано');
        }
    },[videoUrl]);

    const showAudioUrl = useCallback(() => {
        if (audioUrl) {
            const link = document.createElement('a');
            link.href = audioUrl;
            link.target = '_blank'; // Открыть ссылку в новой вкладке
            link.click();
        } else {
            alert('Аудио еще не записано');
        }
    },[audioUrl]);

    const startAudioHandler = useCallback(() => {
        startAudioRecording();
    }, [startAudioRecording]);

    const stopAudioHandler = useCallback(() => {
        stopAudioRecording();
    }, [stopAudioRecording]);

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
                            percentage={percentage}
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
                <button onClick={showAudioUrl}>Показать ссылку на аудио</button>
                <button onMouseDown={startAudioHandler}
                        onMouseUp={stopAudioHandler}
                        className={`${s.recordVideo} ${isRecording && s.recordVideoActive}`}
                >
                    <AudioRecordIcon />
                </button>
                <button onMouseDown={startRecording}
                         className={`${s.recordVideo} ${isRecording && s.recordVideoActive}`}>
                    <VideoRecordIcon />
                </button>
            </div>
        </div>
    );
};

