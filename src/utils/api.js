class Api{
    constructor(options){
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    _checkResponse(res){
        if (res.ok){
            return res.json();
        }
        return Promise.reject(`Error: ${res.status}`)
    }

    setAuthToken(token) {
    this._headers['Authorization'] = `Bearer ${token}`;
    }

    getUserInfo(){
        return  fetch(`${this._baseUrl}/users/me`, {
        method: 'GET',
        headers: this._headers})
        .then(this._checkResponse);
    }
    getCardList(){
        return fetch(`${this._baseUrl}/cards`, {
            method: 'GET',
            headers: this._headers})
        .then(this._checkResponse)
    }
    setUserInfo(userData){
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(userData)
        })
        .then(this._checkResponse)
    }
    addCard(data){
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(data)
        })
        .then(this._checkResponse);
    }
    setUserAvatar(data){
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(data)
        })
        .then(this._checkResponse)
    }
    eraseCard(cardId){
        return fetch(`${this._baseUrl}/cards/${cardId}`,{
            method: 'DELETE',
            headers: this._headers
        })
        .then(this._checkResponse);
    }
    likeCard(cardId, isLiked){
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`,{
            method: isLiked ? 'PUT' : 'DELETE',
            headers: this._headers
        })
        .then(this._checkResponse);
    }
};

const api = new Api({
  baseUrl: 'https://api.chilldev.chickenkiller.com',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;

