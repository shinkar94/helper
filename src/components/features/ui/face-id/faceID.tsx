
import s from './faceID.module.scss'
import {useEffect, useRef, useState} from "react";
import Webcam from 'react-webcam'
import {config, dtConfig} from './config'
import {createFaceId, drawMesh} from './utils'
import * as TF from '@tensorflow/tfjs'
TF.setBackend('webgl');
import * as facemesh from '@tensorflow-models/facemesh'


export const FaceID = () => {
    const [isEnable, setEnable] = useState(false)
    const webcamRef = useRef<Webcam | null>(null)
    const canvasRef = useRef<HTMLCanvasElement | null>(null)

    const runDetector = async () => {
        const detector = await facemesh.load(dtConfig)
        const detect = async (net: facemesh.FaceMesh) => {
            if(webcamRef.current && webcamRef.current?.video?.readyState === 4, canvasRef.current){
                const video = webcamRef.current?.video
                const canvas = canvasRef.current
                if (video && video instanceof HTMLVideoElement && canvas && canvas instanceof HTMLCanvasElement) {
                    canvas.width = video.videoWidth
                    canvas.height = video.videoHeight
                    const face = await net.estimateFaces(video)
                    // createFaceId(face)
                    const ctx = canvas.getContext("2d")
                    if(ctx){
                        requestAnimationFrame(() => drawMesh(face, ctx));
                    }
                    detect(detector)
                }
            }
        }
        detect(detector)
    }
    useEffect(() => {
        setTimeout(() => runDetector(), 500)
    }, [isEnable])
    return(
        <div className={s.faceWrapper}>
            {isEnable && (
                <>
                    <Webcam videoConstraints={config} ref={webcamRef}/>
                    <canvas ref={canvasRef}/>
                </>

            )}
            <button onClick={()=>{setEnable(!isEnable)}}>{isEnable ? "off" : "on"}</button>
        </div>
    )
}