import React from "react";
import './BtnSwitchBlind.css';

function BtnSwitchBlind ({theme, onClick, isOpen}) {
  return (
    <button 
      type='button' 
      onClick={onClick} 
      className={`btn-switch-blind btn-switch-blind_${theme} ${isOpen ? 'btn-switch-blind_open' : 'btn-switch-blind_close'}`} 
    />
  );
}

export default BtnSwitchBlind;