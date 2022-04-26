import './SearchByString.css';
import React from 'react';
import BtnResetCross from '../BtnResetCross/BtnResetCross';
import DropDownList from '../DropDownList/DropDownList';
import { borderStyleHandlerThemeForFilter } from '../../utils/utils';

function SearchByString({ placeholder, theme, data, handleNameInputSearch }) {
  const [inputValue, setInputValue] = React.useState('');
  const [isFocusElem, setIsFocusElem] = React.useState(false);
  const [isOpenListSearchedResult, setIsOpenListSearchedResult] = React.useState(false);
  const [isNothingSearch, setIsNothingSearch] = React.useState(false);
  const [isErrorOnlyLetter, setIsErrorOnlyLetter] = React.useState(false);
  const selectItemRef = React.useRef('');

  const onChange = (evt) => {
    const {value} = evt.target;
    setInputValue(value);
    handlerSearch(value);
    if (value.length === 0) {
      setIsOpenListSearchedResult(false);
      setIsNothingSearch(false);
    }
  };

  const handlerSearch = (value) => {
    if (handleNameInputSearch(value).length) {
      setIsOpenListSearchedResult(true);
      setIsNothingSearch(false);
    } else {
      setIsOpenListSearchedResult(false);
      !isErrorOnlyLetter && setIsNothingSearch(true);
    }
  };

  const validatorInput = (value) => {
    const regExOnlyLetter = /^([a-zа-яё]*[\s]{0,1}[a-zа-яё]*[\s]{0,1}[a-zа-яё]*)$/ig;
    if (regExOnlyLetter.test(value.toLowerCase())) {
      setIsErrorOnlyLetter(false);
    } else {
      setIsErrorOnlyLetter(true);
      setIsNothingSearch(false);
    }
  };

  const handleReset = () => {
    setInputValue('');
    selectItemRef.current = '';
    setIsOpenListSearchedResult(false);
    setIsFocusElem(false);
  };

  const listenerEscapeBtn = (evt) => {
    if (evt.key === 'Escape' || evt.keyCode === 27) {
      evt.target.blur();
    }
  };

  const selectListItem = (evt) => {
    setInputValue(evt.target.textContent);
    selectItemRef.current = evt.target.textContent;
  };

  const onFocus = (evt) => {
    const {target} = evt;
    setIsFocusElem(true);
    if (selectItemRef.current.length) {
      setInputValue(selectItemRef.current);
      target.select();
    }
  };

  // эту функцию можно использовть как стрелочную функцию без использования useCallback
  // и, вместо selectItemRef, использовать хук useState
  const onBlur = React.useCallback((evt) => {
    const currentTarget = evt.currentTarget;
    // так как список спозиционирован абсолютно, в обработчике
    // даем браузеру время сфокусироваться на компоненте списка с результатами поиска
    requestAnimationFrame(() => {
      // когда список открывается, то стейтом isFocusElem списку добавляется класс drop-down-list_focus
      const dropDownListFocusClass = document.querySelector('.drop-down-list_focus');
      // если у компонента нет дочернего элемента-списка
      if (!currentTarget.contains(dropDownListFocusClass)) {
        selectItemRef.current.length ? setInputValue(selectItemRef.current) : setInputValue('');
        setIsOpenListSearchedResult(false);
        setIsNothingSearch(false);
        setIsErrorOnlyLetter(false);
      }
    });
    // условие if в requestAnimationFrame выполняется всегда, если компонент сфокусирован
    setIsFocusElem(false);
  }, [isFocusElem]);

  // эффект отвечает только за стили
  React.useEffect(() => {
    const inputContainer = document.querySelector('.search-by-string__container');
    borderStyleHandlerThemeForFilter(inputContainer, theme, isOpenListSearchedResult, isFocusElem);
  }, [isOpenListSearchedResult, theme, isFocusElem]);

  React.useEffect(() => {
    validatorInput(inputValue);
  }, [inputValue]);

  return (
    <>
      <div 
        className={`search-by-string search-by-string_${theme} ${isFocusElem ? 'search-by-string_input-focus' : ''}`}
        onKeyDown={(evt) => listenerEscapeBtn(evt)}
        onFocus={(evt) => onFocus(evt)}
        onBlur={(evt) => onBlur(evt)}
      >
        <div 
          className={`search-by-string__container search-by-string__container_${theme}`}
        >
          <input 
            className={`search-by-string__input search-by-string__input_${theme}`}
            type='text'
            value={inputValue}
            onChange={onChange}
            placeholder={placeholder}
          />
          {isErrorOnlyLetter && <span className={`search-by-string__error-only-letter search-by-string__error-only-letter_${theme}`}>Вводите только буквы</span>}
          {isNothingSearch && <span className={`search-by-string__notice-not-found search-by-string__notice-not-found_${theme}`}>Ничего не найдено</span>}
          {inputValue.length > 0 &&
            <BtnResetCross 
              hStyle={{right: '18px'}}
              handleReset={handleReset}
              theme={theme}
            />
          }
        </div>
        <DropDownList
          theme={theme}
          data={data}
          isOpen={isOpenListSearchedResult}
          onClickSelectItem={selectListItem}
          isFocus={isFocusElem}
        />
      </div>
    </>
  );
}

export default SearchByString;