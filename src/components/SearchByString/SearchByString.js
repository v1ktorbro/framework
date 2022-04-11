import { useState } from 'react';
import './SearchByString.css';

function SearchByString({ placeholder }) {
  const [searchString, setSearchString] = useState('');

  const onChangeSearch = (evt) => {
    const {value} = evt.target;
    setSearchString(value);
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
      {/* <button 
        className='search-by-string__btn-reset' 
        type='reset' 
      /> */}
    </div>
  );
}

export default SearchByString;