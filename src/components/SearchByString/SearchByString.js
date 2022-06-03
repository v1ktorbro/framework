import './SearchByString.css';
import React from 'react';
import { CurrentThemeContext } from '../../context/CurrentThemeContext';
import BtnResetCross from '../BtnResetCross/BtnResetCross';
import DropDownList from '../DropDownList/DropDownList';
import { borderStyleHandlerThemeForFilter } from '../../utils/utils';

function SearchByString({ nameFilter, data, keyNameForListData, handlerSetValueParamSearch }) {
  const theme = React.useContext(CurrentThemeContext);
  const [inputValue, setInputValue] = React.useState('');
  const [listData, setListData] = React.useState(data);
  const [isFocusElem, setIsFocusElem] = React.useState(false);
  const [isOpenListSearchedResult, setIsOpenListSearchedResult] = React.useState(false);
  const [isNothingSearch, setIsNothingSearch] = React.useState(false);
  const [isErrorOnlyLetter, setIsErrorOnlyLetter] = React.useState(false);
  const selectItemRef = React.useRef('');

  const onChange = (evt) => {
    const {value} = evt.target;
    setInputValue(value);
    handlerSearch(value);
    if (!value.length) {
      setIsOpenListSearchedResult(false);
      setIsNothingSearch(false);
    }
  };

  const filteredSearchNamePictures = (value) => data.filter((elem) => {
    return elem.name.toLowerCase().includes(value.toLowerCase());
  });

  const handlerSearch = (value) => {
    if (filteredSearchNamePictures(value).length) {
      setListData(filteredSearchNamePictures(value));
      setIsOpenListSearchedResult(true);
      setIsNothingSearch(false);
    } else {
      setListData(data);
      setIsOpenListSearchedResult(false);
      setIsNothingSearch(true);
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

  const handlerReset = () => {
    handlerSetValueParamSearch(nameFilter.toLowerCase(), '');
    handlerSearch('');
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
    const {textContent} = evt.target;
    handlerSetValueParamSearch(nameFilter.toLowerCase(), textContent);
    setInputValue(textContent);
    selectItemRef.current = textContent;
  };

  const onFocus = () => {
    setIsFocusElem(true);
  };

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
      <nav 
        className={`search-by-string search-by-string_${theme}`}
        onKeyDown={listenerEscapeBtn}
        onFocus={onFocus}
        onBlur={onBlur}
      >
        <div className={`search-by-string__container search-by-string__container_${theme}`}>
          <input 
            className={`search-by-string__input search-by-string__input_${theme}`}
            type='text'
            value={inputValue}
            onChange={onChange}
            placeholder={nameFilter}
          />
          {isErrorOnlyLetter && <span className={`search-by-string__error-only-letter`}>Вводите только буквы</span>}
          {isNothingSearch && <span className={`search-by-string__notice-not-found search-by-string__notice-not-found_${theme}`}>Ничего не найдено</span>}
          {inputValue.length > 0 &&
            <BtnResetCross 
              onClick={handlerReset}
              theme={theme}
              style={{marginLeft: '10px'}}
            />
          }
        </div>
        <DropDownList
          data={listData}
          keyNameForListData={keyNameForListData}
          isOpen={isOpenListSearchedResult}
          onClickSelectItem={selectListItem}
          isFocus={isFocusElem}
        />
      </nav>
    </>
  );
}

export default SearchByString;