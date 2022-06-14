import { useHistory } from 'react-router-dom';

function UrlHandler() {
  const history = useHistory();
  const availableParametrs = ['name', 'authorId', 'locationId', 'created'];

  const handlerParamFromBrowserApi = (urlSearchString, handlerSetValueParamSearch) => {
    const searchUrlParams = new URLSearchParams(urlSearchString);
    for (let i = 0; i < availableParametrs.length; i++) {
      const keyName = availableParametrs[i];
      const value = searchUrlParams.get(keyName);
      const isKeyNameHasValue = value !== (undefined || null);
      if (keyName == 'created' && isKeyNameHasValue) {
        const keyCreatedValue = {from: value.split('-')[0], before: value.split('-')[1]};
        handlerSetValueParamSearch(keyName, keyCreatedValue);
      }
      keyName != 'created' && isKeyNameHasValue && handlerSetValueParamSearch(keyName, value);
    }
  };

  const setSearchUrlParam = (searchString, keyName, value) => {
    const isCreatedParamSearch = keyName == 'created';
    const valueCreatedParamSearch = isCreatedParamSearch && (value.from.length && value.before.length) ? [value.from, value.before].join('-') : '';
    const searchUrlParams = new URLSearchParams(searchString);
    if (isCreatedParamSearch) {
      valueCreatedParamSearch.length ? searchUrlParams.set(keyName, valueCreatedParamSearch) : searchUrlParams.delete(keyName);
    } else {
      value.length ? searchUrlParams.set(keyName, value) : searchUrlParams.delete(keyName);
    }
    return searchUrlParams.toString();
  };

  const setUrlFromApp = (keyName, value) => {
    const newSearch = setSearchUrlParam(
    history.location.search, 
    keyName, 
    value,
    );
    history.replace({search: newSearch});
    localStorage.setItem('urlParams', newSearch);
  };

  const getUrlFromLocalStorage = (handlerSetValueParamSearch) => {
    const saveUrlParams = localStorage.getItem('urlParams');
    const reqeustToArrayConverter = saveUrlParams != null && saveUrlParams.length && saveUrlParams.split('&');
    reqeustToArrayConverter.length && reqeustToArrayConverter.forEach((item) => {
      const keyName = item.split('=')[0];
      const processedValueNameField = item.split('=')[1].split('+').join(' ');
      const processedValueAuthorIdField = item.split('=')[1];
      const processedValueLocationIdField = item.split('=')[1];
      const processedValueCreatedField = {from: item.split('=')[1].split('-')[0], before: item.split('=')[1].split('-')[1]};
      keyName == 'name' && handlerSetValueParamSearch(keyName, processedValueNameField);
      keyName == 'authorId' && handlerSetValueParamSearch(keyName, processedValueAuthorIdField);
      keyName == 'locationId' && handlerSetValueParamSearch(keyName, processedValueLocationIdField);
      keyName == 'created' && handlerSetValueParamSearch(keyName, processedValueCreatedField);
    });
  };

  return {
    setUrlFromApp,
    getUrlFromLocalStorage,
    handlerParamFromBrowserApi,
  };
}

export default UrlHandler;