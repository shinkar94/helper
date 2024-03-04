import { useEffect, useRef } from 'react';

type Props = {
    waveformData: Uint8Array; // Данные для отображения диаграммы голоса
    backgroundColor: string; // Цвет фона
};

export const AudioVisualizer = ({ waveformData, backgroundColor }: Props) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext('2d');

        if (canvas && context) {
            const width = canvas.width;
            const height = canvas.height;
            context.clearRect(0, 0, width, height); // Очистка холста

            context.fillStyle = backgroundColor; // Установка цвета фона
            context.fillRect(0, 0, width, height); // Заливка фона

            const barWidth = width / waveformData.length;
            const barHeightScale = height / 255; // Масштаб высоты полосы

            context.fillStyle = 'rgba(0, 0, 0, 0)'; // Установка прозрачного цвета

            waveformData.forEach((value, index) => {
                const barHeight = value * barHeightScale;
                const x = index * barWidth;
                const y = height - barHeight;

                context.fillRect(x, y, barWidth, barHeight); // Рисование полосы
            });
        }
    }, [waveformData, backgroundColor]);

    return <canvas ref={canvasRef} />;
};