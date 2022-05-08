import './Main.css';
import NavSearch from '../NavSearch/NavSearch';
import SectionCard from '../SectionCard/SectionCard';

function Main({ handlerSetValueParamSearch, 
  listPaintings, listAuthors, listLocations }) {
    
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
          data={listPaintings}
        />
      </main>
    </>
  );
}

export default Main;