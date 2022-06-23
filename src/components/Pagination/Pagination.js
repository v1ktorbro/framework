import './Pagination.css';
import React from 'react';
import { CurrentThemeContext } from '../../context/CurrentThemeContext';

function Pagination({ countItemOfListViewUser, arrWithData, handlerPaginateList}) {
  const theme = React.useContext(CurrentThemeContext);
  const totalPaints = arrWithData.length;
  const [currentPage, setCurrentPage] = React.useState(1);
  const lastPaintsListIndex = currentPage * countItemOfListViewUser;
  const firstPaintsListIndex = lastPaintsListIndex - countItemOfListViewUser;

  const currentPaintsList = () => arrWithData.slice(firstPaintsListIndex, lastPaintsListIndex);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const nextPage = () => setCurrentPage(prev => prev + 1);

  const prevPage = () => setCurrentPage(prev => prev - 1);

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPaints / countItemOfListViewUser); i++) {
    pageNumbers.push(i);
  }

  React.useEffect(() => {
  arrWithData.length && handlerPaginateList(currentPaintsList);
  }, [currentPage, arrWithData]);

  return (
    <ul className={`pagination pagination_theme-${theme}`}>
    <button type='button' onClick={(() => setCurrentPage(1))} disabled={currentPage == 1} className={`pagination__btn pagination__btn-duble-arrow pagination__btn-duble-arrow_theme-${theme} pagination__btn-duble-arrow_prev`} />
    <button type='button' onClick={prevPage} disabled={currentPage == 1} className={`pagination__btn pagination__btn-single-arrow pagination__btn-single-arrow_theme-${theme} pagination__btn-single-arrow_prev`} />
      {pageNumbers.map((number) => (
          <li 
            className={`pagination__item ${currentPage == number && `pagination__item_active-theme-${theme}`}`}
            onClick={() => paginate(number)}
            key={number}>
            <span className='pagination__text-item'>{number}</span>
          </li>
        )
      )}
    <button type='button' onClick={nextPage} disabled={currentPage == pageNumbers.length} className={`pagination__btn pagination__btn-single-arrow pagination__btn-single-arrow_theme-${theme} pagination__btn-single-arrow_next`} />
    <button type='button' onClick={(() => setCurrentPage(pageNumbers.length))} disabled={currentPage == pageNumbers.length} className={`pagination__btn pagination__btn-duble-arrow pagination__btn-duble-arrow_theme-${theme} pagination__btn-duble-arrow_next`} />
    </ul>
  );
}

export default Pagination;