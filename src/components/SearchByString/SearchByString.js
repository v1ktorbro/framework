import { useEffect, useState } from 'react';
import './SearchByString.css';
import BtnResetCross from '../BtnResetCross/BtnResetCross';
import DropDownList from '../DropDownList/DropDownList';

function SearchByString({ placeholder, theme, data }) {
  const [stringValue, setStringValue] = useState('');
  const [isFocusInput, setIsFocusInput] = useState(false);
  const [isOpenListSearchedResult, setIsOpenListSearchedResult] = useState(false);
  //const [dataSearchedResult, setDataSearchedResult] = useState([]);

  //const containerOfInput = (evt) => {return evt.target.closest('.search-by-string__container')};

  const borderStyleForInput = () => {
    const containerOfInput = document.querySelector('.search-by-string__container');
    if (isOpenListSearchedResult) {
      containerOfInput.style.borderBottom = 'none';
      containerOfInput.style.borderBottomLeftRadius = '0px';
      containerOfInput.style.borderBottomRightRadius = '0px';
    } else if (!isOpenListSearchedResult && isFocusInput) {
      containerOfInput.style.borderBottom = (theme === 'naight' ? '1px solid #fff' : '1px solid #000');
      containerOfInput.style.borderBottomLeftRadius = '8px';
      containerOfInput.style.borderBottomRightRadius = '8px';
    }
    else {
      containerOfInput.style.borderBottom = (theme === 'naight' ? '1px solid rgba(255, 255, 255, .3)' : '1px solid rgba(0, 0, 0, .3)');
      containerOfInput.style.borderBottomLeftRadius = '8px';
      containerOfInput.style.borderBottomRightRadius = '8px';
    }
  };

  const styleOnFocusContainerInput = () => {
      setIsFocusInput(true);
      const containerOfInput = document.querySelector('.search-by-string__container');
      containerOfInput.style.borderBottom = (theme === 'naight' ? '1px solid #fff' : '1px solid #000');
      console.log('фокус есть', isFocusInput);
  };

  const styleOnBlurContainerInput = () => {
    setIsFocusInput(false);
    const containerOfInput = document.querySelector('.search-by-string__container');
    containerOfInput.style.borderBottom = (theme === 'naight' ? '1px solid rgba(255, 255, 255, .3)' : '1px solid rgba(0, 0 , 0, .3)');
    console.log('фокуcа нет', isFocusInput);
  };

  const onChangeSearch = (evt) => {
    const {value} = evt.target;
    setStringValue(value);
    value.length ? setIsOpenListSearchedResult(true) : setIsOpenListSearchedResult(false);
  }

  function handleResetButton(){
    setStringValue('');
    setIsOpenListSearchedResult(false);
  }

  useEffect(() => {
    borderStyleForInput();
  }, [isOpenListSearchedResult, theme]);

  return (
    <>
      <div 
        className={`search-by-string search-by-string_${theme}`}
      >
        <div 
          className={`search-by-string__container search-by-string__container_${theme}`}
          onFocus={styleOnFocusContainerInput}
          onBlur={styleOnBlurContainerInput}
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