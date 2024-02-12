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

    // console.log("start URl", url)
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
            console.log("finishUrl", audioUrl)

            const handleLoadedMetadata = () => {
                console.log("success")
                console.log("duration", audioElement.duration)
                setAudioDuration(audioElement.duration);
                setIsAudioLoaded(true);
            };

            const handleTimeUpdate = () => {
                setCurrentTime(audioElement.currentTime);
            };

            audioElement.addEventListener("loadedmetadata", handleLoadedMetadata);
            audioElement.addEventListener("timeupdate", handleTimeUpdate);

            return () => {
                audioElement.removeEventListener(
                    "loadedmetadata",
                    handleLoadedMetadata
                );
                audioElement.removeEventListener("timeupdate", handleTimeUpdate);
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
            {/*<audio className={s.audioMessage} src={"https://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Sevish_-__nbsp_.mp3"} ref={audioRef}></audio>*/}
            <div className={s.controlPanel}>
                <button className={s.playBtn} onClick={playAudio}>{isPlaying ? 'Pause' : 'Play'}</button>
                <div className={s.audioLine}>werwer</div>
                <div className={s.time}>{formatTime(currentTime)} / {formatTime(audioDuration)}</div>
                <div className="lod_player"></div>
            </div>
        </div>
    )
}