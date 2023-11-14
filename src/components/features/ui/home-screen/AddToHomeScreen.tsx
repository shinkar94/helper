import React, { useState, useEffect } from 'react';
import { setCookie, getCookie } from 'cookies-next';
import dynamic from 'next/dynamic';
import useUserAgent from "@/components/shared/hok/useUserAgent";
import s from './mobailScreen.module.scss'

const ModuleLoading = () => <p className="animate-bounce text-white font-bold">Loading...</p>;
const AddToIosSafari = dynamic(() => import('./AddToMobileChrome'), { loading: () => <ModuleLoading /> });
const AddToMobileChrome = dynamic(() => import('./AddToMobileChrome'), { loading: () => <ModuleLoading /> });
const AddToMobileFirefox = dynamic(() => import('./AddToMobileChrome'), { loading: () => <ModuleLoading /> });
const AddToMobileFirefoxIos = dynamic(() => import('./AddToMobileChrome'), { loading: () => <ModuleLoading /> });
const AddToMobileChromeIos = dynamic(() => import('./AddToMobileChrome'), { loading: () => <ModuleLoading /> });
const AddToSamsung = dynamic(() => import('./AddToMobileChrome'), { loading: () => <ModuleLoading /> });
const AddToOtherBrowser = dynamic(() => import('./AddToMobileChrome'), { loading: () => <ModuleLoading /> });



type AddToHomeScreenPromptType = 'safari' | 'chrome' | 'firefox' | 'other' | 'firefoxIos' | 'chromeIos' | 'samsung' | '';
const COOKIE_NAME = 'addToHomeScreenPrompt';

export const AddToHomeScreen = () => {
    const [displayPrompt, setDisplayPrompt] = useState<AddToHomeScreenPromptType>('');
    const { userAgent, isMobile, isStandalone, isIOS } = useUserAgent();

    const closePrompt = () => {
        setDisplayPrompt('');
    };

    const doNotShowAgain = () => {
        // Create date 1 year from now
        const date = new Date();
        date.setFullYear(date.getFullYear() + 1);
        setCookie(COOKIE_NAME, 'dontShow', { expires: date }); // Set cookie for a year

        setDisplayPrompt('');
    };

    useEffect(() => {
        const addToHomeScreenPromptCookie = getCookie(COOKIE_NAME);

        if (addToHomeScreenPromptCookie !== 'dontShow') {
            // Only show prompt if user is on mobile and app is not installed
            if (isMobile && !isStandalone) {
                if (userAgent === 'Safari') {
                    setDisplayPrompt('safari');
                } else if (userAgent === 'Chrome') {
                    setDisplayPrompt('chrome');
                } else if (userAgent === 'Firefox') {
                    setDisplayPrompt('firefox');
                } else if (userAgent === 'FirefoxiOS') {
                    setDisplayPrompt('firefoxIos');
                } else if (userAgent === 'ChromeiOS') {
                    setDisplayPrompt('chromeIos');
                } else if (userAgent === 'SamsungBrowser') {
                    setDisplayPrompt('samsung');
                } else {
                    setDisplayPrompt('other');
                }
            }
        } else {
        }
    }, [userAgent, isMobile, isStandalone, isIOS]);

    const Prompt = () => (
        <>
            {
                {
                    'safari': <AddToIosSafari closePrompt={closePrompt} doNotShowAgain={doNotShowAgain} />,
                    'chrome': <AddToMobileChrome closePrompt={closePrompt} doNotShowAgain={doNotShowAgain} />,
                    'firefox': <AddToMobileFirefox closePrompt={closePrompt} doNotShowAgain={doNotShowAgain} />,
                    'firefoxIos': <AddToMobileFirefoxIos closePrompt={closePrompt} doNotShowAgain={doNotShowAgain} />,
                    'chromeIos': <AddToMobileChromeIos closePrompt={closePrompt} doNotShowAgain={doNotShowAgain} />,
                    'samsung': <AddToSamsung closePrompt={closePrompt} doNotShowAgain={doNotShowAgain} />,
                    'other': <AddToOtherBrowser closePrompt={closePrompt} doNotShowAgain={doNotShowAgain} />,
                    '': <></>
                }[displayPrompt]
            }
        </>
    )

    return (
        <>
            {
                displayPrompt !== ''
                    ?
                    <>
                        <div
                            className={s.containerScreen}
                            onClick={closePrompt}
                        >
                            <Prompt />
                        </div>
                    </>
                    :
                    <></>
            }
        </>
    );
}