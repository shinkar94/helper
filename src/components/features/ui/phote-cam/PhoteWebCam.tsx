import {useRef, useState} from "react";
import s from './PhotoCam.module.scss'
import {ArrowLeftIcon, PhotoIcon} from "@/components/shared";
import Webcam from "react-webcam";

type Props = {
    setWebCamPhoto: (status: boolean) => void
}
export const PhotoWebCam = ({setWebCamPhoto}:Props) => {
    const [error, setError] = useState<null | string>(null);
    const [isEnabled, setEnabled] = useState(false);
    const [facing, setFacing] = useState("user");
    const videoRef = useRef<Webcam | null>(null);


    const makePhoto = () => {
        if (videoRef.current) {
            const photo = videoRef.current.getScreenshot();
            const link = document.createElement("a");
            link.download = "photo.png";
            link.href = photo ? photo : "";
            link.click();
        }
    };


    const clearPhoto = () => {
        setTimeout(()=>{
            setWebCamPhoto(false)
        }, 2000)
    }
    const backPage = () => {
        setEnabled(false)
        clearPhoto()
    }

    return (
        <div className={s.photoWrapper}>
            {isEnabled && (
                <Webcam
                    ref={videoRef}
                    audio={false}
                    mirrored={facing === "user"}
                    className={facing === "user" ? "mirror" : ""}
                    videoConstraints={true}
                    onUserMediaError={(error) => {
                        if (typeof error === 'object' && error !== null) {
                            setError(error.name);
                        } else {
                            setError(String(error));
                        }
                    }}
                    onUserMedia={(error) => setError(null)}
                    screenshotFormat="image/jpeg"
                    screenshotQuality={1}
                />
            )}
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
                <button onClick={backPage}><ArrowLeftIcon /></button>
            </div>
        </div>
    );
}