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
                name: profileInfo.name,
                about: profileInfo.about
            })
        })
            .then(this._getResponseData);
    }

    saveCardInfo(cardInfo) {
//    console.log('API:' + cardInfo)
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers,
            method: 'POST',
            body: JSON.stringify({
                name: cardInfo.card_name,
                link: cardInfo.card_src
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
            body: JSON.stringify({ avatar: profileAvatar.updInput })
        })
            .then(this._getResponseData);
    }
}


const api = new Api({
    baseUrl: "https://mesto.nomoreparties.co/v1/cohort-63",
    headers: {
        authorization: "a0f27208-1338-40bf-beb2-4ac5a9a59cf6",
        "Content-Type": "application/json",
    },
});

export default api;