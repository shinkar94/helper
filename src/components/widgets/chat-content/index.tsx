"use client"
import s from './chat.module.scss'
import Image from "next/image";
import {useState, TouchEvent, MouseEvent} from "react";

export const ChatContent = () => {
    const [startX, setStartX] = useState<number | null>(null);
    const [currentX, setCurrentX] = useState<number>(0);
    const [statusLine, setStatusLine] = useState<"left" | "right">("right")

    const handleMouseDown = (
        event: MouseEvent<HTMLDivElement, MouseEvent> | TouchEvent<HTMLDivElement>
    ) => {
        setStartX(getClientX(event));
    };

    const handleMouseMove = (
        event: MouseEvent<HTMLDivElement, MouseEvent> | TouchEvent<HTMLDivElement>
    ) => {
        const x = getClientX(event);
        if (x !== null && startX !== null) {
            const dx = x - startX;
            setCurrentX(dx);
        }
    };

    const handleMouseUp = () => {
        if (currentX > 0) {
            console.log("Блок был потянут вправо");
            setStatusLine("right")
        } else if (currentX < 0) {
            console.log("Блок был потянут влево");
            setStatusLine("left")
        }
    };

    const getClientX = (
        event: MouseEvent<HTMLDivElement, MouseEvent> | TouchEvent<HTMLDivElement>
    ): number | null => {
        if (event.type.startsWith("touch")) {
            const touchEvent = event as TouchEvent<HTMLDivElement>;
            if (touchEvent.touches.length > 0) {
                return touchEvent.touches[0].clientX;
            }
        } else {
            const mouseEvent = event as MouseEvent<HTMLDivElement, MouseEvent>;
            return mouseEvent.clientX;
        }
        return null;
    };

    return (
        <div className={s.chatWrapper}>
            <div className={s.chatHeader}>Header</div>
            <div className={s.content}>
                <div className={s.messagesList}>
                    <div className={s.messagesBlock}
                         style={{left: statusLine === "right" ? "0" : "-120px"}}
                         onMouseDown={handleMouseDown}
                         onTouchStart={handleMouseDown}
                         onMouseMove={handleMouseMove}
                         onTouchMove={handleMouseMove}
                         onMouseUp={handleMouseUp}
                         onTouchEnd={handleMouseUp}>
                        <div className={s.leftPanel}>
                            <div className={s.avatarBlock}>
                                <Image src={""} alt={"avatar"} width={48} height={48} />
                            </div>
                            <div className={s.infoBlock}>bhb</div>
                            <div className={s.timeBlock}>11:32</div>
                        </div>
                        <div className={s.rightPanel}>
                            <button>Dl</button>
                            <button>Ch</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};