
export async function getUserData () {
    try {
        const response = await fetch("/api");
        return response.json();
    } catch (error) {
        throw error;
    }
}