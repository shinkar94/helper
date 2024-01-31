import React, {useState} from "react";
import s from './videoRecorderSecond.module.scss'
import Webcam from "react-webcam";

export const WebCamRecorder = () => {
    const [error, setError] = useState<string | null>();
    const [isEnabled, setEnabled] = useState(false);
    const [facing, setFacing] = useState<"user" | "environment">("user");

    return (
        <div className={s.wrapperRecorderSecond}>
            {isEnabled &&
                <Webcam
                    mirrored={facing === "user"}
                    className={facing === s.user ? s.mirror : ""}
                    onUserMediaError={(error) => {
                        if (typeof error === 'string') {
                            setError(error);
                        } else {
                            setError(error.name);
                        }
                    }}
                />
            }
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