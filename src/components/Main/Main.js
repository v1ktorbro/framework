import './Main.css';
import NavSearch from '../NavSearch/NavSearch';

function Main({ theme, data, handlerInputSearchNamePicture, 
  handlerSelectListNameAuthor, handlerSelectListLocation, handlerSearchTimeInterval }) {
  return (
    <>
      <main className='main'>
        <NavSearch 
          theme={theme}
          data={data}
          handlerInputSearchNamePicture={handlerInputSearchNamePicture}
          handlerSelectListNameAuthor={handlerSelectListNameAuthor}
          handlerSelectListLocation={handlerSelectListLocation}
          handlerSearchTimeInterval={handlerSearchTimeInterval}
        />
      </main>
    </>
  );
}

export default Main;