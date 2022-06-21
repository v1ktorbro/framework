import './Main.css';
import NavSearch from '../NavSearch/NavSearch';
import SectionCard from '../SectionCard/SectionCard';
import Pagination from '../Pagination/Pagination';
import ErrorNoResultFound from '../ErrorNoResultFound/ErrorNoResultFound';

function Main({ handlerSetValueParamSearch, countItemOfListViewUser,
  handlerPaginateList, viewPaintsOnScreenFromPaginator, filteredDbForUser, 
  errorNoResultFoundParam,
}) {

  return (
    <>
      <main className='main'>
        <NavSearch
          filteredDbForUser={filteredDbForUser}
          handlerSetValueParamSearch={handlerSetValueParamSearch}
        />
        { 
          <>
            {errorNoResultFoundParam.isOpen &&
              <ErrorNoResultFound 
                param={errorNoResultFoundParam}
              />
            }
            { !(errorNoResultFoundParam.isOpen) && 
                <>
                  <SectionCard
                    listCard={viewPaintsOnScreenFromPaginator}
                  />
                  <Pagination 
                    arrWithData={filteredDbForUser.paintings}
                    countItemOfListViewUser={countItemOfListViewUser}
                    handlerPaginateList={handlerPaginateList}
                  />
                </>
            }
          </>
        }
      </main>
    </>
  );
}

export default Main;