import './Main.css';
import NavSearch from '../NavSearch/NavSearch';

function Main({ theme, data }) {
  return (
    <>
      <main className='main'>
        <NavSearch 
          theme={theme}
          data={data}
        />
      </main>
    </>
  );
}

export default Main;