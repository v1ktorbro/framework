import React from "react";
import './BtnSwitchBlind.css';
import { CurrentThemeContext } from '../../context/CurrentThemeContext';

function BtnSwitchBlind ({ onClick, isOpen, style }) {
  const theme = React.useContext(CurrentThemeContext);
  
  return (
    <button 
      type='button' 
      onClick={onClick} 
      className={`btn-switch-blind btn-switch-blind_theme-${theme} ${isOpen ? 'btn-switch-blind_open' : 'btn-switch-blind_close'}`}
      style={style}
    />
  );
}

export default BtnSwitchBlind;