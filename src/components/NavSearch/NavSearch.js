import './NavSearch.css';
import SearchByString from '../SearchByString/SearchByString';

function NavSearch({ theme, data, handleNameInputSearch }) {
  return (
    <nav className={`nav-search nav-search_${theme}`}>
      <SearchByString 
        placeholder='Name'
        theme={theme}
        data={data}
        handleNameInputSearch={handleNameInputSearch}
      />
    </nav>
  )
}

export default NavSearch;