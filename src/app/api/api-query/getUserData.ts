
export async function getUserData () {
    try {
        const response = await fetch("/api");

        if (!response.ok) throw new Error("Проблема с запросом");

        console.log("response", response);
        return response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}