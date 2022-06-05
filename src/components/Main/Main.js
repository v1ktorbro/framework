import './Main.css';
import NavSearch from '../NavSearch/NavSearch';
import SectionCard from '../SectionCard/SectionCard';
import Pagination from '../Pagination/Pagination';

function Main({ handlerSetValueParamSearch, isLoading, countItemOfListViewUser,
  listPaintings, listAuthors, listLocations, handlerPaginateList, viewPaintsOnScreenFromPaginator,
}) {
    
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
          listCard={viewPaintsOnScreenFromPaginator}
          isLoading={isLoading}
        />
        <Pagination 
          totalPaints={listPaintings.length}
          db={listPaintings}
          countItemOfListViewUser={countItemOfListViewUser}
          handlerPaginateList={handlerPaginateList}
        />
      </main>
    </>
  );
}

export default Main;