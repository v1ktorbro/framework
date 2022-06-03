import './NavSearch.css';
import SearchByString from '../SearchByString/SearchByString';
import FilterSelectListItem from '../FilterSelectListItem/FilterSelectListItem';
import FilterSelectTimeInterval from '../FilterSelectTimeInterval/FilterSelectTimeInterval';

function NavSearch({ handlerSetValueParamSearch, listPaintings,
  listAuthors, listLocations }) {
  
  return (
    <section className='nav-search'>
      <SearchByString 
        data={listPaintings}
        keyNameForListData='name'
        nameFilter='Name'
        handlerSetValueParamSearch={handlerSetValueParamSearch}
      />
      <FilterSelectListItem 
        data={listAuthors}
        keyNameForListData='name'
        nameFilter='Author'
        handlerSetValueParamSearch={handlerSetValueParamSearch}
      />
      <FilterSelectListItem 
        data={listLocations}
        keyNameForListData='location'
        nameFilter='Location'
        handlerSetValueParamSearch={handlerSetValueParamSearch}
      />
      <FilterSelectTimeInterval 
        nameFilter='Created'
        handlerSetValueParamSearch={handlerSetValueParamSearch}
      />
    </section>
  );
}

export default NavSearch;