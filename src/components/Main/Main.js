import './Main.css';
import NavSearch from '../NavSearch/NavSearch';

function Main({ theme, data, handlerInputSearchNamePicture, 
  handlerSelectListNameAuthor, handlerResetListNameAuthor,
  handlerSelectListLocation, handlerResetListLocation }) {
  return (
    <>
      <main className='main'>
        <NavSearch 
          theme={theme}
          data={data}
          handlerInputSearchNamePicture={handlerInputSearchNamePicture}
          handlerSelectListNameAuthor={handlerSelectListNameAuthor}
          handlerResetListNameAuthor={handlerResetListNameAuthor}
          handlerSelectListLocation={handlerSelectListLocation}
          handlerResetListLocation={handlerResetListLocation}
        />
      </main>
    </>
  );
}

export default Main;