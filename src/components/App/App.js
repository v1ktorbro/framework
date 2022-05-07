import './App.css';
import React from 'react';
import initialComments from '../../utils/initialComments';
import Header from '../Header/Header';
import Main from '../Main/Main';
import api from '../../utils/Api';

function App() {
  // цвет темы подтягивается из настроек ОС и сохраняется в localStorage
  const isNightTheme = window?.matchMedia('(prefers-color-scheme: dark)').matches;
  const defaultTheme = isNightTheme ? 'night' : 'day';
  const [theme, setTheme] = React.useState(localStorage.getItem('app-theme') || defaultTheme);
  const [initialData, setInitialData] = React.useState(initialComments);
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
    Promise.all([api.getListPaintings(), api.getListAuthors(), api.getListLocations()]).then(([listPaintings, listAuthors, listLocations]) => {
      console.log(listPaintings);
      console.log(listAuthors);
      console.log(listLocations);
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
        data={initialData}
        handlerSetValueParamSearch={handlerSetValueParamSearch}
      />
    </>
  );
}

export default App;
