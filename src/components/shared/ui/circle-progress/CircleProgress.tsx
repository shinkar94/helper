import s from "@/components/features/ui/video-recorder/videoRecorder.module.scss";
import React from "react";

type PropsProgress = {
    strokeWidth: number,
    sqSizeQuery: number,
    percentage: PercentageType
}
type PercentageType = {
    time: number
    percent: number
}
export const CircularProgressBar = ({strokeWidth, sqSizeQuery, percentage}:PropsProgress) => {
    const sqSize = sqSizeQuery;
    const radius = (sqSizeQuery - strokeWidth) / 2;
    const viewBox = `0 0 ${sqSize} ${sqSize}`;
    const dashArray = radius * Math.PI * 2;
    const dashOffset = dashArray - dashArray * percentage.percent / 100;

    return (
        <svg
            width={sqSizeQuery}
            height={sqSizeQuery}
            viewBox={viewBox}
            className={s.progressSvg}
            fill={"none"}
        >
            <circle
                className={s.circleBackground}
                cx={sqSizeQuery / 2}
                cy={sqSizeQuery / 2}
                r={radius}
                strokeWidth={`${strokeWidth}px`}
            />
            <circle
                className={s.circleProgress}
                cx={sqSizeQuery / 2}
                cy={sqSizeQuery / 2}
                r={radius}
                strokeWidth={`${strokeWidth}px`}
                transform={`rotate(-90 ${sqSizeQuery / 2} ${sqSizeQuery / 2})`}
                style={{
                    strokeDasharray: dashArray,
                    strokeDashoffset: dashOffset,
                    stroke: "white",
                    strokeLinecap: "round",
                    transition: `stroke-dashoffset ${percentage.time}s linear`
                }}
            />
        </svg>
    );
}