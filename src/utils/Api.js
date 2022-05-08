class Api {
  constructor({url, headers}) {
    this.url = url;
    this.headers = headers;
  }

  getListPaintings() {
    return fetch(`${this.url}/paintings`, {
      method: 'GET',
      headers: this.headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка в запросе к серверву загрузки карточек, статус ответа: ${res.status}`);
    });
  }

  getListAuthors() {
    return fetch(`${this.url}/authors`, {
      method: 'GET',
      headers: this.headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка в запросе к серверу загрузки списка авторов, статус ошибки: ${res.status}`);
    });
  }
  
  getListLocations() {
    return fetch(`${this.url}/locations`, {
      method: 'GET',
      headers: this.headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка в запросе к серверу загрузки списка с локациями, статус ошибки: ${res.status}`);
    });
  }

  searchPictureByName(namePicture) {
    return fetch(`${this.url}/paintings/?q=${namePicture}`, {
      method: 'GET',
      headers: this.headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Не удалось отправить запрос на сервер с поиском картинки, статус ошибки: ${res.status}`);
    });
  }
}

const api = new Api({
  url: 'https://test-front.framework.team',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;