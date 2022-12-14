class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
    this._token =null;
  }

  setToken(token) {
    this._token = token;
    this._headers = {
      ...this._headers,
      Authorization: `Bearer ${token}`
    }
  }

  _check(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _getCards() {
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: this._headers,
    }).then(this._check);
  }

  _getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then(this._check);
  }

  postCard(data) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._check);
  }

  deleteCardApi(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._check);
  }

  changeProfileInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.username,
        about: data.userjob,
      }),
    }).then(this._check);
  }

  changeAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then(this._check);
  }

  addLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._check);
  }

  deleteLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._check);
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return this.addLike(cardId);
    } else {
      return this.deleteLike(cardId);
    }
  }

  getDataAll() {
    return Promise.all([this._getCards(), this._getUserInfo()]);
  }
}

const api = new Api({
  url: 'https://api.testfrontsedov.nomoredomains.icu',
  //url: 'http://localhost:5555',
  headers: {
    "Content-Type": "application/json",
  },
});
export default api;