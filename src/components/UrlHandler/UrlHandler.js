import React from 'react';
import { useHistory } from 'react-router-dom';

function UrlHandler() {
  const history = useHistory();
  const availableParametrs = ['name', 'authorId', 'locationId', 'created'];

  const handlerParamFromBrowserApi = (urlSearchString, handlerSetValueParamSearch) => {
    const searchUrlParams = new URLSearchParams(urlSearchString);
    for (let i = 0; i < availableParametrs.length; i++) {
      const keyName = availableParametrs[i];
      const value = searchUrlParams.get(keyName);
      value != (undefined || null) && handlerSetValueParamSearch(keyName, value);
    }
  };

  const setSearchUrlParam = (search, param, value) => {
    const searchUrlParams = new URLSearchParams(search);
    searchUrlParams.set(param, value);
    return searchUrlParams.toString();
  };

  const setUrl = (keyName, value) => {
    const newSearch = setSearchUrlParam(
    history.location.search, 
    keyName, 
    value,
  );

    history.replace({
      search: newSearch,
    }); 
    localStorage.setItem('urlParams', newSearch);
  };

  const getUrlFromLocalStorage = (handlerSetValueParamSearch) => {
    const saveUrlParams = localStorage.getItem('urlParams');
    const reqeustToArrayConverter = saveUrlParams != null && saveUrlParams.split('&');
    reqeustToArrayConverter.length && reqeustToArrayConverter.forEach((item) => {
      const keyName = item.split('=')[0];
      const value = item.split('=')[1];
      return handlerSetValueParamSearch(keyName, value);
    });
  };

  return {
    setUrl,
    getUrlFromLocalStorage,
    handlerParamFromBrowserApi,
  };
}

export default UrlHandler;