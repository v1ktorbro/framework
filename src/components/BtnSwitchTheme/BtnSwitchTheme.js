import { useEffect, useState } from 'react';
import './BtnSwitchTheme.css';

function BtnSwitchTheme () {
  const [theme, setTheme] = useState(localStorage.getItem('app-theme') || 'dark');
  
  const handleThemeClick = () => {
    const btnThemeChecker = document.querySelector('.btn-switch-theme__checker');
    btnThemeChecker.checked ? setTheme('light') : setTheme('dark');
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('app-theme', theme);
  }, [theme]);

  return (
    <label className='btn-switch-theme' >
      <input 
        type='checkbox' 
        defaultChecked={localStorage.getItem('app-theme') === 'light'} 
        onClick={handleThemeClick} 
        className='btn-switch-theme__checker' 
      />
      <span className='btn-switch-theme__image' />
    </label>
  );
}

export default BtnSwitchTheme;