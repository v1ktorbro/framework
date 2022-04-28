import './NavSearch.css';
import SearchByString from '../SearchByString/SearchByString';
import FilterSelectListItem from '../FilterSelectListItem/FilterSelectListItem';

function NavSearch({ theme, data, searchData, handlerInputSearchNamePicture, handlerSelectListNameAuthor, handlerResetListNameAuthor }) {
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
        placeholder='Author'
        handlerSelectListNameAuthor={handlerSelectListNameAuthor}
        searchData={searchData}
        handlerResetListNameAuthor={handlerResetListNameAuthor}
      />
    </section>
  )
}

export default NavSearch;