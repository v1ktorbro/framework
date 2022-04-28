import React from "react";
import './BtnSwitchBlind.css';

function BtnSwitchBlind ({theme, onClick}) {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleClick = (evt) => {
    setIsOpen(prev => !prev);
    onClick(evt);
  };

  return (
    <button 
      type='button' 
      onClick={(evt) => handleClick(evt)} 
      className={`btn-switch-blind btn-switch-blind_${theme} ${isOpen ? 'btn-switch-blind_open' : 'btn-switch-blind_close'}`} 
    />
  );
}

export default BtnSwitchBlind;