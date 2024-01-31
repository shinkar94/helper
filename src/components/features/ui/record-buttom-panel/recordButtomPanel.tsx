import s from './recordButtonPanel.module.scss'
import {
    AddFileIcon,
    ArrowRight,
    AudioRecordIcon,
    DownloadIcon,
    KeyBoard,
    SmileIcon,
    VideoRecordIcon
} from "@/components/shared";
import React, {ChangeEvent, MutableRefObject, useCallback, useRef, useState} from "react";
import {toast} from "react-toastify";
type RecorderVariantType = "video" | "audio"
type SmileButtonType = "smile" | "keyBoard"

type Props = {
    videoRef: MutableRefObject<HTMLVideoElement | null>,
    setIsRecording: (recording: boolean) => void,
    setPercentage: (percent: PercentageType) => void
    setIsAudioRecording: (record: boolean) => void
    isRecording: boolean
    isMobile: boolean
}
type PercentageType = {
    time: number
    percent: number
}
export const RecordBottomPanel = ({setIsAudioRecording, setIsRecording, videoRef, setPercentage, isRecording, isMobile}:Props) => {

    const mediaStreamRef = useRef<MediaStream | null>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);

    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);

    const [isPressed, setIsPressed] = useState(false)
    const [statusRecord, setStatusRecord] = useState("audio")
    const [smileButtonName, setSmileButtonName] = useState<SmileButtonType>('smile')
    const [error, setError] = useState<string | null>();

    const [recordTimeout, setRecordTimeout] = useState<NodeJS.Timeout | null>(null);
    const [checkTime, setСheckTime] = useState<NodeJS.Timeout | null>(null);

    const [message, setMessage] = useState('')

    const startRecording = useCallback(async (variant: RecorderVariantType) => {
        try {
            setIsPressed(true)
            navigator.mediaDevices
                .getUserMedia({
                    audio: true,
                    video: variant !== "audio",
                })
                .then((stream) => {
                    mediaStreamRef.current = stream;
                    mediaRecorderRef.current = new MediaRecorder(stream);
                    mediaRecorderRef.current.start();
                    mediaRecorderRef.current.addEventListener('dataavailable', (event) => {
                        if(variant === "video"){
                            const videoBlob = new Blob([event.data], {type: 'video/mp4'});
                            const videoUrl = URL.createObjectURL(videoBlob);
                            setVideoUrl(videoUrl)
                        }else{
                            const audioBlob = new Blob([event.data], {type: 'audio/mpeg'});
                            const audioUrl = URL.createObjectURL(audioBlob);
                            setAudioUrl(audioUrl);
                        }

                    });
                    if (videoRef.current) {
                        videoRef.current.srcObject = mediaStreamRef.current;
                        videoRef.current.onloadedmetadata = () => {
                            if (videoRef.current) {
                                videoRef.current.play();
                            }
                        };
                    }
                })
                .catch((err) => {
                    setError(err.name);
                });
            const timeout = setTimeout(() => stopRecording(variant), 60000); //передача варианта
            if(variant === "video"){
                setIsRecording(true);
                setPercentage({time: 60, percent: 100})
            }else{
                setIsAudioRecording(true)
            }
            setRecordTimeout(timeout);
        } catch (error) {
            console.error('Ошибка при получении медиа-потока:', error);
            toast.error('Ошибка при получении медиа-потока:');
        }
    }, []);

    const stopRecording = useCallback((variant: RecorderVariantType) => {
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
        if(variant === "video"){
            setPercentage({time: 0, percent: 0})
        }
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
    }, [videoUrl]);

    const showAudioUrl = useCallback(() => {
        if (audioUrl) {
            const link = document.createElement('a');
            link.href = audioUrl;
            link.target = '_blank'; // Открыть ссылку в новой вкладке
            link.click();
        } else {
            alert('Аудио еще не записано');
        }
    }, [audioUrl]);


    const startHandler = (variant: RecorderVariantType )=>{
        const checkTime = setTimeout(() => {
            startRecording(variant)
        }, 500);
        setСheckTime(checkTime)

    }
    const stopRecordBtn = () => {
        if(checkTime){
            clearTimeout(checkTime)
            setСheckTime(null)
        }
        if(isPressed){
            setIsPressed(false)
        }else{
            console.log("переключи")
            setStatusRecord(statusRecord === 'audio' ? "video" : "audio")
        }
    }
    const stopHandler = (variant: RecorderVariantType )=> {
        stopRecording(variant)
    }

    const addMessage = (e: ChangeEvent<HTMLInputElement>) => {
        setMessage(e.currentTarget.value)
    }
    const checkMessage = message.length > 0
    return(
        <div className={s.btnPanel}>
            <div className={s.writePanel}>
                <div className={`${s.inputBlock} ${checkMessage && s.activeInputBlock}`}>
                    <div className={s.smileBlock}>
                        <button onClick={() => setSmileButtonName("keyBoard")} className={`${s.smileBtn} ${smileButtonName === "smile" && s.activeSmile}`}><SmileIcon /></button>
                        <button onClick={() => setSmileButtonName("smile")} className={`${s.smileBtn} ${smileButtonName === "keyBoard" && s.activeSmile}`}><KeyBoard /></button>
                    </div>
                    <input type="text" placeholder={'Message'} value={message} onChange={(e)=> addMessage(e)}/>
                    <button className={`${s.addFile} ${checkMessage && s.activeAddFile}`}><AddFileIcon /></button>
                    <button className={`${s.sendBtn} ${checkMessage &&  s.activeSend}`}><ArrowRight /></button>
                </div>
                <button className={s.giftBtn}><DownloadIcon /></button>
                <button className={s.dinnerBtn}><DownloadIcon /></button>
                <div className={s.btnChangeBlock}>
                    {isMobile ? (
                        <>
                            <button onTouchStart={() => startHandler("audio")}
                                    onTouchEnd={() => stopHandler("audio")}
                                    onClick={stopRecordBtn}
                                    className={`${s.recordVideo} ${isRecording && s.recordVideoActive} ${statusRecord === "audio" && s.activeBtn}`}
                            >
                                <AudioRecordIcon/>
                            </button>
                            <button onTouchStart={()=> startHandler('video')}
                                    onTouchEnd={() => stopHandler('video')}
                                    onClick={stopRecordBtn}
                                    className={`${s.recordVideo} ${isRecording && s.recordVideoActive} ${statusRecord === "video" && s.activeBtn}`}>
                                <VideoRecordIcon/>
                            </button>
                        </>
                    ) : (
                        <>
                            <button onMouseDown={() => startHandler("audio")}
                                    onMouseUp={() => stopHandler("audio")}
                                    onClick={stopRecordBtn}
                                    className={`${s.recordVideo} ${isRecording && s.recordVideoActive} ${statusRecord === "audio" && s.activeBtn}`}
                            >
                                <AudioRecordIcon/>
                            </button>
                            <button onMouseDown={() => startHandler("video")}
                                    onMouseUp={() => stopHandler("video")}
                                    onClick={stopRecordBtn}
                                    className={`${s.recordVideo} ${isRecording && s.recordVideoActive} ${statusRecord === "video" && s.activeBtn}`}>
                                <VideoRecordIcon/>
                            </button>
                        </>
                    )}
                </div>
            </div>
            <div className={s.specBtn}>
                <button onClick={showVideoUrl}>Показать ссылку на видео</button>
                <button onClick={showAudioUrl}>Показать ссылку на аудио</button>
            </div>
            <div className={`${s.smilePack} ${smileButtonName === "keyBoard" && s.openPack}`}>
                <p className={s.descText}>Free pack</p>
                <div className={`${s.packLine} ${s.freePack}`}>
                    <p className={s.smileLine}>
                        &#128512; &#128516; &#128525; &#128151;
                    </p>
                </div>
                <p className={s.descText}>Nonfree pack</p>
                <div className={`${s.packLine} ${s.nonFreePack}`}>
                    <p className={s.smileLine}>
                        &#128512; &#128516; &#128525; &#128151;
                    </p>
                </div>
                <p className={s.descText}>Nonfree pack</p>
                <div className={`${s.packLine} ${s.nonFreePack}`}>
                    <p className={s.smileLine}>
                        &#128512; &#128516; &#128525; &#128151;
                    </p>
                </div>
                <div className={`${s.packLine} ${s.nonFreePack}`}>
                    <p className={s.smileLine}>
                        &#128512; &#128516; &#128525; &#128151;
                    </p>
                </div>
                <div className={`${s.packLine} ${s.nonFreePack}`}>
                    <p className={s.smileLine}>
                        &#128512; &#128516; &#128525; &#128151;
                    </p>
                </div>
            </div>
        </div>
    )
}