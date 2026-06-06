const API_DOMAIN = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";
const AUTH_API_URL = `${API_DOMAIN}/api/auth`;

export async function login(email, password) {
    const response = await fetch(`${AUTH_API_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: email,
            password: password,
        }),
    });

    if (!response.ok) {
        throw new Error("Invalid email or password");
    }

    return response.json();
}