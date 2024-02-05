import {useState} from "react";
import {FaceID, PhotoCam, PhotoWebCam, QrReaderC} from "@/components/features/ui";
import s from './toolsContent.module.scss'
import {FaceIDIcon, PhotoIcon, QrScannerIcon} from "@/components/shared";
export const ToolsContent = () => {
    const [openPhoto, setOpenPhoto] = useState(false)
    const [openWebCamPhoto, setWebCamPhoto] = useState(false)
    const [isQrScanner, setQrScanner] = useState(false)
    const [isFaceID, setFaceID] = useState(false)
    return(
        <div className={s.wrapperTools}>
            <div className={s.blockTools}>
                <div className={s.tools}>
                    <div className={s.blockImage}><PhotoIcon color={"var(--gl-black)"} secondColor={"var(--gl-gold)"}/></div>
                    <button onClick={()=> setOpenPhoto(true)}>Photo</button>
                </div>
                <div className={s.tools}>
                    <div className={s.blockImage}><PhotoIcon color={"var(--gl-black)"} secondColor={"var(--gl-gold)"}/></div>
                    <button onClick={()=> setWebCamPhoto(true)}>Photo WebCam</button>
                </div>
                <div className={s.tools}>
                    <div className={s.blockImage}><QrScannerIcon /></div>
                    <button onClick={()=> setQrScanner(true)}>QR Scanner</button>
                </div>
                <div className={s.tools}>
                    <div className={s.blockImage}><FaceIDIcon /></div>
                    <button onClick={()=> setFaceID(true)}>Face ID</button>
                </div>
            </div>
            {openPhoto &&
                <div className={s.photoContainer}>
                    <PhotoCam setOpenPhoto={setOpenPhoto}/>
                </div>
            }
            {openWebCamPhoto &&
                <div className={s.photoContainer}>
                    <PhotoWebCam setWebCamPhoto={setWebCamPhoto}/>
                </div>
            }
            {isQrScanner && <QrReaderC callBack={()=> setQrScanner(false)}/>}
            {isFaceID && <FaceID />}
        </div>
    )
}