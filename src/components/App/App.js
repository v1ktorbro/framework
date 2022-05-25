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

  const getInitialData = () => {
    api.getAllData().then((res) => {
      setDb(res);
      setInitialData(res);
    }).catch((err) => {
      return console.log('Ошибка при получении данных с сервера:', err);
    });
  };

  const setInitialData = (initialDataBase) => {
    setListPaintings(initialDataBase.paintings);
    setListAuthors(initialDataBase.authors);
    setListLocations(initialDataBase.locations);
  };

  const searchByOneParametr = (valueField) => {
    const newList = (arrList, reqParamSearch) => arrList.filter((itemList) => itemList[reqParamSearch] == searchData[reqParamSearch]);
    const newListPaintings = newList(db.paintings, valueField);
    switch (valueField) {
      case 'name':
        setListPaintings(newListPaintings);
        setListAuthors(filterNewArrFromApi(newListPaintings, 'authorId', db.authors));
        setListLocations(filterNewArrFromApi(newListPaintings, 'locationId', db.locations));
        break;
      case 'authorId':
        setListPaintings(newListPaintings);
        setListLocations(filterNewArrFromApi(newListPaintings, 'locationId', db.locations));
        setListAuthors(db.authors);
        break;
      case 'locationId':
        setListPaintings(newListPaintings);
        setListAuthors(filterNewArrFromApi(newListPaintings, 'authorId', db.authors));
        setListLocations(db.locations);
        break;
    }
  };


  const handlerValueSearchData = () => {
    if (!reqParamSearch.length) {
      Object.keys(db).length && setInitialData(db);
    } else if (reqParamSearch.length == 1) {
        searchByOneParametr(reqParamSearch[0]);
    } else if (reqParamSearch.length == 2) {
        reqParamSearch.reduce((prevValue, currentValue) => {
          searchByTwoParameters(prevValue, currentValue);
        });
    } else if (reqParamSearch.length == 3) {
      reqParamSearch.reduce((prevValue, currentValue) => {
        if (currentValue == reqParamSearch[reqParamSearch.length - 1]) {
          prevValue = reqParamSearch[reqParamSearch.length - 2];
          searchByTwoParameters(prevValue, currentValue);
        }
      });
    }
  };

  const searchByTwoParameters = (firstValueField, secondValueField) => {
    const newList = (arrList, reqParamSearch) => arrList.filter((itemList) => itemList[reqParamSearch] == searchData[reqParamSearch]);
    const newListPaintings = newList(listPaintings, secondValueField);
    const newListLocations = filterNewArrFromApi(newListPaintings, 'locationId', db.locations);
    const newListAuthors = filterNewArrFromApi(newListPaintings, 'authorId', db.authors);
    switch (firstValueField) {
      case 'name':
        if (secondValueField == 'authorId') {
          setListPaintings(newListPaintings);
          setListLocations(newListLocations);
        }
        if (secondValueField == 'locationId') {
          setListPaintings(newListPaintings);
          setListLocations(newListLocations);
          setListAuthors(newListAuthors);
        }
        break;
      case 'authorId':
        if (secondValueField == 'name') {
          setListPaintings(newListPaintings);
          setListAuthors(newListAuthors);
          setListLocations(newListLocations);
        }
        if (secondValueField == 'locationId') {
          const newListAuthors = filterNewArrFromApi(newList(db.paintings, firstValueField), 'authorId', db.authors);
          setListPaintings(newListPaintings);
          setListAuthors(newListAuthors);
        }
        break;
      case 'locationId':
        if (secondValueField == 'name') {
          setListPaintings(newListPaintings);
          setListAuthors(newListAuthors);
          setListLocations(newListLocations);
        }
        if (secondValueField == 'authorId') {
          const newListAuthors = filterNewArrFromApi(newList(db.paintings, firstValueField), 'authorId', db.authors);
          const newListLocation = filterNewArrFromApi(newList(db.paintings, secondValueField), 'locationId', db.locations);
          setListPaintings(newListPaintings);
          setListAuthors(newListAuthors);
          setListLocations(newListLocation);
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
    handlerValueSearchData();
  }, [reqParamSearch]);

  React.useEffect(() => {
    localStorage.setItem('app-theme', theme);
    document.documentElement.setAttribute('app-theme', theme);
  }, [theme]);

  React.useEffect(() => {
    getInitialData();
  }, []);

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
