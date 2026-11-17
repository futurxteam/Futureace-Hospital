const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "https://futureace-hospital-1.onrender.com/api";

export async function apiRequest(
    endpoint,
    {
        method = "GET",
        body = null,
        headers = {}
    } = {}
) {

    const response = await fetch(
        `${API_BASE_URL}${endpoint}`,
        {
            method,

            headers: {
                "Content-Type": "application/json",
                ...headers
            },

            body
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Something went wrong."
        );
    }

    return data;
}