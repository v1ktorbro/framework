class Api {
  constructor({url, headers}) {
    this.url = url;
    this.headers = headers;
  }

  getAllData() {
    return fetch(`${this.url}/db`, {
      method: 'GET',
      headers: this.headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error when receiving server data, error status: ${res.status}`);
    });
  }

  getListPaintings() {
    return fetch(`${this.url}/paintings`, {
      method: 'GET',
      headers: this.headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error in the request to the card upload server, response status: ${res.status}`);
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
      return Promise.reject(`Error in the request to the server for downloading the list of authors, error status: ${res.status}`);
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
      return Promise.reject(`Error in the request to the server for downloading the list with locations, error status: ${res.status}`);
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
      return Promise.reject(`Failed to send a request to the server with the image search, error status: ${res.status}`);
    });
  }

  searchByAthorId(id) {
    return fetch(`${this.url}/paintings?authorId=${id}`, {
      method: 'GET',
      headers: this.headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Failed to send a request to receive cards by author ID, error status: ${res.status}`);
    });
  }

  searchByLocationId(id) {
    return fetch(`${this.url}/paintings?locationId=${id}`, {
      method: 'GET',
      headers: this.headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Failed to send a request to receive cards by location ID, error status: ${res.status}`);
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