import React, { useState, useEffect } from 'react';
import { setCookie, getCookie } from 'cookies-next';
import useUserAgent from "@/components/shared/hok/useUserAgent";
import s from './mobailScreen.module.scss'
import AddToIosSafari from "@/components/features/ui/home-screen/AddToIosSafari";
import AddToMobileChrome from "@/components/features/ui/home-screen/AddToMobileChrome";

const ModuleLoading = () => <p className="animate-bounce text-white font-bold">Loading...</p>;

type AddToHomeScreenPromptType = 'Safari' | 'Chrome' | null;
const COOKIE_NAME = 'addToHomeScreenPrompt';

export const AddToHomeScreen = () => {
    const [displayPrompt, setDisplayPrompt] = useState<AddToHomeScreenPromptType>(null);
    const { userAgent, isMobile, isStandalone, isIOS } = useUserAgent();
    const closePrompt = () => {
        setDisplayPrompt(null);
    };

    const doNotShowAgain = () => {
        // Create date 1 year from now
        const date = new Date();
        date.setFullYear(date.getFullYear() + 1);
        setCookie(COOKIE_NAME, 'dontShow', { expires: date }); // Set cookie for a year

        setDisplayPrompt(null);
    };

    useEffect(() => {
        const addToHomeScreenPromptCookie = getCookie(COOKIE_NAME);

        if (addToHomeScreenPromptCookie !== 'dontShow') {
            userAgent && setDisplayPrompt(userAgent as AddToHomeScreenPromptType);
        }else{
            setDisplayPrompt(null)
        }
    }, [userAgent, isMobile, isStandalone, isIOS]);

    return (
        displayPrompt !== null
            ? userAgent === 'Safari'
                ?
                    <div
                        className={s.containerScreen}
                        onClick={closePrompt}
                    >
                        <AddToIosSafari closePrompt={closePrompt} doNotShowAgain={doNotShowAgain}/>
                    </div>
                : <div
                    className={s.containerScreen}
                    onClick={closePrompt}
                >
                    <AddToMobileChrome closePrompt={closePrompt} doNotShowAgain={doNotShowAgain}/>
                </div>
            : <></>

    );
}