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
    console.log('сюды епта2222');
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
        break;/* 
      default:
        console.log('сюды епта');
        setInitialData();
        break; */
    }
  };


  const handlerValueSearchData = (value) => {
    if (reqParamSearch.length == 1) {
      searchByOneParametr(reqParamSearch[0]);
    } else if (reqParamSearch.length == 2) {
      reqParamSearch.reduce((prevValue, currentValue, index) => {
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

  const searchByNamePicture = (namePicture) => {
    if (searchData.authorId.length) {
      //console.log('И ТУТА!!!222');
      /* const newListPaintings = listPaintings.filter((paint) => paint.name == namePicture);
      if (newListPaintings.length) {
        setListPaintings(newListPaintings);
        setListLocations(filterNewArrFromApi(newListPaintings, 'locationId', db.locations));
      } else { 
        searchByAthorId(searchData.authorId);
      } */
    }
  };

  const searchByAthorId = (authorId) => {
    if (searchData.name.length) {
      console.log('И ТУТА!!!');
      const newListPaintings = listPaintings.filter((paint) => paint.authorId == authorId);
      if (newListPaintings.length) {
        setListPaintings(newListPaintings);
        setListLocations(filterNewArrFromApi(newListPaintings, 'locationId', db.locations));
      } else {
        searchByNamePicture(searchData.name);
      }
    } else if (searchData.locationId.length) {
        if (authorId.length) {
          const newListPaintings = listPaintings.filter((paint) => paint.locationId == searchData.locationId && paint.authorId == authorId);
          const newListLocation = db.paintings.filter((paint) => paint.authorId == searchData.authorId);
          setListPaintings(newListPaintings);
          setListLocations(filterNewArrFromApi(newListLocation, 'locationId', db.locations));
        } else {
          searchByLocationId(searchData.locationId);
        }
    }
  };
  

  const searchByLocationId = (locationId) => {
    if (searchData.authorId.length) {
      if (locationId.length) {
        const newListPaintings = db.paintings.filter((paint) => paint.locationId == locationId && paint.authorId == searchData.authorId);
        const newListAuthors = db.paintings.filter((paint) => paint.locationId == searchData.locationId);
        setListPaintings(newListPaintings);
        setListAuthors(filterNewArrFromApi(newListAuthors, 'authorId', db.authors));
      } else {
        searchByAthorId(searchData.authorId);
      }
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

 /*  React.useEffect(() => {
    Object.keys(db).length && searchByNamePicture(searchData.name);
  }, [searchData.name]);

  React.useEffect(() => {
    Object.keys(db).length && searchByAthorId(searchData.authorId);
  }, [searchData.authorId]);

  React.useEffect(() => {
    Object.keys(db).length && searchByLocationId(searchData.locationId);
  }, [searchData.locationId]); */

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
