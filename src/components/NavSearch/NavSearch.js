import './NavSearch.css';
import SearchByString from '../SearchByString/SearchByString';
import FilterSelectListItem from '../FilterSelectListItem/FilterSelectListItem';

function NavSearch({ theme, data, handleNameInputSearch }) {
  return (
    <section className={`section-search section-search_${theme}`}>
      <SearchByString 
        placeholder='Name'
        theme={theme}
        data={data}
        handleNameInputSearch={handleNameInputSearch}
      />
      <FilterSelectListItem 
        theme={theme}
        data={data}
      />
    </section>
  )
}

export default NavSearch;