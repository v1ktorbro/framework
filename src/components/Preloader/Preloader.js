import './Preloader.css';
import React, { useContext } from 'react';
import { CurrentThemeContext } from '../../context/CurrentThemeContext';

function Preloader({ preloaderParam }) {
  const theme = useContext(CurrentThemeContext);
  const [param, setParam] = React.useState({isLoading: false, messageProcess: ''});

  React.useEffect(() => {
    setParam(preloaderParam);
  }, [preloaderParam]);

  return (
    <>
      <div className={`preloader ${param.isLoading ? 'preloader_open' : 'preloader_closed'} preloader_theme-${theme}`} >
        <div className={`preloader__image-moving-circle preloader__image-moving-circle_theme-${theme}`} >
          <span className={`preloader__image-moving-ball preloader__image-moving-ball_theme-${theme}`} />
        </div>
        <span className={'preloader__description-process'}>{param.messageProcess}</span>
      </div>
    </>
  );
}

export default Preloader;