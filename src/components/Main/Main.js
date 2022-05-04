import './Main.css';
import NavSearch from '../NavSearch/NavSearch';

function Main({ theme, data, handlerSetValueParamSearch }) {
  return (
    <>
      <main className='main'>
        <NavSearch 
          theme={theme}
          data={data}
          handlerSetValueParamSearch={handlerSetValueParamSearch}
        />
      </main>
    </>
  );
}

export default Main;