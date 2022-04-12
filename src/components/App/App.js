import './App.css';
import { useEffect, useState } from 'react';
import initialComments from '../../utils/initialComments';
import Header from '../Header/Header';
import Main from '../Main/Main';

function App() {
  // цвет темы подтягивается из настроек ОС и сохраняется в localStorage
  const isNightTheme = window?.matchMedia('(prefers-color-scheme: dark)').matches;
  const defaultTheme = isNightTheme ? 'night' : 'day';
  const [theme, setTheme] = useState(localStorage.getItem('app-theme') || defaultTheme);
  const [initialComment, setInitialComment] = useState(initialComments);
  
  useEffect(() => {
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
        data={initialComment}
      />
    </>
  );
}

export default App;
