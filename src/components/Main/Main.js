import './Main.css';
import NavSearch from '../NavSearch/NavSearch';
import SectionCard from '../SectionCard/SectionCard';

function Main({ theme, data, handlerSetValueParamSearch }) {
  return (
    <>
      <main className='main'>
        <NavSearch 
          theme={theme}
          data={data}
          handlerSetValueParamSearch={handlerSetValueParamSearch}
        />
        <SectionCard 
          data={data}
        />
      </main>
    </>
  );
}

export default Main;