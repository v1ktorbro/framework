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
    created: {from: '', to: ''},
  });
  
  const handlerInputSearchNamePicture = (inputValue) => {
    const filteredSearchAuthors = initialData.filter((elem) => {
      return elem.author.toLowerCase().includes(inputValue.toLowerCase());
    });
    if (inputValue.length > 0) {
      filteredSearchAuthors.length ? setInitialData(filteredSearchAuthors) : setInitialData(initialComments);
    }
    return filteredSearchAuthors;
  };

  const handlerSelectListNameAuthor = (nameAuthor) => {
    setSearchData({...searchData, nameAuthor: nameAuthor});
  };

  const handlerResetListNameAuthor = () => {
    setSearchData({...searchData, nameAuthor: ''});
  };

  const handlerSelectListLocation = (location) => {
    setSearchData({...searchData, location: location});
  }

  const handlerResetListLocation = () => {
    setSearchData({...searchData, location: ''});
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
        handlerInputSearchNamePicture={handlerInputSearchNamePicture}
        handlerSelectListNameAuthor={handlerSelectListNameAuthor}
        handlerResetListNameAuthor={handlerResetListNameAuthor}
        handlerSelectListLocation={handlerSelectListLocation}
        handlerResetListLocation={handlerResetListLocation}
      />
    </>
  );
}

export default App;
