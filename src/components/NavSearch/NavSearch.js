import './NavSearch.css';
import SearchByString from '../SearchByString/SearchByString';
import FilterSelectListItem from '../FilterSelectListItem/FilterSelectListItem';

function NavSearch({ theme, data, handlerInputSearchNamePicture, 
  handlerSelectListNameAuthor, handlerResetListNameAuthor, handlerSelectListLocation, 
  handlerResetListLocation }) {
  return (
    <section className={`section-search section-search_${theme}`}>
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
    </section>
  )
}

export default NavSearch;