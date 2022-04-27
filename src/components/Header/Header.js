import './Header.css';
import React from 'react';
import logo from '../../images/logo.svg';
import BtnSwitchTheme from '../BtnSwitchTheme/BtnSwitchTheme';

function Header ({ theme, setTheme }) {
  return (
    <header className={`header header_theme-${theme}`}>
      <img className='header__logo' src={logo} />
      <BtnSwitchTheme 
        theme={theme}
        setTheme={setTheme}
      />
    </header>
  );
}

export default Header;