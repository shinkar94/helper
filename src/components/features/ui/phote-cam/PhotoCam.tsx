import {useEffect, useRef, useState} from "react";
import s from './PhotoCam.module.scss'
import {ArrowLeftIcon, DeleteIcon, DownloadIcon, PhotoIcon} from "@/components/shared";

type Props = {
    setOpenPhoto: (status: boolean) => void
}
export const PhotoCam = ({setOpenPhoto}:Props) => {
    const [error, setError] = useState<null | string>(null);
    const [isEnabled, setEnabled] = useState(false);
    const [facing, setFacing] = useState("user");
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const startStream = () => {
        navigator.mediaDevices
            .getUserMedia({
                audio: false,
                video: true
            })
            .then((stream) => {
                streamRef.current = stream;
                if(videoRef.current){
                    videoRef.current.srcObject = streamRef.current;
                    videoRef.current.onloadedmetadata = () => videoRef.current?.play();
                }

            })
            .catch((err) => {
                setError(err.name);
            });
    };

    const stopStream = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach((track) => track.stop());
        }
    };

    const makePhoto = () => {
        if (canvasRef.current && videoRef.current) {
            const videoWidth = videoRef.current.scrollWidth;
            const videoHeight = videoRef.current.scrollHeight;
            canvasRef.current.width = videoWidth;
            canvasRef.current.height = videoHeight;
            if (facing === "user") {
                const context = canvasRef.current.getContext("2d");
                if (context) {
                    context.scale(-1, 1);
                    context.drawImage(videoRef.current, 0, 0, -videoWidth, videoHeight);
                }
            } else {
                const context = canvasRef.current.getContext("2d");
                if (context) {
                    context.drawImage(videoRef.current, 0, 0, videoWidth, videoHeight);
                }
            }
        }
    };

    const deletePhoto = () => {
        console.log("delete");
        if(canvasRef.current){
            const context = canvasRef.current.getContext("2d");
            if(context){
                context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
                context.clearRect(0, 0, -canvasRef.current.width, canvasRef.current.height);
            }

        }
    };

    const downloadPhoto = () => {
        if(canvasRef.current){
            const link = document.createElement("a");
            link.download = "photo.png";
            link.href = canvasRef.current.toDataURL("image/png");
            link.click();
        }
    };

    useEffect(() => {
        setError(null);
        stopStream();
        if (isEnabled) startStream();
    }, [isEnabled, facing]);

    const clearPhoto = () => {
        setTimeout(()=>{
            setOpenPhoto(false)
        }, 2000)
    }
    const backPage = () => {
        setEnabled(false)
        clearPhoto()
    }

    return (
        <div className={s.photoWrapper}>
            <video
                className={facing === "user" ? "mirror" : ""}
                playsInline
                muted
                autoPlay
                ref={videoRef}
            ></video>
            <canvas ref={canvasRef}></canvas>
            {error && <div className={s.error}>{error}</div>}
            {isEnabled && <h1>{facing === "user" ? "Front Cam" : "Back Cam"}</h1>}
            <div className={s.controls}>
                <button onClick={() => setEnabled(!isEnabled)}>
                    {isEnabled ? "Off" : "ON"}
                </button>
                <button
                    onClick={() => setFacing(facing === "user" ? "environment" : "user")}
                >
                    FC
                </button>
                <button onClick={() => makePhoto()}>
                    <PhotoIcon />
                </button>
                <button onClick={() => deletePhoto()}>
                    <DeleteIcon />
                </button>
                <button onClick={() => downloadPhoto()}>
                    <DownloadIcon />
                </button>
                <button onClick={backPage}><ArrowLeftIcon /></button>
            </div>
        </div>
    );
}