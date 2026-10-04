export const BASE_URL = "https://api.chilldev.chickenkiller.com";

export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            "Content-Type" : "application/json",
        },
        body: JSON.stringify({email, password})
    })
    .then((res) => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(res);
    })
    .catch(err => {
        return err.json().then(error => {
            alert(error.message)
            throw error;
        })
    })
};

export const login = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({email, password}),
    })
    .then((res) => {
        if (res.ok) {
            return res.json();
        } 
        return Promise.reject(res);
    })
    .then((data) => {
        if (data) {
            localStorage.setItem('jwt', data.token);
            return data;
        }
    })
    .catch((err) => {
        return err.json().then(error => {
            alert(error.message);
            throw error;
        })
    })
}