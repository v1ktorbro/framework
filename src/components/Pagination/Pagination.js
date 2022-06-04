import './Pagination.css';
import React from 'react';
import { CurrentThemeContext } from '../../context/CurrentThemeContext';

function Pagination({ countItemOfListViewUser, totalPaints, paginate, nextPage, prevPage, }) {
  const theme = React.useContext(CurrentThemeContext);

  const pageNumbers = [];

  for (let i = 1; i<= Math.ceil(totalPaints / countItemOfListViewUser); i++) {
    pageNumbers.push(i);
  }

  return (
    <ul className={`pagination pagination_theme_${theme}`}>
    <button type='button' disabled className={`pagination__btn pagination__btn-duble-arrow pagination__btn-duble-arrow_theme_${theme} pagination__btn-duble-arrow_prev`} />
    <button type='button' onClick={prevPage} className={`pagination__btn pagination__btn-single-arrow pagination__btn-single-arrow_theme_${theme} pagination__btn-single-arrow_prev`} />
      {pageNumbers.map((number) => (
          <li 
            //className={`pagination__item ${index == 1 && `pagination__item_active_theme_${theme}`}`}
            className={`pagination__item`}
            onClick={() => paginate(number)}
            key={number}>
            <span className='pagination__text-item'>{number}</span>
          </li>
        )
      )}
    <button type='button' onClick={nextPage} className={`pagination__btn pagination__btn-single-arrow pagination__btn-single-arrow_theme_${theme} pagination__btn-single-arrow_next`} />
    <button type='button' disabled className={`pagination__btn pagination__btn-duble-arrow pagination__btn-duble-arrow_theme_${theme} pagination__btn-duble-arrow_next`} />
    </ul>
  );
}

export default Pagination;