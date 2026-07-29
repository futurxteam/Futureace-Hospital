const API_BASE_URL =
    "http://localhost:5000/api";

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