import s from "@/components/features/ui/video-recorder/videoRecorder.module.scss";
import React, {useEffect, useRef, useState} from "react";

type Props = {
    url: string
}
export const AudioMessage = ({url}:Props) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [audioDuration, setAudioDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [isAudioLoaded, setIsAudioLoaded] = useState(false);
    useEffect(() => {
        const audioElement = audioRef.current;

        if (audioElement) {
            const byteString = atob(url.split(",")[1]);
            const mimeString = url.split(",")[0].split(":")[1].split(";")[0];
            const arrayBuffer = new ArrayBuffer(byteString.length);
            const intArray = new Uint8Array(arrayBuffer);

            for (let i = 0; i < byteString.length; i++) {
                intArray[i] = byteString.charCodeAt(i);
            }

            const blob = new Blob([intArray], { type: mimeString });
            const audioUrl = URL.createObjectURL(blob);

            audioElement.src = audioUrl;

            const handleLoadedMetadata = () => {
                setAudioDuration(audioElement.duration);
                setIsAudioLoaded(true);
            };
            const handleLoadedData = () => {
                console.log("open function")
                console.log("duration", audioElement.duration)
                setTimeout(()=>{
                    console.log("start time")
                    setAudioDuration(audioElement.duration);
                }, 1000)
                // setAudioDuration(audioElement.duration);
            };

            const handleTimeUpdate = () => {
                setCurrentTime(audioElement.currentTime);
            };

            audioElement.addEventListener("loadedmetadata", handleLoadedMetadata);
            audioElement.addEventListener("timeupdate", handleTimeUpdate);
            audioElement.addEventListener("loadeddata", handleLoadedData);

            return () => {
                audioElement.removeEventListener(
                    "loadedmetadata",
                    handleLoadedMetadata
                );
                audioElement.removeEventListener("timeupdate", handleTimeUpdate);
                audioElement.removeEventListener("loadeddata", handleLoadedData);
                URL.revokeObjectURL(audioUrl);
            };
        }
    }, [url]);
    function formatTime(durationInSeconds: number) {
        const minutes = Math.floor(durationInSeconds / 60);
        const seconds = Math.floor(durationInSeconds % 60);
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(seconds).padStart(2, '0');
        return `${formattedMinutes}:${formattedSeconds}`;
    }
    const playAudio = () => {
        if (audioRef.current) {
            const audioElement = audioRef.current;
            if (isPlaying) {
                audioElement.pause();
            } else {
                audioElement.play();
            }
            setIsPlaying(!isPlaying);
        }
    };
    return(
        <div className={s.wrapperAudioMessage}>
            <audio className={s.audioMessage} ref={audioRef}></audio>
            <div className={s.controlPanel}>
                <button className={s.playBtn} onClick={playAudio}>{isPlaying ? 'Pause' : 'Play'}</button>
                <div className={s.audioLine}>werwer</div>
                <div className={s.time}>{formatTime(currentTime)} / {formatTime(audioDuration)}</div>
                <div className="lod_player"></div>
            </div>
        </div>
    )
}