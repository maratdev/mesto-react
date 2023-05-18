class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    _getResponseData(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, { headers: this._headers }).then(this._getResponseData);
    }

    getDataUser() {
        return fetch(`${this._baseUrl}/users/me`, {headers: this._headers }).then(this._getResponseData);
    }

    saveDataInfo(profileInfo) {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers,
            method: 'PATCH',
            body: JSON.stringify({
                name: profileInfo.userName,
                about: profileInfo.about
            })
        })
            .then(this._getResponseData);
    }

    saveCardInfo(cardInfo) {
    console.log('API:' + JSON.stringify(cardInfo))
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers,
            method: 'POST',
            body: JSON.stringify({
                name: cardInfo.name,
                link: cardInfo.link
            })
        })
            .then(this._getResponseData);
    }

    deleteCard(cardId) {
        //console.log('API:' + cardId)
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            headers: this._headers,
            method: 'DELETE',
        })
            .then(this._getResponseData);
    }


    changeLikeCardStatus(cardId, isLiked) {
        const method = isLiked ? "PUT" : "DELETE";
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            headers: this._headers,
            method: method,
        }).then(this._getResponseData);
    }


    saveDataProfile(profileAvatar) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            headers: this._headers,
            method: 'PATCH',
            body: JSON.stringify({ avatar: profileAvatar.avatar })
        })
            .then(this._getResponseData);
    }
}


const api = new Api({
    baseUrl: "https://mesto.nomoreparties.co/v1/cohort-64",
    headers: {
        authorization: "145c396a-49e7-4abb-9010-fec05cae083b",
        "Content-Type": "application/json; character=UTF-8",
    },
});

export default api;