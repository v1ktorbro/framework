import './Main.css';
import NavSearch from '../NavSearch/NavSearch';

function Main({ theme, data, handleNameInputSearch }) {
  return (
    <>
      <main className='main'>
        <NavSearch 
          theme={theme}
          data={data}
          handleNameInputSearch={handleNameInputSearch}
        />
      </main>
    </>
  );
}

export default Main;