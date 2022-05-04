import './NavSearch.css';
import SearchByString from '../SearchByString/SearchByString';
import FilterSelectListItem from '../FilterSelectListItem/FilterSelectListItem';
import FilterSelectTimeInterval from '../FilterSelectTimeInterval/FilterSelectTimeInterval';

function NavSearch({ theme, data, handlerSetValueParamSearch }) {
  return (
    <section className={`nav-search nav-search_${theme}`}>
      <SearchByString 
        theme={theme}
        data={data}
        nameFilter='Name'
        handlerSetValueParamSearch={handlerSetValueParamSearch}
      />
      <FilterSelectListItem 
        theme={theme}
        data={data}
        nameFilter='Author'
        handlerSetValueParamSearch={handlerSetValueParamSearch}
      />
      <FilterSelectListItem 
        theme={theme}
        data={data}
        nameFilter='Location'
        handlerSetValueParamSearch={handlerSetValueParamSearch}
      />
      <FilterSelectTimeInterval 
        theme={theme}
        nameFilter='Created'
        handlerSetValueParamSearch={handlerSetValueParamSearch}
      />
    </section>
  )
}

export default NavSearch;