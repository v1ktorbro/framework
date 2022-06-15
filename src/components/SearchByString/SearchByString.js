import './SearchByString.css';
import React from 'react';
import { CurrentThemeContext } from '../../context/CurrentThemeContext';
import { CurrentDataContext } from '../../context/CurrentDataContext';
import { CurrentDataSearchContext } from '../../context/CurrentDataSearchContext';
import BtnResetCross from '../BtnResetCross/BtnResetCross';
import DropDownList from '../DropDownList/DropDownList';
import { borderStyleHandlerThemeForFilter } from '../../utils/utils';

function SearchByString({ data, keyNameForListData, nameFilter, handlerSetValueParamSearch }) {
  const theme = React.useContext(CurrentThemeContext);
  const initialDb = React.useContext(CurrentDataContext);
  const searchData = React.useContext(CurrentDataSearchContext);
  const selectItemRef = React.useRef('');
  const [inputValue, setInputValue] = React.useState('');
  const [listData, setListData] = React.useState(data);
  const [isFocusElem, setIsFocusElem] = React.useState(false);
  const [isOpenListSearchedResult, setIsOpenListSearchedResult] = React.useState(false);
  const [isNothingSearch, setIsNothingSearch] = React.useState({state: false, message: 'Nothing found...'});
  const [isErrorOnlyLetter, setIsErrorOnlyLetter] = React.useState({state: false, message: 'Enter only letter'});

  const valueOfInputFromSearchData = (db, key) => {
    const currentList = db.paintings;
    const currentPaint = currentList.find((paint) => paint.name == searchData.name);
    return currentPaint == undefined ? '' : currentPaint[key];
  };

  const onChange = (evt) => {
    const {value} = evt.target;
    setInputValue(value);
    handlerSearch(value);
    if (!value.length) {
      setIsOpenListSearchedResult(false);
      setIsNothingSearch({...isNothingSearch, state: false});
    }
  };

  const filteredSearchNamePictures = (value) => data.filter((elem) => {
    return elem.name.toLowerCase().includes(value.toLowerCase());
  });

  const handlerSearch = (value) => {
    if (filteredSearchNamePictures(value).length) {
      setListData(filteredSearchNamePictures(value));
      setIsOpenListSearchedResult(true);
      setIsNothingSearch({...isNothingSearch, state: false});
    } else {
      setListData(data);
      setIsOpenListSearchedResult(false);
      setIsNothingSearch({...isNothingSearch, state: true});
    }
  };

  const validatorInput = (value) => {
    const regExOnlyLetter = /^([a-zа-яё]*[\s]{0,1}[a-zа-яё]*[\s]{0,1}[a-zа-яё]*)$/ig;
    if (regExOnlyLetter.test(value.toLowerCase())) {
      setIsErrorOnlyLetter({...isErrorOnlyLetter, state: false});
    } else {
      setIsErrorOnlyLetter({...isErrorOnlyLetter, state: true});
      setIsNothingSearch({...isNothingSearch, state: false});
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
        setIsNothingSearch({...isNothingSearch, state: false});
        setIsErrorOnlyLetter({...isErrorOnlyLetter, state: false});
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

  React.useEffect(() => {
    if (Object.keys(initialDb).length) {
      setInputValue(valueOfInputFromSearchData(initialDb, 'name'));
      selectItemRef.current = valueOfInputFromSearchData(initialDb, 'name');
    }
  }, [initialDb]);

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
          {isErrorOnlyLetter.state && <span className={`search-by-string__error-only-letter`}>{isErrorOnlyLetter.message}</span>}
          {isNothingSearch.state && <span className={`search-by-string__notice-not-found search-by-string__notice-not-found_${theme}`}>{isNothingSearch.message}</span>}
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