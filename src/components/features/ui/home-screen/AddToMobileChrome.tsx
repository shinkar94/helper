import React from 'react'

import { FaTimes } from 'react-icons/fa'
import { HiDotsVertical } from 'react-icons/hi'
import { MdAddToHomeScreen } from 'react-icons/md'
import { ImArrowUp } from 'react-icons/im'
import s from './mobailScreen.module.scss'
import {InstallPWA} from "@/components/features";

interface Props {
    closePrompt: () => void;
    doNotShowAgain: () => void;
}

export default function AddToMobileChrome(props: Props) {
    const { closePrompt, doNotShowAgain } = props;

    return (
        <div className={s.blockScreen}>
            <ImArrowUp className={s.downIcon} />
            <div className={s.screenContent}>
                <button className={s.closeBtn} onClick={closePrompt}>
                    <FaTimes className="text-2xl" />
                </button>
                <p className="text-lg">For the best experience, we recommend installing the Valley Trader app to your home screen!</p>
                <div className={s.clickBlock}>
                    <p>Click the</p>
                    <HiDotsVertical className={s.pointIcon} />
                    <p>icon</p>
                </div>
                <div className={s.homeScreen}>
                    <p>Scroll down and then click:</p>
                    <div className={s.homeScreenInf}>
                        <MdAddToHomeScreen className={s.homeIcon} />
                        <p>Add to Home Screen</p>
                    </div>
                </div>
                <button className={s.notBtn} onClick={doNotShowAgain}>Don&apos;t show again</button>
                <InstallPWA />
            </div>
        </div>
    )
}