import React, { useEffect, useState, createContext } from "react";

type InstallPromptContext = BeforeInstallPromptEvent | null;
export const InstallPromptContext = createContext<InstallPromptContext>(null);

type Props = {
    children: React.ReactNode;
};
export const InstallPromptProvider = ({ children }: Props) => {
    const [promptInstall, setPromptInstall] = useState<BeforeInstallPromptEvent | null>(null);

    useEffect(() => {
        const handler = (e: BeforeInstallPromptEvent) => {
            e.preventDefault();
            setPromptInstall(e);
        };

        window.addEventListener("beforeinstallprompt", handler as EventListener);

        return () => window.removeEventListener("beforeinstallprompt", handler as EventListener);
    }, []);

    return <InstallPromptContext.Provider value={promptInstall}>{children}</InstallPromptContext.Provider>;
};