import React from 'react';
import { useHistory } from 'react-router-dom';

function UrlHandler() {
  const history = useHistory();
  
  const getSearchUrlParam = (search, param) => {
    const searchUrlParams = new URLSearchParams(search);
    return searchUrlParams.toString();
  }

  const setSearchUrlParam = (search, param, value) => {
    const searchUrlParams = new URLSearchParams(search);
    searchUrlParams.set(param, value);
    return searchUrlParams.toString();
  }

  const handlerLocalStorageParams = () => {
    const storageUrl = localStorage.getItem('urlParams');
    //console.log(storageUrl.replace(/^\S+=[0-9|a-z]+&\b/gi));
  };
  handlerLocalStorageParams()

  const setUrl = (keyName, value) => {
    const newSearch = setSearchUrlParam(
    history.location.search, 
    keyName, 
    value
  );

    history.replace({
      search: newSearch
    }); 
    localStorage.setItem('urlParams', newSearch);
  };

  const getUrlFromLocalStorage = (callBackReturnReq) => {
    const saveUrlParams = localStorage.getItem('urlParams');
    const test = saveUrlParams != null && saveUrlParams.split('&');
    test.length && test.forEach((item) => {
      let key = item.split('=')[0];
      let value = item.split('=')[1];
      return callBackReturnReq(key, value);
    });
  };

  return {
    setUrl,
    getUrlFromLocalStorage,
  };
}

export default UrlHandler;