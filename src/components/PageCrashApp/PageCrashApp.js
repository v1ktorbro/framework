import './PageCrashApp.css';
import React from 'react';
import { CurrentThemeContext } from '../../context/CurrentThemeContext';

function PageCrashApp({ param }) {
  const theme = React.useContext(CurrentThemeContext);

  const [textForComponent] = React.useState({
    title: 'Sorry',
    description: 'The site is down. Please, try again later, we will be back soon.'
  });

  return (
    <section className={`page-crash-app page-crash-app_theme-${theme}`}>
      <div className='page-crash-app__block-text'>
        <h1 className='page-crash-app__title'>{param.messageErrorTitle || textForComponent.title}</h1>
        <p className='page-crash-app__description'>{param.messageErrorDescription || textForComponent.description}</p>
      </div>
    </section>
  );
}

export default PageCrashApp;