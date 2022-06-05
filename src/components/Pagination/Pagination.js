import './Pagination.css';
import React from 'react';
import { CurrentThemeContext } from '../../context/CurrentThemeContext';

function Pagination({ countItemOfListViewUser, totalPaints, db, handlerPaginateList}) {
  const theme = React.useContext(CurrentThemeContext);
  const [currentPage, setCurrentPage] = React.useState(1);
  const lastPaintsListIndex = currentPage * countItemOfListViewUser;
  const firstPaintsListIndex = lastPaintsListIndex - countItemOfListViewUser;
  
  const currentPaintsList = () => db.slice(firstPaintsListIndex, lastPaintsListIndex);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const nextPage = () => setCurrentPage(prev => prev + 1);

  const prevPage = () => setCurrentPage(prev => prev - 1);

  const pageNumbers = [];

  for (let i = 1; i<= Math.ceil(totalPaints / countItemOfListViewUser); i++) {
    pageNumbers.push(i);
  }

  React.useEffect(() => {
  db.length && handlerPaginateList(currentPaintsList);
  }, [currentPage, db.length]);

  return (
    <ul className={`pagination pagination_theme_${theme}`}>
    <button type='button' disabled className={`pagination__btn pagination__btn-duble-arrow pagination__btn-duble-arrow_theme_${theme} pagination__btn-duble-arrow_prev`} />
    <button type='button' onClick={prevPage} className={`pagination__btn pagination__btn-single-arrow pagination__btn-single-arrow_theme_${theme} pagination__btn-single-arrow_prev`} />
      {pageNumbers.map((number) => (
          <li 
            className={`pagination__item ${currentPage == number && `pagination__item_active_theme_${theme}` }`}
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