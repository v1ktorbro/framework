import './NavSearch.css';
import SearchByString from '../SearchByString/SearchByString';

function NavSearch({ theme, data }) {
  return (
    <nav className={`nav-search nav-search_${theme}`}>
      <SearchByString 
        placeholder='Name'
        theme={theme}
        data={data}
      />
    </nav>
  )
}

export default NavSearch;