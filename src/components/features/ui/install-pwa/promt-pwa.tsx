import React, { useContext } from "react";
import {InstallPromptContext} from "@/providers/pwa-providers";
import {Button} from "@/components/shared";

declare global {
    // interface WindowEventMap {
    //     beforeinstallprompt: BeforeInstallPromptEvent;
    // }

    interface BeforeInstallPromptEvent extends Event {
        readonly platforms: Array<string>;
        readonly userChoice: Promise<{
            outcome: "accepted" | "dismissed";
            platform: string;
        }>;
        prompt(): Promise<void>;
    }
}

export const InstallPWA: React.FC = () => {
    const promptInstall = useContext(InstallPromptContext);

    const onClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
        evt.preventDefault();
        if (!promptInstall) {
            return;
        }
        promptInstall.prompt();
    };

    if (!promptInstall) {
        return null;
    }

    return (
        <Button aria-label='Install app' className='link-button' id='setup_button' title='Install app' onClick={onClick}>
            Install
        </Button>
    );
};