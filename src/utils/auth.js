export const BASE_URL = "https://arround-backend.onrender.com";

export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    })
    .then(async (res) => {
        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || "Error al registrarse");
        }

        return data;
    });
};

export const login = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    })
    .then(async (res) => {
        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || "Error al iniciar sesión");
        }

        localStorage.setItem("jwt", data.token);

        return data;
    });
};