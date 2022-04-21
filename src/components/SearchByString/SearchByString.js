import './SearchByString.css';
import { useCallback, useEffect, useRef, useState } from 'react';
import BtnResetCross from '../BtnResetCross/BtnResetCross';
import DropDownList from '../DropDownList/DropDownList';
import { borderStyleHandlerThemeForFilter } from '../../utils/utils';

function SearchByString({ placeholder, theme, data }) {
  const [stringValue, setStringValue] = useState('');
  const [isFocusElem, setIsFocusElem] = useState(false);
  const [isOpenListSearchedResult, setIsOpenListSearchedResult] = useState(false);
  const selectItemRef = useRef('');

  const onChangeSearch = (evt) => {
    const {value} = evt.target;
    setStringValue(value);
    value.length ? setIsOpenListSearchedResult(true) : setIsOpenListSearchedResult(false);
  };

  const handleReset = () => {
    setStringValue('');
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
    setStringValue(evt.target.textContent);
    selectItemRef.current = evt.target.textContent;
  };

  const onFocus = (evt) => {
    const {target} = evt;
    setIsFocusElem(true);
    if (selectItemRef.current.length) {
      setStringValue(selectItemRef.current);
      target.select();
    }
  };

  // эту функцию можно использовть как стрелочную функцию без использования useCallback
  // и, вместо selectItemRef, использовать хук useState
  const onBlur = useCallback((evt) => {
    const currentTarget = evt.currentTarget;
    // так как список спозиционирован абсолютно, в обработчике
    // даем браузеру время сфокусироваться на компоненте списка с результатами поиска
    requestAnimationFrame(() => {
      // когда список открывается, то стейтом isFocusElem списку добавляется класс drop-down-list_focus
      const dropDownListFocusClass = document.querySelector('.drop-down-list_focus');
      // если у компонента нет дочернего элемента-списка
      if (!currentTarget.contains(dropDownListFocusClass)) {
        selectItemRef.current.length ? setStringValue(selectItemRef.current) : setStringValue('');
        setIsOpenListSearchedResult(false);
      }
    });
    // условие if в requestAnimationFrame выполняется всегда, если компонент сфокусирован
    setIsFocusElem(false);
  }, [isFocusElem]);

  useEffect(() => {
    const inputContainer = document.querySelector('.search-by-string__container');
    borderStyleHandlerThemeForFilter(inputContainer, theme, isOpenListSearchedResult, isFocusElem);
  }, [isOpenListSearchedResult, theme, isFocusElem]);

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
            value={stringValue}
            onChange={onChangeSearch}
            placeholder={placeholder}
          />
          { stringValue.length > 0 &&
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