import './PageNotFound.css';
import { Link } from 'react-router-dom';
import React from 'react';
import { CurrentThemeContext } from '../../context/CurrentThemeContext';

function PageNotFound({param}) {
  const theme = React.useContext(CurrentThemeContext);
  return (
    <section className={`page-not-found page-not-found_theme-${theme}`}>
      <div className='page-not-found__container'>
        <h2 className='page-not-found__title'>{param.title}</h2>
        <p className='page-not-found__description'>{param.description}</p>
        <Link to='/' className='page-not-found__btn-main-page'>Main page</Link>
      </div>
      <h1 className='page-not-found__status-code'>{param.statusCode}</h1>
    </section>
  );
}

export default PageNotFound;