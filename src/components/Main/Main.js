import './Main.css';
import NavSearch from '../NavSearch/NavSearch';

function Main({ theme, data, handlerInputSearchNamePicture, handlerSelectListNameAuthor, searchData, handlerResetListNameAuthor }) {
  return (
    <>
      <main className='main'>
        <NavSearch 
          theme={theme}
          data={data}
          handlerInputSearchNamePicture={handlerInputSearchNamePicture}
          handlerSelectListNameAuthor={handlerSelectListNameAuthor}
          handlerResetListNameAuthor={handlerResetListNameAuthor}
          searchData={searchData}
        />
      </main>
    </>
  );
}

export default Main;