import './Pagination.css';
import React from 'react';
import { CurrentThemeContext } from '../../context/CurrentThemeContext';

function Pagination() {
  const theme = React.useContext(CurrentThemeContext);

  return (
    <ul className={`pagination pagination_theme-${theme}`}>
      {[...Array(7)].map((elem, index) => {
        return (
          <li 
            className='pagination__item pagination__item_active'
            key={index}>
            <a className='pagination__text-item'>{index}</a>
          </li>
        );
      })}
    </ul>
  );
}

export default Pagination;