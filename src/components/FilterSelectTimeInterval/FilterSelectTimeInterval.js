import './FilterSelectTimeInterval.css';
import React from 'react';
import { CurrentThemeContext } from '../../context/CurrentThemeContext';
import { CurrentDataSearchContext } from '../../context/CurrentDataSearchContext';
import BtnResetCross from '../BtnResetCross/BtnResetCross';
import BtnSwitchBlind from '../BtnSwitchBlind/BtnSwitchBlind';
import { borderStyleHandlerThemeForFilter } from '../../utils/utils';
import { useInput } from '../FormValidator/FormValidator';

function FilterSelectTimeInterval({ nameFilter, handlerSetValueParamSearch }) {
  const theme = React.useContext(CurrentThemeContext);
  const searchData = React.useContext(CurrentDataSearchContext);
  const [inputsValue, setInputsValue] = React.useState({from: '', before: ''});
  const [isOpenTimeInterval, setIsOpenTimeInterval] = React.useState(false);
  const [isFocus, setIsFocus] = React.useState(false);
  const inputTimeFromValidator = useInput('', {isEmpty: true, onlyNumber: true, minLength: 4});
  const inputTimeBeforeValidator = useInput('', {isEmpty: true, onlyNumber: true, minLength: 4});

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

  const onSubmit = () => {
    handlerSetValueParamSearch(nameFilter.toLowerCase(), inputsValue);
    setIsOpenTimeInterval(false);
    setIsFocus(false);
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
    handlerSetValueParamSearch(nameFilter.toLowerCase(), ({from: '', before: ''}));
    inputTimeFromValidator.onReset();
    inputTimeBeforeValidator.onReset();
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

  React.useEffect(() => {
    //  производить поиск, только если оба поля заполнены и в них по 4 значения
    if (inputsValue.from.length == 4 && inputsValue.before.length == 4) {
      onSubmit()
    } else {
      //  сюда добавить логику отображения компонента с тем, что необхоимо ввести все данные
      //console.log('Чтобы отправить запрос, заполните все поля формы created, пожалуйста!', 'значение поля from', inputsValue.from , 'значение поля before', inputsValue.before);
    }
  }, [inputTimeFromValidator.inputValid && inputTimeBeforeValidator.inputValid]);

  React.useEffect(() => {
    setInputsValue({from: searchData.created.from, before: searchData.created.before});
  }, [searchData.created.from, searchData.created.before]);
  
  return (
    <nav 
      className={`filter-select-time-interval filter-select-time-interval_${theme}`}
      tabIndex='0'
      onClick={() => setIsFocus(true)}
      onKeyDown={escBtnListener}
      id={`filter-select-time-${nameFilter.toLowerCase()}`}
    >
      <div className={`filter-select-time-interval__container filter-select-time-interval__container_theme-${theme} ${isFocus && `filter-select-time-interval__container_focus-theme-${theme}`}`}>
        <input
          className='filter-select-time-interval__input-view-selected-text'
          value={(inputsValue.from.length || inputsValue.before.length) ? `${inputsValue.from} — ${inputsValue.before}` : ''}
          readOnly
          onChange={() => console.log('да бля')}
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
            style={{marginLeft: '10px'}}
          />
        </div>
      </div>
      <form className={`filter-select-time-interval__form-data filter-select-time-interval__form-data_theme-${theme}  ${isOpenTimeInterval && 'filter-select-time-interval__form-data_open'}`}>
        <div className='filter-select-time-interval__form-data-container'>
          <div className='filter-select-time-interval__input-date-wrapper'>
            <input 
              className={`filter-select-time-interval__input-date filter-select-time-interval__input-date_theme-${theme} filter-select-time-interval__input-date_from`}
              onChange={handlerValueInputs}
              placeholder='from'
              id='from'
              value={inputsValue.from || ''}
              maxLength='4'
              onFocus={inputTimeFromValidator.onFocus}
              onBlur={inputTimeFromValidator.onBlur}
            />
            <ul className='filter-select-time-interval__error-list'>
              {inputTimeFromValidator.onlyNumberError.state && <li className={`filter-select-time-interval__error-item-list`}>{inputTimeFromValidator.onlyNumberError.errorMessage}</li>}
              {(inputTimeFromValidator.isBlur && inputTimeFromValidator.isEmpty.state) && <li className={`filter-select-time-interval__error-item-list`}>{inputTimeFromValidator.isEmpty.errorMessage}</li>}
              {(inputTimeFromValidator.isFocus && inputTimeFromValidator.minLengthError.state) && <li className={`filter-select-time-interval__error-item-list`}>{inputTimeFromValidator.minLengthError.errorMessage}</li>}
            </ul>
          </div>
          <span className={`filter-select-time-interval__dash-sigh filter-select-time-interval__dash-sigh_theme-${theme}`}>&mdash;</span>
          <div className='filter-select-time-interval__input-date-wrapper'>
            <input 
              className={`filter-select-time-interval__input-date filter-select-time-interval__input-date_theme-${theme} filter-select-time-interval__input-date_before`}
              onChange={handlerValueInputs}
              placeholder='before'  
              id='before'
              value={inputsValue.before || ''}
              maxLength='4'
              onFocus={inputTimeBeforeValidator.onFocus}
              onBlur={inputTimeBeforeValidator.onBlur}
            />
            <ul className='filter-select-time-interval__error-list'>
              {inputTimeBeforeValidator.onlyNumberError.state && <li className={`filter-select-time-interval__error-item-list`}>{inputTimeBeforeValidator.onlyNumberError.errorMessage}</li>}
              {(inputTimeBeforeValidator.isBlur && inputTimeBeforeValidator.isEmpty.state) && <li className={`filter-select-time-interval__error-item-list`}>{inputTimeBeforeValidator.isEmpty.errorMessage}</li>}
              {(inputTimeBeforeValidator.isFocus && inputTimeBeforeValidator.minLengthError.state) && <li className={`filter-select-time-interval__error-item-list`}>{inputTimeBeforeValidator.minLengthError.errorMessage}</li>}
            </ul>
          </div>
        </div>
      </form>
    </nav>
  );
}

export default FilterSelectTimeInterval;