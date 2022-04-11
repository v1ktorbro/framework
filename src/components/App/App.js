import './App.css';
import Header from '../Header/Header';
import NavSearch from '../NavSearch/NavSearch';
import { useEffect, useState } from 'react';

function App() {
  // цвет темы подтягивается из настроек ОС и сохраняется в localStorage
  const isNightTheme = window?.matchMedia('(prefers-color-scheme: dark)').matches;
  const defaultTheme = isNightTheme ? 'night' : 'day';
  const [theme, setTheme] = useState(localStorage.getItem('app-theme') || defaultTheme);

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
      <NavSearch />
    </>
  );
}

export default App;
