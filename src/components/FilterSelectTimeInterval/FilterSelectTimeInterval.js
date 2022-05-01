import './FilterSelectTimeInterval.css';
import React from 'react';
import BtnResetCross from '../BtnResetCross/BtnResetCross';
import BtnSwitchBlind from '../BtnSwitchBlind/BtnSwitchBlind';

function FilterSelectTimeInterval({theme, nameFilter}) {
  const [selectValue, setSelectValue] = React.useState('');
  const [isOpenTimeInterval, setIsOpenTimeInterval] = React.useState(false);
  const [isFocus, setIsFocus] = React.useState(false);

  const toggleOpenTimeInterval = () => {
    setIsOpenTimeInterval(prev => !prev);
    setIsFocus(prev => !prev);
  };

  const handlerReset = () => {
    console.log('reset');
  };

  return (
    <nav className={`filter-select-time-interval filter-select-time-interval_${theme}`}>
      <div className={`filter-select-time-interval__container`}>
        <input 
            className='filter-select-time-interval__input-view-selected-text' 
            value={selectValue}
            disabled 
            placeholder={nameFilter} 
          />
          <div className='filter-select-time-interval__btn-container'>
            <BtnResetCross 
              theme={theme}
              onClick={handlerReset}
            />
            <BtnSwitchBlind 
              theme={theme}
              isOpen={isOpenTimeInterval}
              onClick={toggleOpenTimeInterval}
            />
          </div>
      </div>
      <div className={`filter-select-time-interval__form-data ${isOpenTimeInterval && 'filter-select-time-interval__form-data_open'}`}>
        <div className='filter-select-time-interval__form-data-container'>
          <input 
            className={`filter-select-time-interval__input-date filter-select-time-interval__input-date_${theme} filter-select-time-interval__input-date_from`} 
            placeholder='from'
            type='number' 
          />
          <span className='filter-select-time-interval__dash-sigh'>&mdash;</span>
          <input 
            className={`filter-select-time-interval__input-date filter-select-time-interval__input-date_${theme} filter-select-time-interval__input-date_before`} 
            placeholder='before'  
            type='number' 
            />
        </div>
      </div>
    </nav>
  );
}

export default FilterSelectTimeInterval;