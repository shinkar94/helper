export async function logoutQuery () {
    try {
        const response = await fetch("/api/auth/logout");

        // if (!response.ok) throw new Error("Проблема с запросом");

        console.log("response", response);
        return response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}