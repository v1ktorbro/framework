import { useState } from 'react';
import './SearchByLine.css';

function SearchByLine({ placeholder }) {
  const [searchString, setSearchString] = useState('');

  const onChangeSearch = (evt) => {
    const {value} = evt.target;
    setSearchString(value);
  }

  return (
    <div className='search-by-line'>
      <input 
        className='search-by-line__input'
        type='text'
        value={searchString}
        onChange={onChangeSearch}
        placeholder={placeholder}
      />
      {/* <button 
        className='search-by-line__btn-reset' 
        type='reset' 
      /> */}
    </div>
  );
}

export default SearchByLine;