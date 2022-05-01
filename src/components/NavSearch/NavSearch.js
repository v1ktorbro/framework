import './NavSearch.css';
import SearchByString from '../SearchByString/SearchByString';
import FilterSelectListItem from '../FilterSelectListItem/FilterSelectListItem';
import FilterSelectTimeInterval from '../FilterSelectTimeInterval/FilterSelectTimeInterval';

function NavSearch({ theme, data, handlerInputSearchNamePicture, 
  handlerSelectListNameAuthor, handlerResetListNameAuthor, handlerSelectListLocation, 
  handlerResetListLocation }) {
  return (
    <section className={`nav-search nav-search_${theme}`}>
      <SearchByString 
        placeholder='Name'
        theme={theme}
        data={data}
        handlerInputSearchNamePicture={handlerInputSearchNamePicture}
      />
      <FilterSelectListItem 
        theme={theme}
        data={data}
        nameFilter='Author'
        handlerSelectList={handlerSelectListNameAuthor}
        handlerResetList={handlerResetListNameAuthor}
      />
      <FilterSelectListItem 
        theme={theme}
        data={data}
        nameFilter='Location'
        handlerSelectList={handlerSelectListLocation}
        handlerResetList={handlerResetListLocation}
      />
      <FilterSelectTimeInterval 
        theme={theme}
        nameFilter='Created'
      />
    </section>
  )
}

export default NavSearch;