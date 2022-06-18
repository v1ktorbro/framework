import './Main.css';
import NavSearch from '../NavSearch/NavSearch';
import SectionCard from '../SectionCard/SectionCard';
import Pagination from '../Pagination/Pagination';

function Main({ handlerSetValueParamSearch, countItemOfListViewUser,
  handlerPaginateList, viewPaintsOnScreenFromPaginator, filteredDbForUser
}) {

  return (
    <>
      <main className='main'>
        <NavSearch
          filteredDbForUser={filteredDbForUser}
          handlerSetValueParamSearch={handlerSetValueParamSearch}
        />
        <SectionCard
          listCard={viewPaintsOnScreenFromPaginator}
        />
        <Pagination 
          arrWithData={filteredDbForUser.paintings}
          countItemOfListViewUser={countItemOfListViewUser}
          handlerPaginateList={handlerPaginateList}
        />
      </main>
    </>
  );
}

export default Main;