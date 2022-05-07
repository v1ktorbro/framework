import './NavSearch.css';
import SearchByString from '../SearchByString/SearchByString';
import FilterSelectListItem from '../FilterSelectListItem/FilterSelectListItem';
import FilterSelectTimeInterval from '../FilterSelectTimeInterval/FilterSelectTimeInterval';

function NavSearch({ theme, handlerSetValueParamSearch, listPaintings,
  listAuthors, listLocations }) {
  
  return (
    <section className={`nav-search nav-search_${theme}`}>
      <SearchByString 
        theme={theme}
        data={listPaintings}
        keyNameForListData='name'
        nameFilter='Name'
        handlerSetValueParamSearch={handlerSetValueParamSearch}
      />
      <FilterSelectListItem 
        theme={theme}
        data={listAuthors}
        keyNameForListData='name'
        nameFilter='Author'
        handlerSetValueParamSearch={handlerSetValueParamSearch}
      />
      <FilterSelectListItem 
        theme={theme}
        data={listLocations}
        keyNameForListData='location'
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