import s from './QrScaner.module.scss'
import {useEffect, useState} from "react";
import {Html5Qrcode} from "html5-qrcode";
export const QrReaderC = () => {
    const [isEnabled, setEnabled] = useState(false)
    const [qrMessage, setQrMessage] = useState("")

    useEffect(()=>{
        const config = {fps: 10, qrbox: {width: 400, height: 200}};
        const html5QrCode = new Html5Qrcode("qrCodeContainer");

        const qrScannerStop = () => {
            if(html5QrCode && html5QrCode.isScanning){
                html5QrCode.stop().then(()=>{
                    console.log("scanner Stop")
                })
                    .catch(() => console.log("Scanner error"))
            }
        }

        const qrCodeSuccess = (decodeText: string) => {
            setQrMessage(decodeText)
            setEnabled(false)
        }

        if(isEnabled){
            html5QrCode.start({facingMode: "environment"}, config, qrCodeSuccess, (error) => {
                console.log("Ошибка чтения QR-кода:", error);
            })
            setQrMessage('')
        }else{
            qrScannerStop()
        }
        return(()=>{
            qrScannerStop()
        })
    }, [isEnabled])
    return <div className={s.wrapperScanner}>
        <div className={s.scannerLine}></div>
        <div id={"qrCodeContainer"} className={s.qrCodeContainer}></div>
        {qrMessage && <div className={s.qrMessage}>{qrMessage}</div>}
        <button className={s.startBtn} onClick={() => setEnabled(!isEnabled)}>{isEnabled ? "On" : "Off"}</button>
    </div>
}