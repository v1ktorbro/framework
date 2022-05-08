import React from 'react';
import { CurrentThemeContext } from '../../context/CurrentThemeContext';
import './BtnSwitchTheme.css';

function BtnSwitchTheme ({ setTheme }) {
  const theme = React.useContext(CurrentThemeContext);

  const handleThemeClick = () => {
    const handlerTheme = (theme === 'day' ? 'naight' : 'day');
    setTheme(handlerTheme);
  };

  return (
    <button 
      type='button' 
      className={`btn-switch-theme btn-switch-theme_${theme}`} 
      onClick={handleThemeClick}
      />
  );
}

export default BtnSwitchTheme;