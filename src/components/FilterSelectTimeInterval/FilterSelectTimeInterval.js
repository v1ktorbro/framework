import './FilterSelectTimeInterval.css';
import React from 'react';
import BtnResetCross from '../BtnResetCross/BtnResetCross';
import BtnSwitchBlind from '../BtnSwitchBlind/BtnSwitchBlind';
import { borderStyleHandlerThemeForFilter } from '../../utils/utils';
import { useInput } from '../FormValidator/FormValidator';

function FilterSelectTimeInterval({theme, nameFilter}) {
  const [inputsValue, setInputsValue] = React.useState({from: '', before: ''});
  const [isOpenTimeInterval, setIsOpenTimeInterval] = React.useState(true);
  const [isFocus, setIsFocus] = React.useState(false);
  const inputTimeFromValidator = useInput('', {isEmpty: true, minLength: 4, maxLength: 4});
  const inputTimeBeforeValidator = useInput('', {isEmpty: true, minLength: 4, maxLength: 4});

  const toggleOpenTimeInterval = () => {
    setIsOpenTimeInterval(prev => !prev);
    setIsFocus(prev => !prev);
  };
  
  const handlerValueInputs = (evt) => {
    const {id} = evt.target;
    const {value} = evt.target;
    if (id === 'from') {
      inputTimeFromValidator.onChange(evt);
      setInputsValue({...inputsValue, from: value});
    } else {
      inputTimeBeforeValidator.onChange(evt);
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
          <div className='filter-select-time-interval__input-date-wrapper'>
            <input 
              className={`filter-select-time-interval__input-date filter-select-time-interval__input-date_${theme} filter-select-time-interval__input-date_from`}
              onChange={handlerValueInputs}
              placeholder='from'
              id='from'
              value={inputsValue.from}
              type='number'
              onFocus={inputTimeFromValidator.onFocus}
              onBlur={inputTimeFromValidator.onBlur}
            />
            <ul className='filter-select-time-interval__error-list'>
              {(inputTimeFromValidator.isBlur && inputTimeFromValidator.isEmpty) && <li className={`filter-select-time-interval__item-list`}>Поле не может быть пустым</li>}
              {(inputTimeFromValidator.isFocus && inputTimeFromValidator.minLengthError) && <li className={`filter-select-time-interval__item-list`}>Минимальная длина 4 символа</li>}
              {(inputTimeFromValidator.maxLengthError) && <li className={`filter-select-time-interval__item-list`}>Максимальная длина 4 символа</li>}
            </ul>
          </div>
          <span className='filter-select-time-interval__dash-sigh'>&mdash;</span>
          <div className='filter-select-time-interval__input-date-wrapper'>
            <input 
              className={`filter-select-time-interval__input-date filter-select-time-interval__input-date_${theme} filter-select-time-interval__input-date_before`}
              onChange={handlerValueInputs}
              placeholder='before'  
              id='before'
              value={inputsValue.before}
              type='number'
              onFocus={inputTimeBeforeValidator.onFocus}
              onBlur={inputTimeBeforeValidator.onBlur}
            />
            <ul className='filter-select-time-interval__error-list'>
              {(inputTimeBeforeValidator.isBlur && inputTimeBeforeValidator.isEmpty) && <li className={`filter-select-time-interval__item-list`}>Поле не может быть пустым</li>}
              {(inputTimeBeforeValidator.isFocus && inputTimeBeforeValidator.minLengthError) && <li className={`filter-select-time-interval__item-list`}>Минимальная длина 4 символа</li>}
              {(inputTimeBeforeValidator.maxLengthError) && <li className={`filter-select-time-interval__item-list`}>Максимальная длина 4 символа</li>}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default FilterSelectTimeInterval;