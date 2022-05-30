import './App.css';
import React from 'react';
import { CurrentThemeContext, defaultTheme } from '../../context/CurrentThemeContext';
import Header from '../Header/Header';
import Main from '../Main/Main';
import api from '../../utils/Api';
import  searchController from '../HandlerSearch/HandlerSearch';

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
  //при любом изменении значении полей данные кидаются в HandlerSearch
  //получение callBack с новым массивом происходит в getUpdatedListData
  searchController(searchData, reqParamSearch, db, getUpdatedListData);
  
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

  function getUpdatedListData(newListArr, nameList) {
    switch (nameList) {
      case 'listPaintings':
        setListPaintings(newListArr);
        break;
      case 'listAuthors':
        setListAuthors(newListArr);
        break;
      case 'listLocations':
        setListLocations(newListArr);
        break;
    }
  }

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
