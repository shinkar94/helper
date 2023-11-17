import React, { useEffect, useState } from 'react'

export default function useUserAgent() {
    /**
     * we set our initial state as null because we don't know what the user agent is yet
     * that way we can check if the user agent has been set or not
     */
    const [isMobile, setIsMobile] = useState<boolean | null>(null);
    const [userAgent, setUserAgent] = useState<string | null>(null);
    const [isIOS, setIsIOS] = useState<boolean | null>(null);
    const [isStandalone, setIsStandalone] = useState<boolean | null>(null);
    const [userAgentString, setUserAgentString] = useState<string | null>(null);

    useEffect(() => {
        if (window) {
            const userAgentString = window.navigator.userAgent;
            setUserAgentString(userAgentString);
            let userAgent;

            if (userAgentString.indexOf('Safari') > -1) {
                userAgent = 'Safari';
            } else if (userAgentString.indexOf('Firefox') > -1) {
                userAgent = 'Firefox';
            } else if (userAgentString.indexOf('FxiOS') > -1) {
                userAgent = 'FirefoxiOS';
            } else if (userAgentString.indexOf('CriOS') > -1) {
                userAgent = 'ChromeiOS';
            } else if (userAgentString.indexOf('Chrome') > -1) {
                userAgent = 'Chrome';
            } else if (userAgentString.indexOf('Safari') > -1) {
                userAgent = 'Safari';
            } else {
                userAgent = 'Chrome';
            }
            setUserAgent(userAgent);

            // Check if user agent is mobile
            const isIOS = userAgentString.match(/iPhone|iPad|iPod/i);
            const isAndroid = userAgentString.match(/Android/i);
            setIsIOS(!!isIOS);
            const isMobile = isIOS || isAndroid;
            setIsMobile(!!isMobile);

            if (window.matchMedia('(display-mode: standalone)').matches) {
                setIsStandalone(true);
            }
        }
    }, []);

    return { isMobile, userAgent, isIOS, isStandalone, userAgentString }
}