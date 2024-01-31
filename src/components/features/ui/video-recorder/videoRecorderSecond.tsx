import React, { useRef, useEffect, useState } from "react";
import s from './videoRecorderSecond.module.scss'

export const VideoRecorderSecond = () => {
    const [error, setError] = useState<string | null>();
    const [isEnabled, setEnabled] = useState(false);
    const [facing, setFacing] = useState<"user" | "environment">("user");
    const videoRef = useRef<HTMLVideoElement>(null);
    const streamRef = useRef<MediaStream | null>(null);

    const startStream = () => {
        navigator.mediaDevices
            .getUserMedia({
                audio: false,
                video: {
                    facingMode: { exact: facing },
                },
            })
            .then((stream) => {
                streamRef.current = stream;
                if (videoRef.current) {
                    videoRef.current.srcObject = streamRef.current;
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
    };

    const stopStream = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach((track) => track.stop());
        }
    };

    useEffect(() => {
        setError(null);
        stopStream();
        if (isEnabled) startStream();
    }, [isEnabled, facing]);

    return (
        <div className={s.wrapperRecorderSecond}>
            <video
                className={facing === s.user ? s.mirror : ""}
                playsInline
                muted
                autoPlay
                ref={videoRef}
            ></video>
            {error && <div className={s.error}>{error}</div>}
            {isEnabled && <h1>{facing === "user" ? "Front Cam" : "Back Cam"}</h1>}
            <div className={s.controls}>
                <button onClick={() => setEnabled(!isEnabled)}>
                    {isEnabled ? "Off" : "ON"}
                </button>
                <button
                    onClick={() => setFacing(facing === "user" ? "environment" : "user")}
                >
                    CH
                </button>
            </div>
        </div>
    );
}