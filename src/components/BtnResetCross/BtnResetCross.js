import './BtnResetCross.css';
import React from 'react';
import { CurrentThemeContext } from '../../context/CurrentThemeContext';

function BtnResetCross({ style, onClick }) {
  const theme = React.useContext(CurrentThemeContext);
  return (
    <button 
      className={`btn-reset-cross btn-reset-cross_theme-${theme}`} 
      style={style} 
      onClick={onClick}
      type='reset'
    />
  );
}

export default BtnResetCross;