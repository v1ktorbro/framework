import './App.css';
import React from 'react';
import initialComments from '../../utils/initialComments';
import Header from '../Header/Header';
import Main from '../Main/Main';

function App() {
  // цвет темы подтягивается из настроек ОС и сохраняется в localStorage
  const isNightTheme = window?.matchMedia('(prefers-color-scheme: dark)').matches;
  const defaultTheme = isNightTheme ? 'night' : 'day';
  const [theme, setTheme] = React.useState(localStorage.getItem('app-theme') || defaultTheme);
  const [initialData, setInitialData] = React.useState(initialComments);
  const [searchData, setSearchData] = React.useState({
    namePicture: '',
    nameAuthor: '',
    location: '',
    created: {from: '', before: ''},
  });
  
  const handlerSelectNamePicture = (namePicture) => {
    setSearchData({...searchData, namePicture: namePicture});
  };

  const handlerSelectListNameAuthor = (nameAuthor) => {
    setSearchData({...searchData, nameAuthor: nameAuthor});
  };

  const handlerSelectListLocation = (location) => {
    setSearchData({...searchData, location: location});
  };

  const handlerSearchTimeInterval = (inputsValue) => {
    setSearchData({...searchData, created: inputsValue});
  };

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
        handlerSelectNamePicture={handlerSelectNamePicture}
        handlerSelectListNameAuthor={handlerSelectListNameAuthor}
        handlerSelectListLocation={handlerSelectListLocation}
        handlerSearchTimeInterval={handlerSearchTimeInterval}
      />
    </>
  );
}

export default App;
