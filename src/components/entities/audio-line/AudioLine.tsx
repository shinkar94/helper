import s from './AudioLine.module.scss'
import {AudioVisualizer} from "@/components/entities/audio-line/AudioVisualizer";

type Props = {
    duration: string
}
export const AudioLine = ({duration}:Props) => {
    const spanArray = Array.from({ length: 40 }, (_, index) => index + 1);
    const waveformData = new Uint8Array(40); // Создаем массив данных длиной 40

// Заполняем массив случайными значениями от 0 до 255
    for (let i = 0; i < waveformData.length; i++) {
        waveformData[i] = Math.floor(Math.random() * 256);
    }
    const getRandomHeight = () => `${Math.floor(Math.random() * 20) + 1}px`;
    return(
        <div className={s.audioLine}>
            {spanArray.map((index) => (
                <span key={index} className={s.heightLine} style={{height: getRandomHeight()}}></span>
            ))}
            <AudioVisualizer waveformData={waveformData} backgroundColor={"black"}/>
        </div>
    )
}