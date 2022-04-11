import { useEffect } from 'react';
import './BtnSwitchTheme.css';

function BtnSwitchTheme ({ theme, setTheme }) {
  
  const handleThemeClick = () => {
    const handlerTheme = (theme === 'day' ? 'naight' : 'day');
    setTheme(handlerTheme);
  };

  useEffect(() => {
    localStorage.setItem('app-theme', theme);
  }, [theme]);

  return (
    <button 
      type='button' 
      className={`btn-switch-theme btn-switch-theme_${theme}`} 
      onClick={handleThemeClick}
      />
  );
}

export default BtnSwitchTheme;