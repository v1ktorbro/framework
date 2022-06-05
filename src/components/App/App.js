import './App.css';
import React from 'react';
import { CurrentThemeContext, defaultTheme } from '../../context/CurrentThemeContext';
import { CurrentDataContext } from '../../context/CurrentDataContext';
import Header from '../Header/Header';
import Main from '../Main/Main';
import api from '../../utils/Api';
import searchController from '../HandlerSearch/HandlerSearch';

function App() {
  // по умолчанию, цвет темы подтягивается из настроек ОС и сохраняется в localStorage
  const [theme, setTheme] = React.useState(localStorage.getItem('app-theme') || defaultTheme);
  const [db, setDb] = React.useState([]);
  const [listPaintings, setListPaintings] = React.useState([]);
  const [listAuthors, setListAuthors] = React.useState([]);
  const [listLocations, setListLocations] = React.useState([]);
  const [viewPaintsOnScreenFromPaginator, setViewPaintsOnScreenFromPaginator] = React.useState([]);
  const [searchData, setSearchData] = React.useState({
    name: '',
    authorId: '',
    locationId: '',
    created: {from: '', before: ''},
  });
  const [isLoading, setIsLoading] = React.useState(false);
  //количество элементов, которые будут вырезаны в пагинации для отображения
  const [countItemOfListViewUser] = React.useState(12);

  //при любом изменении значении полей данные кидаются в searchController
  //при помощи метода handlerReqParamSearch, который исполняется в handlerSetValueParamSearch
  //получение callBack с новым массивом происходит в getUpdatedListData
  const useSearch =  searchController(searchData, db, getUpdatedListData);
  
  const handlerSetValueParamSearch = (keyName, value) => {
    setSearchData({...searchData, [keyName]: value});
    useSearch.handlerReqParamSearch(keyName, value);
  };

  const getInitialData = () => {
    setIsLoading(true);
    api.getAllData().then((res) => {
      setDb(res);
      setIsLoading(false);
      useSearch.setInitialData(res);
    }).catch((err) => {
      return console.log('Ошибка при получении данных с сервера:', err);
    });
  };

  function getUpdatedListData(newListArr, nameList) {
    nameList == 'listPaintings' && setListPaintings(newListArr);
    nameList == 'listAuthors' && setListAuthors(newListArr);
    nameList == 'listLocations' && setListLocations(newListArr);
  }

  const handlerPaginateList = (currentPaintsList) => {
    setViewPaintsOnScreenFromPaginator(currentPaintsList());
  };

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
      <CurrentDataContext.Provider value={db}>
        <Header 
          setTheme={setTheme}
        />
        <Main
          viewPaintsOnScreenFromPaginator={viewPaintsOnScreenFromPaginator}
          handlerPaginateList={handlerPaginateList}
          isLoading={isLoading}
          countItemOfListViewUser={countItemOfListViewUser}
          listPaintings={listPaintings}
          listAuthors={listAuthors}
          listLocations={listLocations}
          handlerSetValueParamSearch={handlerSetValueParamSearch}
        />
      </CurrentDataContext.Provider>
      </CurrentThemeContext.Provider>
    </>
  );
}

export default App;