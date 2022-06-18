import './Preloader.css';
import React, { useContext } from 'react';
import { CurrentThemeContext } from '../../context/CurrentThemeContext';

function Preloader({ isOpen, isProcessSearch = true, messageCurrentProcessSearch='Loading...' }) {
  const theme = useContext(CurrentThemeContext);

  return (
    <div className={`preloader ${isOpen ? 'preloader_open' : 'preloader_closed'} preloader_theme-${theme}`} >
      <div className={isProcessSearch ? 'preloader__image-moving-circle' : 'preloader__image-error-result' }>
        <span className={isProcessSearch ? 'preloader__image-moving-ball' : 'preloader__image-error-result' } />
      </div>
      <span className={isProcessSearch ? 'preloader__description-process' : 'preloader__description-error-result'} > 
        {messageCurrentProcessSearch}
      </span>
    </div>
  );
}

export default Preloader;