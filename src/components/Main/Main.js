import './Main.css';
import NavSearch from '../NavSearch/NavSearch';

function Main({ theme, data, handlerSelectNamePicture, 
  handlerSelectListNameAuthor, handlerSelectListLocation, handlerSearchTimeInterval }) {
  return (
    <>
      <main className='main'>
        <NavSearch 
          theme={theme}
          data={data}
          handlerSelectNamePicture={handlerSelectNamePicture}
          handlerSelectListNameAuthor={handlerSelectListNameAuthor}
          handlerSelectListLocation={handlerSelectListLocation}
          handlerSearchTimeInterval={handlerSearchTimeInterval}
        />
      </main>
    </>
  );
}

export default Main;