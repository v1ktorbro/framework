import './App.css';
import React from 'react';
import Header from '../Header/Header';
import Main from '../Main/Main';
import api from '../../utils/Api';

function App() {
  // цвет темы подтягивается из настроек ОС и сохраняется в localStorage
  const isNightTheme = window?.matchMedia('(prefers-color-scheme: dark)').matches;
  const defaultTheme = isNightTheme ? 'night' : 'day';
  const [theme, setTheme] = React.useState(localStorage.getItem('app-theme') || defaultTheme);
  const [listPaintings, setListPaintings] = React.useState([]);
  const [listAuthors, setListAuthors] = React.useState([]);
  const [listLocations, setListLocations] = React.useState([]);
  const [searchData, setSearchData] = React.useState({
    name: '',
    author: '',
    location: '',
    created: {from: '', before: ''},
  });
  
  const handlerSetValueParamSearch = (keyName, value) => {
    setSearchData({...searchData, [keyName]: value});
  };

  const getDataFromApi = () => {
    Promise.all([api.getListPaintings(), api.getListAuthors(), api.getListLocations()]).then(([listPaintingsFromApi, listAuthorsFromApi, listLocationsFromApi]) => {
      setListPaintings(listPaintingsFromApi);
      setListAuthors(listAuthorsFromApi);
      setListLocations(listLocationsFromApi);
    }).catch((err) => {
      return console.log('Ошибка при получении данных с сервера:', err);
    });
  };

  React.useEffect(() => {
    getDataFromApi();
  }, []);

  React.useEffect(() => {
    localStorage.setItem('app-theme', theme);
    document.documentElement.setAttribute('app-theme', theme);
  }, [theme]);

  return (
    <>
      <Header 
        theme={theme}
        setTheme={setTheme}
      />
      <Main 
        theme={theme}
        listPaintings={listPaintings}
        listAuthors={listAuthors}
        listLocations={listLocations}
        handlerSetValueParamSearch={handlerSetValueParamSearch}
      />
    </>
  );
}

export default App;
