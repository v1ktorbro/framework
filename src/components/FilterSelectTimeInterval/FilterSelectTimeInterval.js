import './FilterSelectTimeInterval.css';
import React from 'react';
import BtnResetCross from '../BtnResetCross/BtnResetCross';
import BtnSwitchBlind from '../BtnSwitchBlind/BtnSwitchBlind';
import { borderStyleHandlerThemeForFilter } from '../../utils/utils';

function FilterSelectTimeInterval({theme, nameFilter}) {
  const [inputsValue, setInputsValue] = React.useState({from: '', before: ''});
  const [isOpenTimeInterval, setIsOpenTimeInterval] = React.useState(false);
  const [isFocus, setIsFocus] = React.useState(false);

  const toggleOpenTimeInterval = () => {
    setIsOpenTimeInterval(prev => !prev);
    setIsFocus(prev => !prev);
  };
  
  const handlerValueInputs = (evt) => {
    const {id} = evt.target;
    const {value} = evt.target;
    if (id === 'from') {
      setInputsValue({...inputsValue, from: value});
    } else {
      setInputsValue({...inputsValue, before: value});
    }
  };

  const onBlur = (evt) => {
    const thisComponent = document.getElementById(`filter-select-time-${nameFilter.toLowerCase()}`);
    const isClickInsideComponent = thisComponent.contains(evt.target);
    if (!isClickInsideComponent) {
      setIsOpenTimeInterval(false);
      setIsFocus(false);
    }
  };

  const escBtnListener = (evt) => {
    if (evt.key === 'Escape' || evt.keyCode === 27) {
      setIsFocus(false);
      setIsOpenTimeInterval(false);
    }
  };

  const handlerReset = () => {
    setInputsValue({from: '', before: ''});
    setIsOpenTimeInterval(false);
    setIsFocus(false);
  };

  React.useEffect(() => {
    const filterContainer = document.getElementById(`filter-select-time-${nameFilter.toLowerCase()}`).querySelector('.filter-select-time-interval__container');
    borderStyleHandlerThemeForFilter(filterContainer, theme, isOpenTimeInterval, isFocus);
  }, [isOpenTimeInterval, isFocus, theme]);

  React.useEffect(() => {
    document.addEventListener('click', onBlur);
    return () => document.removeEventListener('click', onBlur);
  }, [isFocus]);

  return (
    <nav 
      className={`filter-select-time-interval filter-select-time-interval_${theme}`}
      tabIndex='0'
      onClick={() => setIsFocus(true)}
      onKeyDown={escBtnListener}
      id={`filter-select-time-${nameFilter.toLowerCase()}`}
    >
      <div className={`filter-select-time-interval__container filter-select-time-interval__container_${theme} ${isFocus && `filter-select-time-interval__container_focus-${theme}`}`}>
        <input 
            className='filter-select-time-interval__input-view-selected-text'
            value={(inputsValue.from || inputsValue.before) &&`${inputsValue.from} — ${inputsValue.before}`}
            disabled 
            placeholder={nameFilter} 
          />
          <div className='filter-select-time-interval__btn-container'>
            { (inputsValue.from || inputsValue.before) &&
              <BtnResetCross 
                theme={theme}
                onClick={handlerReset}
              />
            }
            <BtnSwitchBlind 
              theme={theme}
              isOpen={isOpenTimeInterval}
              onClick={toggleOpenTimeInterval}
            />
          </div>
      </div>
      <div className={`filter-select-time-interval__form-data filter-select-time-interval__form-data_${theme}  ${isOpenTimeInterval && 'filter-select-time-interval__form-data_open'}`}>
        <div className='filter-select-time-interval__form-data-container'>
          <input 
            className={`filter-select-time-interval__input-date filter-select-time-interval__input-date_${theme} filter-select-time-interval__input-date_from`}
            onChange={handlerValueInputs}
            placeholder='from'
            id='from'
            value={inputsValue.from}
            type='number'
          />
          <span className='filter-select-time-interval__dash-sigh'>&mdash;</span>
          <input 
            className={`filter-select-time-interval__input-date filter-select-time-interval__input-date_${theme} filter-select-time-interval__input-date_before`}
            onChange={handlerValueInputs}
            placeholder='before'  
            id='before'
            value={inputsValue.before}
            type='number'
            />
        </div>
      </div>
    </nav>
  );
}

export default FilterSelectTimeInterval;