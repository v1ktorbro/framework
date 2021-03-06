import './App.css';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { CurrentThemeContext, defaultTheme } from '../../context/CurrentThemeContext';
import { CurrentDataContext } from '../../context/CurrentDataContext';
import { CurrentDataSearchContext } from '../../context/CurrentDataSearchContext';
import Header from '../Header/Header';
import Main from '../Main/Main';
import api from '../../utils/Api';
import HandlerSearch from '../HandlerSearch/HandlerSearch';
import UrlHandler from '../UrlHandler/UrlHandler';
import PageCrashApp from '../PageCrashApp/PageCrashApp';
import Preloader from '../Preloader/Preloader';
import PageNotFound from '../PageNotFound/PageNotFound';

function App() {
  // по умолчанию, цвет темы подтягивается из настроек ОС и сохраняется в localStorage
  const [theme, setTheme] = React.useState(localStorage.getItem('app-theme') || defaultTheme);
  const apiBrowserUlrSearchString = useHistory().location.search;
  const [initialDb, setInitialDb] = React.useState({});
  const [filteredDbForUser, setFilteredDbForUser] = React.useState({ paintings: [], authors: [], locations: [] });
  const [viewPaintsOnScreenFromPaginator, setViewPaintsOnScreenFromPaginator] = React.useState([]);
  const [searchData, setSearchData] = React.useState({
    name: '',
    authorId: '',
    locationId: '',
    created: {from: '', before: ''},
  });
  //  количество элементов, которые будут вырезаны в пагинации для отображения
  const [countItemOfListViewUser] = React.useState(12);

  //  при любом изменении значении полей данные кидаются в HandlerSearch
  //  при помощи метода handlerReqParamSearch, который исполняется в handlerSetValueParamSearch
  //  получение callBack с новым массивом происходит в getUpdatedListData
  const useSearch =  HandlerSearch(searchData, initialDb, getUpdatedListData);
  const urlHandler = UrlHandler();
  const [preloaderParam, setIsPreloaderParam] = React.useState({isLoading: false, messageProcess : ''});
  const [pageCrashAppParam, setPageCrashAppParam] = React.useState({isCrashApp: false, messageErrorTitle: '', messageErrorDescription: ''});
  const [errorNoResultFoundParam, setErrorNoResultFoundParam] = React.useState({isOpen: false, title: 'No results found', description: 'try to change the url request or reset the filters'});
  const [pageNotFoundParam] = React.useState({statusCode: 404, title: 'Sorry', description: 'The page you’re looking for is not found'});
  
  const handlerSetValueParamSearch = React.useCallback((keyName, value) => {
    setSearchData((prevState) => ({...prevState, [keyName]: value}));
    useSearch.handlerReqParamSearch(keyName, value);
    urlHandler.setUrlFromApp(keyName, value);
  }, [searchData]);

  const getInitialData = async () => {
    setIsPreloaderParam({isLoading: true, messageProcess: 'Requesting initial data, please wait...'});
    setPageCrashAppParam({...pageCrashAppParam, isCrashApp: false});
    try {
      await api.getAllData().then((res) => {
        setInitialDb(res);
        setIsPreloaderParam({...preloaderParam, isLoading: false});
        useSearch.setInitialData(res);
      });
    } catch (error) {
      setIsPreloaderParam({...preloaderParam, isLoading: false});
      return setPageCrashAppParam({isCrashApp: true, messageErrorTitle: 'OOOPS!', messageErrorDescription: error});
    }
  };

  function getUpdatedListData(searchHandlerFilterArr) {
    setFilteredDbForUser(searchHandlerFilterArr);
  }

  const handlerPaginateList = (currentPaintsList) => {
    setViewPaintsOnScreenFromPaginator(currentPaintsList());
  };

  // обработчик для отображения компонента PageNoResultFound
  const handlerNoResultFoundParam = () => {
    const isEmpteFilteredArrSearch = filteredDbForUser.paintings.length ? false : true;
    const handlerViewPageNoResultFoundParam = (keyName) => {
      const isCreatedKeyName = keyName == 'created';
      const handlerParamSearch = () => {
        if (searchData[keyName].length) {
          const value = searchData[keyName];
          isEmpteFilteredArrSearch && value.length && setErrorNoResultFoundParam({...errorNoResultFoundParam, isOpen: true});
        }
      };
      const handlerForCreatedParamSearch = () => {
        const value = searchData.created;
        const { from, before } = value;
        if (isEmpteFilteredArrSearch) (from.length && before.length) && setErrorNoResultFoundParam({...errorNoResultFoundParam, isOpen: true});
        else setErrorNoResultFoundParam({...errorNoResultFoundParam, isOpen: false});
      };
      isCreatedKeyName ? handlerForCreatedParamSearch() : handlerParamSearch();
    };
    Object.keys(searchData).forEach((keyName) => {
      handlerViewPageNoResultFoundParam(keyName);
    });
  };

  React.useEffect(() => {
    localStorage.setItem('app-theme', theme);
    document.documentElement.setAttribute('app-theme', theme);
  }, [theme]);

  React.useEffect(() => {
    urlHandler.getUrlFromLocalStorage(handlerSetValueParamSearch);
  }, [initialDb]);

  React.useEffect(() => {
    urlHandler.handlerParamFromBrowserApi(apiBrowserUlrSearchString, handlerSetValueParamSearch);
  }, [apiBrowserUlrSearchString]);

  React.useEffect(() => {
    handlerNoResultFoundParam();
  }, [filteredDbForUser]);  

  React.useEffect(() => {
    getInitialData();
  }, []);

  return (
    <>
      <CurrentThemeContext.Provider value={theme}>
      <CurrentDataSearchContext.Provider value={searchData}>
      <CurrentDataContext.Provider value={initialDb}>
        <Header 
          setTheme={setTheme}
        />
        <Switch>
          <Route exact path='/'>
            { pageCrashAppParam.isCrashApp && <PageCrashApp param={pageCrashAppParam} /> }
            { preloaderParam.isLoading && <Preloader preloaderParam={preloaderParam} /> }
            { !(preloaderParam.isLoading || pageCrashAppParam.isCrashApp) &&
                <Main
                  handlerSetValueParamSearch={handlerSetValueParamSearch}
                  filteredDbForUser={filteredDbForUser}
                  countItemOfListViewUser={countItemOfListViewUser}
                  viewPaintsOnScreenFromPaginator={viewPaintsOnScreenFromPaginator}
                  handlerPaginateList={handlerPaginateList}
                  errorNoResultFoundParam={errorNoResultFoundParam}
                />
            }
          </Route>
          <Route path='*'>
            <PageNotFound param={pageNotFoundParam}/>
          </Route>
        </Switch>
      </CurrentDataContext.Provider>
      </CurrentDataSearchContext.Provider>
      </CurrentThemeContext.Provider>
    </>
  );
}

export default App;