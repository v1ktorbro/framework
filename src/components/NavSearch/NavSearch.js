import './NavSearch.css';
import SearchByString from '../SearchByString/SearchByString';

function NavSearch({ theme }) {
  return (
    <nav className={`nav-search nav-search_${theme}`}>
      <SearchByString 
        placeholder='Name'
        theme={theme}
      />
    </nav>
  )
}

export default NavSearch;