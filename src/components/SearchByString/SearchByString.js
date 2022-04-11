import { useState } from 'react';
import './SearchByString.css';
import BtnResetCross from '../BtnResetCross/BtnResetCross';

function SearchByString({ placeholder }) {
  const [searchString, setSearchString] = useState('');

  const onChangeSearch = (evt) => {
    const {value} = evt.target;
    setSearchString(value);
  }

  function handleResetButton(){
    setSearchString('');
  }

  return (
    <div className='search-by-string'>
      <input 
        className='search-by-string__input'
        type='text'
        value={searchString}
        onChange={onChangeSearch}
        placeholder={placeholder}
      />
      { searchString.length > 0 &&
          <BtnResetCross 
            hStyle={{right: '18px'}}
            handleReset={handleResetButton}
          />
      }
    </div>
  );
}

export default SearchByString;