import './Header.css';
import React from 'react';
import logo from '../../images/logo.svg';
import BtnSwitchTheme from '../BtnSwitchTheme/BtnSwitchTheme';

function Header () {
  return (
    <header className='header'>
      <img className='header__logo' src={logo} />
      <BtnSwitchTheme />
    </header>
  );
}

export default Header;