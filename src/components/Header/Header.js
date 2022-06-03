import './Header.css';
import React from 'react';
import logo from '../../images/logo.svg';
import BtnSwitchTheme from '../BtnSwitchTheme/BtnSwitchTheme';

function Header ({ setTheme }) {
  return (
    <header className='header'>
      <img className='header__logo' src={logo} />
      <BtnSwitchTheme 
        setTheme={setTheme}
      />
    </header>
  );
}

export default Header;