import s from './recordButtonPanel.module.scss'
import {
    AddFileIcon, ArrowLeftIcon,
    ArrowRight,
    AudioRecordIcon, DinnerIcon,
    GiftIcon,
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
    isAudioRecording: boolean
    isMobile: boolean
}
type PercentageType = {
    time: number
    percent: number
}
export const RecordBottomPanel = ({setIsAudioRecording, setIsRecording, videoRef, setPercentage, isRecording, isMobile, isAudioRecording}:Props) => {

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

    const startIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const volumeIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const [recordingTime, setRecordingTime] = useState<number>(0)
    const recordingTimeRef = useRef(0);

    const [volumeLevel, setVolumeLevel] = useState(0);

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
                    // Web Audio API setup
                    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
                    const analyser = audioContext.createAnalyser();
                    const bufferLength = analyser.frequencyBinCount;
                    const dataArray = new Uint8Array(bufferLength);

                    const source = audioContext.createMediaStreamSource(stream);
                    source.connect(analyser);

                    const updateVolume = () => {
                        analyser.getByteTimeDomainData(dataArray);
                        let sum = 0;
                        for (let i = 0; i < bufferLength; i++) {
                            const amplitude = (dataArray[i] - 128) / 128.0;
                            sum += Math.abs(amplitude);
                        }
                        const averageVolume = sum / bufferLength;
                        const scaledVolume = Math.round(averageVolume * 100);

                        setVolumeLevel(scaledVolume)
                    };

                    const volumeInterval = setInterval(updateVolume, 100);
                    volumeIntervalRef.current = volumeInterval;

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
                            const reader = new FileReader();
                            reader.onloadend = function () {
                                if (reader.result) {
                                    // setBlobFileData(reader.result)
                                    const audioData = {file: reader.result, time: recordingTimeRef.current}
                                    localStorage.setItem('myAudio', JSON.stringify(audioData));
                                    // console.log('Видео сохранено в локальное хранилище');
                                }
                            };
                            reader.readAsDataURL(audioBlob);
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
                    const time = Date.now();
                    const startTime = setInterval(() => {
                        const currentTime = Date.now();
                        const elapsedTime = Math.floor((currentTime - time)); // Время в секундах
                        recordingTimeRef.current = elapsedTime;
                        // Сохраняем время записи в состояние
                        setRecordingTime(elapsedTime);
                    }, 100);
                    startIntervalRef.current = startTime;
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
        setIsAudioRecording(false)
        setVolumeLevel(0);
        if (recordTimeout) {
            clearTimeout(recordTimeout);
            setRecordTimeout(null);
        }
        if(startIntervalRef.current){
            clearInterval(startIntervalRef.current)
            setRecordingTime(0)
        }
        if(variant === "video"){
            setPercentage({time: 0, percent: 0})
        }
        if (volumeIntervalRef.current) {
            clearInterval(volumeIntervalRef.current);
            volumeIntervalRef.current = null;
        }
    }, []);

    const showVideoUrl = useCallback(() => {
        if (videoUrl) {
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
        if(startIntervalRef.current){
            console.log("OPEN DEL")
            clearInterval(startIntervalRef.current)
            setRecordingTime(0)
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
    const changeTime = (time: number) =>{
        const seconds = Math.floor((time / 1000) % 60).toString().padStart(2, '0');
        const milliseconds = Math.floor((time % 1000) / 10).toString().padStart(2, '0');
        return `${seconds}:${milliseconds}`;
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
                <div className={`${s.recorderLine}`} style={{left: `${(isRecording || isAudioRecording) ? 0 : '100%'}`}}>
                    <div className={s.recordTime}>
                        <span className={`${(isRecording || isAudioRecording) && s.activeSpan}`}></span>
                        {changeTime(recordingTime)}
                    </div>
                    <div className={s.closeLine}>
                        <ArrowLeftIcon />
                        <div className="text">Left — cancellation</div>
                    </div>
                    <div className={s.emptyBlock}></div>
                </div>
                <button className={s.giftBtn}><GiftIcon /></button>
                <button className={s.dinnerBtn}><DinnerIcon /></button>
                <div className={s.btnChangeBlock}>
                    {(isRecording || isAudioRecording) && (<div className={s.animCircleBlock}>
                        <span style={{ width: `${volumeLevel * 10}px`, height: `${volumeLevel * 10}px` }}></span>
                        <span style={{ width: `${volumeLevel * 10}px`, height: `${volumeLevel * 10}px` }}></span>
                    </div>)}

                    {isMobile ? (
                        <>
                            <button onTouchStart={() => startHandler("audio")}
                                    onTouchEnd={() => stopHandler("audio")}
                                    onClick={stopRecordBtn}
                                    className={`${s.recordVideo} ${(isRecording || isAudioRecording) && s.recordVideoActive} ${statusRecord === "audio" && s.activeBtn}`}
                            >
                                <AudioRecordIcon color={isAudioRecording ? "white" : ""}/>
                            </button>
                            <button onTouchStart={()=> startHandler('video')}
                                    onTouchEnd={() => stopHandler('video')}
                                    onClick={stopRecordBtn}
                                    className={`${s.recordVideo} ${(isRecording || isAudioRecording) && s.recordVideoActive} ${statusRecord === "video" && s.activeBtn}`}>
                                <VideoRecordIcon color={isRecording ? "white" : ""}/>
                            </button>
                        </>
                    ) : (
                        <>
                            <button onMouseDown={() => startHandler("audio")}
                                    onMouseUp={() => stopHandler("audio")}
                                    onClick={stopRecordBtn}
                                    className={`${s.recordVideo} ${(isRecording || isAudioRecording) && s.recordVideoActive} ${statusRecord === "audio" && s.activeBtn}`}
                            >
                                <AudioRecordIcon color={isAudioRecording ? "white" : ""}/>
                            </button>
                            <button onMouseDown={() => startHandler("video")}
                                    onMouseUp={() => stopHandler("video")}
                                    onClick={stopRecordBtn}
                                    className={`${s.recordVideo} ${(isRecording || isAudioRecording) && s.recordVideoActive} ${statusRecord === "video" && s.activeBtn}`}>
                                <VideoRecordIcon color={isRecording ? "white" : ""}/>
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