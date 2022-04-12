import { useState } from 'react';
import './SearchByString.css';
import BtnResetCross from '../BtnResetCross/BtnResetCross';
import DropDownList from '../DropDownList/DropDownList';

function SearchByString({ placeholder, theme, data }) {
  const [searchString, setSearchString] = useState('');

  const onChangeSearch = (evt) => {
    const {value} = evt.target;
    setSearchString(value);
  }

  function handleResetButton(){
    setSearchString('');
  }

  return (
    <>
      <div className={`search-by-string search-by-string_${theme}`}>
        <div className='search-by-string__container'>
          <input 
            className={`search-by-string__input search-by-string__input_${theme}`}
            type='text'
            value={searchString}
            onChange={onChangeSearch}
            placeholder={placeholder}
          />
          { searchString.length > 0 &&
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
        />
      </div>
    </>
  );
}

export default SearchByString;