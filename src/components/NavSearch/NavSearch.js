import './NavSearch.css';
import SearchByString from '../SearchByString/SearchByString';
import FilterSelectListItem from '../FilterSelectListItem/FilterSelectListItem';
import FilterSelectTimeInterval from '../FilterSelectTimeInterval/FilterSelectTimeInterval';

function NavSearch({ handlerSetValueParamSearch, filteredDbForUser }) {
  
  return (
    <section className='nav-search'>
      <SearchByString 
        data={filteredDbForUser.paintings}
        keyNameForListData='name'
        nameFilter='Name'
        handlerSetValueParamSearch={handlerSetValueParamSearch}
      />
      <FilterSelectListItem 
        data={filteredDbForUser.authors}
        keyNameForListData='name'
        nameFilter='Author'
        handlerSetValueParamSearch={handlerSetValueParamSearch}
      />
      <FilterSelectListItem 
        data={filteredDbForUser.locations}
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