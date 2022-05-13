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

  const searchByNamePicture = (namePicture) => {
    if (namePicture.length) {
      api.searchPictureByName(namePicture).then((res) => {
        setListPaintings(res);
        setListAuthors(filterNewArrFromApi(res, 'authorId', listAuthors));
        setListLocations(filterNewArrFromApi(res, 'locationId', listLocations));
      }).catch((err) => {
        return console.log(`Ошибка при получении данных поиска картики:`, err);
      });
    } else {
      setListPaintings(db.paintings);
      setListAuthors(db.authors);
      setListLocations(db.locations);
    }
  };

  const searchByAthorId = (id) => {
    if (id.length) {
      api.searchByAthorId(id).then((res) => {
        setListPaintings(res);
        setListLocations(filterNewArrFromApi(res, 'locationId', listLocations));
      }).catch((err) => {
        return console.log(`Ошибка при поиске карточек по идентификатору автора:`, err);
      });
    } else {
      setListPaintings(db.paintings);
      setListLocations(db.locations);
    }
  };
  

  const searchByLocationId = (id) => {
    if (id.length) {
      api.searchByLocationId(id).then((res) => {
        setListPaintings(res);
        setListAuthors(filterNewArrFromApi(res, 'authorId', listAuthors));
      }).catch((err) => {
        return console.log(`Ошибка при поиске карточек по идентификатору локации:`, err);
      });
    } else {
      setListPaintings(db.paintings);
      setListAuthors(db.authors);
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
  }, [searchData.name]);

  React.useEffect(() => {
    Object.keys(db).length && searchByAthorId(searchData.authorId);
  }, [searchData.authorId])

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
