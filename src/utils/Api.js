class Api {
  constructor({url, headers}) {
    this.url = url;
    this.headers = headers;
  }

  getInitialPaintings() {
    return fetch(`${this.url}/paintings`, {
      method: 'GET',
      headers: this.headers,
    }).then((res) => {
      if(res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка запроса к серверву загрузки карточек, статус ответа: ${res.status}`);
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