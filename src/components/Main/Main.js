import './Main.css';
import NavSearch from '../NavSearch/NavSearch';
import SectionCard from '../SectionCard/SectionCard';
import Pagination from '../Pagination/Pagination';

function Main({ handlerSetValueParamSearch, isLoading, countItemOfListViewUser,
  listPaintings, listAuthors, listLocations,
  paginate, currentPaintsList, nextPage, prevPage}) {
    
  return (
    <>
      <main className='main'>
        <NavSearch 
          listPaintings={listPaintings}
          listAuthors={listAuthors}
          listLocations={listLocations}
          handlerSetValueParamSearch={handlerSetValueParamSearch}
        />
        <SectionCard
          listCard={currentPaintsList}
          listAuthors={listAuthors}
          listLocations={listLocations}
          isLoading={isLoading}
        />
        <Pagination 
          totalPaints={listPaintings.length}
          countItemOfListViewUser={countItemOfListViewUser}
          paginate={paginate}
          nextPage={nextPage}
          prevPage={prevPage}
        />
      </main>
    </>
  );
}

export default Main;