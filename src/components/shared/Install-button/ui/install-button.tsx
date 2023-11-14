import {useEffect, useState} from "react";
interface BeforeInstallPromptEvent extends Event {
    prompt(): Promise<void>;
}
declare global {
    interface WindowEventMap {
        beforeinstallprompt: BeforeInstallPromptEvent;
    }
}
export const InstallButton = () => {
    const [showInstallButton, setShowInstallButton] = useState(false);
    useEffect(() => {
        const handleBeforeInstallPrompt = (event: BeforeInstallPromptEvent) => {
            // event.preventDefault(); // Отменяем автоматическое открытие баннера установки
            setShowInstallButton(!window.matchMedia('(display-mode: standalone)').matches); // Показываем кнопку установки, если приложение не установлено

            const handleInstallClick = () => {
                event.prompt(); // Открываем баннер установки
                setShowInstallButton(false); // Скрываем кнопку после установки
            };

            const installButton = document.getElementById('install-button');
            installButton && installButton.addEventListener('click', handleInstallClick);

            return () => {
                installButton && installButton.removeEventListener('click', handleInstallClick);
            };
        };
        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        };
    }, []);
    return (
        <button id="install-button" style={{ display: showInstallButton ? 'block' : 'none' }}>
            Установить приложение
        </button>
    );
}