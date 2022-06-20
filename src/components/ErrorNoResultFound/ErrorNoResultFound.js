import './ErrorNoResultFound.css';
import React from 'react';
import { CurrentThemeContext } from '../../context/CurrentThemeContext';

function ErrorNoResultFound({param}) {
  const theme = React.useContext(CurrentThemeContext);

  return (
    <section className={`error-no-result-found ${param.isOpen ? 'error-no-result-found_opened' : 'error-no-result-found_closed' } error-no-result-found_theme-${theme}`}>
      <div className='error-no-result-found__container'>
        <span className='error-no-result-found__image-error' />
        <h1 className='error-no-result-found__title'>{param.title}</h1>
        <p className='error-no-result-found__description'>{param.description}</p>
      </div>
    </section>
  );
}

export default ErrorNoResultFound;