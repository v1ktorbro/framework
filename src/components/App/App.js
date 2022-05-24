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
  const [reqParamSearch, setReqParamSearch] = React.useState([]);
  
  const handlerSetValueParamSearch = (keyName, value) => {
    setSearchData({...searchData, [keyName]: value});
    handlerSetReqParamSearch(keyName, value);
  };

  const handlerSetReqParamSearch = (keyName, value) => {
    if (keyName != 'created') {
      value.length ? setReqParamSearch([...reqParamSearch, keyName]) : setReqParamSearch(reqParamSearch.filter((item) => item != keyName));
    }
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

  const searchByOneParametr = (value) => {
    switch (value) {
      case 'name':
        api.searchPictureByName(searchData.name).then((res) => {
          setListPaintings(res);
          setListAuthors(filterNewArrFromApi(res, 'authorId', db.authors));
          setListLocations(filterNewArrFromApi(res, 'locationId', db.locations));
        }).catch((err) => {
          return console.log(`Ошибка при получении данных поиска картики:`, err);
        });
        break;
      case 'authorId':
        api.searchByAthorId(searchData.authorId).then((res) => {
          setListPaintings(res);
          setListLocations(filterNewArrFromApi(res, 'locationId', db.locations));
          setListAuthors(db.authors);
        }).catch((err) => {
          return console.log(`Ошибка при поиске карточек по идентификатору автора:`, err);
        });
        break;
      case 'locationId':
        api.searchByLocationId(searchData.locationId).then((res) => {
          setListPaintings(res);
          setListAuthors(filterNewArrFromApi(res, 'authorId', db.authors));
          setListLocations(db.locations);
        }).catch((err) => {
          return console.log(`Ошибка при поиске карточек по идентификатору локации:`, err);
        });
        break;
    }
  };


  const handlerValueSearchData = () => {
    if (reqParamSearch.length == 1) {
      searchByOneParametr(reqParamSearch[0]);
    } else if (reqParamSearch.length == 2) {
      reqParamSearch.reduce((prevValue, currentValue) => {
        searchByTwoParameters(prevValue, currentValue);
      });
    }
  };

  const searchByTwoParameters = (firstParam, secondParam) => {
    switch (firstParam) {
      case 'name':
        if (secondParam == 'authorId') {
          const newListPaintings = listPaintings.filter((paint) => paint[secondParam] == searchData[secondParam]);
          setListPaintings(newListPaintings);
          setListLocations(filterNewArrFromApi(newListPaintings, 'locationId', db.locations));
        }
        if (secondParam == 'locationId') {
          const newListPaintings = listPaintings.filter((paint) => paint[secondParam] == searchData[secondParam]);
          setListPaintings(newListPaintings);
          setListLocations(filterNewArrFromApi(newListPaintings, 'locationId', db.locations));
          setListAuthors(filterNewArrFromApi(newListPaintings, 'authorId', db.authors));
        }
        break;
      case 'authorId':
        if (secondParam == 'name') {
          const newListPaintings = listPaintings.filter((paint) => paint[secondParam] == searchData[secondParam]);
          setListPaintings(newListPaintings);
          setListAuthors(filterNewArrFromApi(newListPaintings, 'authorId', db.authors));
          setListLocations(filterNewArrFromApi(newListPaintings, 'locationId', db.locations));
        }
        if (secondParam == 'locationId') {
          const newListPaintings = db.paintings.filter((paint) => paint[secondParam] == searchData[secondParam]);
          setListPaintings(newListPaintings);
          setListAuthors(filterNewArrFromApi(newListPaintings, 'authorId', db.authors));
        }
        break;
      case 'locationId':
        if (secondParam == 'name') {
          const newListPaintings = listPaintings.filter((paint) => paint[secondParam] == searchData[secondParam]);
          setListPaintings(newListPaintings);
          setListAuthors(filterNewArrFromApi(newListPaintings, 'authorId', db.authors));
          setListLocations(filterNewArrFromApi(newListPaintings, 'locationId', db.locations));
        }
        if (secondParam == 'authorId') {
          const newListPaintings = listPaintings.filter((paint) => paint[secondParam] == searchData[secondParam]);
          setListPaintings(newListPaintings);
          const newListLocation = db.paintings.filter((paint) => paint[secondParam] == searchData[secondParam]);
          setListLocations(filterNewArrFromApi(newListLocation, 'locationId', db.locations));
          const newListAuthors= db.paintings.filter((paint) => paint[firstParam] == searchData[firstParam]);
          setListAuthors(filterNewArrFromApi(newListAuthors, 'authorId', db.authors));
        }
        break;
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
    getDataFromApi();
  }, []);

  React.useEffect(() => {
    localStorage.setItem('app-theme', theme);
    document.documentElement.setAttribute('app-theme', theme);
  }, [theme]);

  React.useEffect(() => {
    handlerValueSearchData();
  }, [reqParamSearch]);

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
