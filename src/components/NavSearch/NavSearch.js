import './NavSearch.css';
import SearchByString from '../SearchByString/SearchByString';
import FilterSelectListItem from '../FilterSelectListItem/FilterSelectListItem';
import FilterSelectTimeInterval from '../FilterSelectTimeInterval/FilterSelectTimeInterval';

function NavSearch({ theme, data, handlerSelectNamePicture, 
  handlerSelectListNameAuthor, handlerSelectListLocation, handlerSearchTimeInterval }) {
  return (
    <section className={`nav-search nav-search_${theme}`}>
      <SearchByString 
        placeholder='Name'
        theme={theme}
        data={data}
        handlerSelectNamePicture={handlerSelectNamePicture}
      />
      <FilterSelectListItem 
        theme={theme}
        data={data}
        nameFilter='Author'
        handlerSelectList={handlerSelectListNameAuthor}
      />
      <FilterSelectListItem 
        theme={theme}
        data={data}
        nameFilter='Location'
        handlerSelectList={handlerSelectListLocation}
      />
      <FilterSelectTimeInterval 
        theme={theme}
        nameFilter='Created'
        handlerSearchTimeInterval={handlerSearchTimeInterval}
      />
    </section>
  )
}

export default NavSearch;