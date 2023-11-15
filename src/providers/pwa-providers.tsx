import React, { useEffect, useState, createContext } from "react";

type InstallPromptContext = BeforeInstallPromptEvent | null;
export const InstallPromptContext = createContext<InstallPromptContext>(null);

type Props = {
    children: React.ReactNode;
};
export const InstallPromptProvider = ({ children }: Props) => {
    const [promptInstall, setPromptInstall] = useState(null);

    useEffect(() => {
        const handler = (e: Event) => {
            e.preventDefault();
            setPromptInstall(e);
        };

        window.addEventListener("beforeinstallprompt", handler);

        return () => window.removeEventListener("beforeinstallprompt", handler);
    }, []);

    return <InstallPromptContext.Provider value={promptInstall}>{children}</InstallPromptContext.Provider>;
};