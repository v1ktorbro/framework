import './NavSearch.css';
import SearchByString from '../SearchByString/SearchByString';

function NavSearch() {
  return (
    <nav className='nav-search'>
      <SearchByString 
        placeholder='Name'
      />
    </nav>
  )
}

export default NavSearch;