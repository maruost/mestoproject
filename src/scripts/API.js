export default class Api {

    constructor(config) {
        this.url = config.url;
        this.headers = config.headers;
    }

    getUserInfo = (partOfUrl) => {
        return fetch(`${this.url}${partOfUrl}`, {
            headers: this.headers
        })
        .then(res => this._checkStatus(res))
    }

    getInitialCards = (partOfUrl) => {
        return fetch(`${this.url}${partOfUrl}`, {
            headers: this.headers
        })
        .then(res => this._checkStatus(res))
    }


    editUserInfo = (partOfUrl, name, about) => {
        return fetch(`${this.url}${partOfUrl}`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
        .then(res => this._checkStatus(res))
    }

    addNewCard = (partOfUrl, name, link) => {
        return fetch(`${this.url}${partOfUrl}`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
            .then(res => this._checkStatus(res))
    }

    _checkStatus = (res) => {
        if (!res.ok) {
            return Promise.reject(res.status);
        } else {
            return res.json();
        }
    }
}
