import { useEffect, useState } from 'react';
import './SearchByString.css';
import BtnResetCross from '../BtnResetCross/BtnResetCross';
import DropDownList from '../DropDownList/DropDownList';
import { borderStyleHandlerThemeForFilter } from '../../utils/utils';

function SearchByString({ placeholder, theme, data }) {
  const [stringValue, setStringValue] = useState('');
  const [isFocusInput, setIsFocusInput] = useState(false);
  const [isOpenListSearchedResult, setIsOpenListSearchedResult] = useState(false);

  const onChangeSearch = (evt) => {
    const {value} = evt.target;
    setStringValue(value);
    value.length ? setIsOpenListSearchedResult(true) : setIsOpenListSearchedResult(false);
  }

  const handleResetButton = () => {
    setStringValue('');
    setIsOpenListSearchedResult(false);
  };

  const listenerEscapeBtn = (evt) => {
    if (evt.key === 'Escape' || evt.keyCode === 27) {
      handleResetButton()
    }
  }

  useEffect(() => {
    const inputContainer = document.querySelector('.search-by-string__container');
    borderStyleHandlerThemeForFilter(inputContainer, theme, isOpenListSearchedResult, isFocusInput);
  }, [isOpenListSearchedResult, theme, isFocusInput]);

  return (
    <>
      <div 
        className={`search-by-string search-by-string_${theme}`}
      >
        <div 
          className={`search-by-string__container search-by-string__container_${theme}`}
          onKeyDown={(evt) => listenerEscapeBtn(evt)}
          onFocus={() => setIsFocusInput(true)}
          onBlur={() => setIsFocusInput(false)}
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
              handleReset={handleResetButton}
              theme={theme}
            />
          }
        </div>
        <DropDownList
          theme={theme}
          data={data}
          isOpen={isOpenListSearchedResult}
          setIsOpen={setIsOpenListSearchedResult}
        />
      </div>
    </>
  );
}

export default SearchByString;