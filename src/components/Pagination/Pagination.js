import './Pagination.css';
import React from 'react';
import { CurrentThemeContext } from '../../context/CurrentThemeContext';

function Pagination() {
  const theme = React.useContext(CurrentThemeContext);

  return (
    <ul className={`pagination pagination_theme_${theme}`}>
    <button type='button' disabled className={`pagination__btn pagination__btn-duble-arrow pagination__btn-duble-arrow_theme_${theme} pagination__btn-duble-arrow_prev`} />
    <button type='button' disabled className={`pagination__btn pagination__btn-single-arrow pagination__btn-single-arrow_theme_${theme} pagination__btn-single-arrow_prev`} />
      {[...Array(3)].map((elem, index) => {
        return (
          <li 
            className={`pagination__item ${index == 1 && `pagination__item_active_theme_${theme}`}`}
            key={index}>
            <a className='pagination__text-item'>{index}</a>
          </li>
        );
      })}
    <button type='button' className={`pagination__btn pagination__btn-single-arrow pagination__btn-single-arrow_theme_${theme} pagination__btn-single-arrow_next`} />
    <button type='button' className={`pagination__btn pagination__btn-duble-arrow pagination__btn-duble-arrow_theme_${theme} pagination__btn-duble-arrow_next`} />
    </ul>
  );
}

export default Pagination;