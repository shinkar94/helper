import React from "react";
import s from './mobailScreen.module.scss'
import {PlusSquare, Share} from "@/components/shared";
import {FaTimes} from "react-icons/fa";
interface Props {
    closePrompt: () => void;
    doNotShowAgain: () => void;
}

export default function AddToIosSafari(props: Props) {
    const { closePrompt, doNotShowAgain } = props;

    return (
        <div className={s.blockScreen}>
            <div className={s.screenContent}>
                <button className={s.closeBtn} onClick={closePrompt}>
                    <FaTimes className="text-2xl" />
                </button>
                <p>For the best experience, we recommend installing the Valley Trader app to your home screen!</p>
                <div className={s.clickBlock}>
                    <p>Click the</p>
                    <Share className={s.pointIcon} />
                    <p>icon</p>
                </div>
                <div className={s.homeScreen}>
                    <p>Scroll down and then click:</p>
                    <div className={s.homeScreenInf}>
                        <PlusSquare className={s.homeIcon} />
                        <p>Add to Home Screen</p>
                    </div>
                </div>
                <button className={s.notBtn} onClick={doNotShowAgain}>
                    Don&apos;t show again
                </button>
            </div>
        </div>
    );
}