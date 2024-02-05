interface DtConfig {
    maxContinuousChecks?: number;
    detectionConfidence?: number;
    maxFaces?: number;
    iouThreshold?: number;
    scoreThreshold?: number;
    inputResolution: {
        width: number;
        height: number;
    };
    scale: number;
}
export const config = {
    width: 640,
    height: 640,
}

export const dtConfig: DtConfig = {
    inputResolution: {width: config.width, height: config.height},
    scale: 0.8,
}