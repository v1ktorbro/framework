import './App.css';
import React from 'react';
import { CurrentThemeContext, defaultTheme } from '../../context/CurrentThemeContext';
import Header from '../Header/Header';
import Main from '../Main/Main';
import api from '../../utils/Api';

function App() {
  // по умолчанию, цвет темы подтягивается из настроек ОС и сохраняется в localStorage
  const [theme, setTheme] = React.useState(localStorage.getItem('app-theme') || defaultTheme);
  const [db, setDb] = React.useState([]);
  const [listPaintings, setListPaintings] = React.useState([]);
  const [listAuthors, setListAuthors] = React.useState([]);
  const [listLocations, setListLocations] = React.useState([]);
  const [searchData, setSearchData] = React.useState({
    name: '',
    authorId: '',
    locationId: '',
    created: {from: '', before: ''},
  });
  
  const handlerSetValueParamSearch = (keyName, value) => {
    setSearchData({...searchData, [keyName]: value});
  };

  const getDataFromApi = () => {
    api.getAllData().then((res) => {
      setDb(res);
      setListPaintings(res.paintings);
      setListAuthors(res.authors);
      setListLocations(res.locations);
    }).catch((err) => {
      return console.log('Ошибка при получении данных с сервера:', err);
    });
  };

  const setInitialData = () => {
    setListPaintings(db.paintings);
    setListAuthors(db.authors);
    setListLocations(db.locations);
  };

  const searchByNamePicture = (namePicture) => {
    if (searchData.authorId.length) {
      const newListPaintings = listPaintings.filter((paint) => paint.name == namePicture);
      if (newListPaintings.length) {
        setListPaintings(newListPaintings);
        setListLocations(filterNewArrFromApi(newListPaintings, 'locationId', db.locations));
      } else { 
        searchByAthorId(searchData.authorId);
      }
    } else if (namePicture.length) {
        api.searchPictureByName(namePicture).then((res) => {
          setListPaintings(res);
          setListAuthors(filterNewArrFromApi(res, 'authorId', db.authors));
          setListLocations(filterNewArrFromApi(res, 'locationId', db.locations));
        }).catch((err) => {
          return console.log(`Ошибка при получении данных поиска картики:`, err);
        });
    } else {
        setListPaintings(db.paintings);
        setListAuthors(db.authors);
        setListLocations(db.locations);
    }
  };

  const searchByAthorId = (authorId) => {
    if (searchData.name.length) {
      const newListPaintings = listPaintings.filter((paint) => paint.authorId == authorId);
      if (newListPaintings.length) {
        setListPaintings(newListPaintings);
        setListLocations(filterNewArrFromApi(newListPaintings, 'locationId', db.locations));
      } else {
        searchByNamePicture(searchData.name);
      }
    } else if (searchData.locationId.length) {
        if (authorId.length) {
          const newListPaintings = listPaintings.filter((paint) => paint.locationId == searchData.locationId && paint.authorId == searchData.authorId);
          setListPaintings(newListPaintings);
          setListLocations(filterNewArrFromApi(newListPaintings, 'locationId', db.locations));
        } else {
          const newListPaintings = db.paintings.filter((paint) => paint.locationId == searchData.locationId);
          setListPaintings(newListPaintings);
          setListAuthors(filterNewArrFromApi(newListPaintings, 'authorId', db.authors));
          //setListLocations(filterNewArrFromApi(newListPaintings, 'locationId', db.locations));
        }
    } else if (authorId.length) {
        api.searchByAthorId(authorId).then((res) => {
          setListPaintings(res);
          setListLocations(filterNewArrFromApi(res, 'locationId', db.locations));
        }).catch((err) => {
          return console.log(`Ошибка при поиске карточек по идентификатору автора:`, err);
        });
    } else {
        setListPaintings(db.paintings);
        setListAuthors(db.authors);
        setListLocations(db.locations);
    }
  };
  

  const searchByLocationId = (locationId) => {
    if (searchData.authorId.length) {
      if (locationId.length) {
        const newListPaintings = listPaintings.filter((paint) => paint.locationId == locationId);
        setListPaintings(newListPaintings);
        //setListAuthors(filterNewArrFromApi(newListPaintings, 'authorId', db.authors));
        //!searchData.authorId.length && setListAuthors(filterNewArrFromApi(newListPaintings, 'authorId', db.locations));
      } else {
        const newListPaintings = db.paintings.filter((paint) => paint.authorId == searchData.authorId);
        setListPaintings(newListPaintings);
        setListAuthors(db.authors);
        setListLocations(filterNewArrFromApi(newListPaintings, 'locationId', db.locations));
      }
    } else if (locationId.length) {
        api.searchByLocationId(locationId).then((res) => {
          setListPaintings(res);
          setListAuthors(filterNewArrFromApi(res, 'authorId', listAuthors));
        }).catch((err) => {
          return console.log(`Ошибка при поиске карточек по идентификатору локации:`, err);
        });
    } else {
        setListPaintings(db.paintings);
        setListAuthors(db.authors);
        setListLocations(db.locations);
    }
  };

  const filterNewArrFromApi = (arrFromApi, keyNameId, listArrData) => {
    let arrUniqueId = [];
    let newArr = [];
    const obj = {};
    for (let i = 0; i < arrFromApi.length; i++) {
      const currentEl = arrFromApi[i][keyNameId];
      if (!(currentEl in obj)) {
        obj[currentEl] = 1;
      } else {
        obj[currentEl] += 1;
      }
    }
    const keys = Object.keys(obj);
    keys.forEach((key) => arrUniqueId.push(key));
    arrUniqueId.forEach((id) => newArr.push(listArrData[id - 1]));
    return newArr;
  };

  React.useEffect(() => {
    Object.keys(db).length && searchByNamePicture(searchData.name);
    //Object.keys(db).length && searchByAthorId(searchData.authorId);
  }, [searchData.name]);

  React.useEffect(() => {
    Object.keys(db).length && searchByAthorId(searchData.authorId);
  }, [searchData.authorId]);

  React.useEffect(() => {
    Object.keys(db).length && searchByLocationId(searchData.locationId);
  }, [searchData.locationId]);

  React.useEffect(() => {
    getDataFromApi();
  }, []);

  React.useEffect(() => {
    localStorage.setItem('app-theme', theme);
    document.documentElement.setAttribute('app-theme', theme);
  }, [theme]);

  return (
    <>
      <CurrentThemeContext.Provider value={theme}>
        <Header 
          setTheme={setTheme}
        />
        <Main 
          listPaintings={listPaintings}
          listAuthors={listAuthors}
          listLocations={listLocations}
          handlerSetValueParamSearch={handlerSetValueParamSearch}
        />
      </CurrentThemeContext.Provider>
    </>
  );
}

export default App;
