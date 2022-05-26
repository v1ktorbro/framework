import React from 'react';

function searchController (searchData, reqParamSearch, db, setter) { 
  //const handler = handlerSearch(searchData);
  const [listPaintings, setListPaintings] = React.useState([]);
  const [listAuthors, setListAuthors] = React.useState([]);
  const [listLocations, setListLocations] = React.useState([]);
  //console.log(searchData, reqParamSearch, db);
  //const [reqParamSearch, setReqParamSearch] = React.useState([]);

  const onChange = (someFun) => {
    //console.log('listPaintings', listPaintings);
    someFun(listPaintings);
  };

  const setInitialData = () => {
    setListPaintings(db.paintings);
    setListAuthors(db.authors);
    setListLocations(db.locations);
  };

  const filterNewArrFromApi = (arrFromApi, keyNameId, listArrData) => {
    let arrUniqueId = [];
    let newArr = [];
    const obj = {};
    for (let i = 0; i < arrFromApi.length; i++) {
      const currentEl = arrFromApi[i][keyNameId];
      if (!(currentEl in obj)) {
        obj[currentEl] = 1;
      } else {
        obj[currentEl] += 1;
      }
    }
    const keys = Object.keys(obj);
    keys.forEach((key) => arrUniqueId.push(key));
    arrUniqueId.forEach((id) => newArr.push(listArrData[id - 1]));
    return newArr;
  };

  const searchByOneParametr = (valueField) => {
    const newList = (arrList, reqParamSearch) => arrList.filter((itemList) => itemList[reqParamSearch] == searchData[reqParamSearch]);
    const newListPaintings = newList(db.paintings, valueField);
    switch (valueField) {
      case 'name':
        setListPaintings(newListPaintings);
        setListAuthors(filterNewArrFromApi(newListPaintings, 'authorId', db.authors));
        setListLocations(filterNewArrFromApi(newListPaintings, 'locationId', db.locations));
        break;
      case 'authorId':
        setListPaintings(newListPaintings);
        setListLocations(filterNewArrFromApi(newListPaintings, 'locationId', db.locations));
        setListAuthors(db.authors);
        break;
      case 'locationId':
        setListPaintings(newListPaintings);
        setListAuthors(filterNewArrFromApi(newListPaintings, 'authorId', db.authors));
        setListLocations(db.locations);
        break;
    }
  };

  const searchByTwoParameters = (firstValueField, secondValueField) => {
    const newList = (arrList, reqParamSearch) => arrList.filter((itemList) => itemList[reqParamSearch] == searchData[reqParamSearch]);
    const newListPaintings = newList(listPaintings, secondValueField);
    const newListLocations = filterNewArrFromApi(newListPaintings, 'locationId', db.locations);
    const newListAuthors = filterNewArrFromApi(newListPaintings, 'authorId', db.authors);
    switch (firstValueField) {
      case 'name':
        if (secondValueField == 'authorId') {
          setListPaintings(newListPaintings);
          setListLocations(newListLocations);
        }
        if (secondValueField == 'locationId') {
          setListPaintings(newListPaintings);
          setListLocations(newListLocations);
          setListAuthors(newListAuthors);
        }
        break;
      case 'authorId':
        if (secondValueField == 'name') {
          setListPaintings(newListPaintings);
          setListAuthors(newListAuthors);
          setListLocations(newListLocations);
        }
        if (secondValueField == 'locationId') {
          const newListAuthors = filterNewArrFromApi(newList(db.paintings, firstValueField), 'authorId', db.authors);
          setListPaintings(newListPaintings);
          setListAuthors(newListAuthors);
        }
        break;
      case 'locationId':
        if (secondValueField == 'name') {
          setListPaintings(newListPaintings);
          setListAuthors(newListAuthors);
          setListLocations(newListLocations);
        }
        if (secondValueField == 'authorId') {
          const newListAuthors = filterNewArrFromApi(newList(db.paintings, firstValueField), 'authorId', db.authors);
          const newListLocation = filterNewArrFromApi(newList(db.paintings, secondValueField), 'locationId', db.locations);
          setListPaintings(newListPaintings);
          setListAuthors(newListAuthors);
          setListLocations(newListLocation);
        }
        break;
    }
  };

  const handlerValueSearchData = () => {
    if (!reqParamSearch.length) {
      setInitialData();
    } else if (reqParamSearch.length == 1) {
        searchByOneParametr(reqParamSearch[0]);
    } else if (reqParamSearch.length == 2) {
        reqParamSearch.reduce((prevValue, currentValue) => {
          searchByTwoParameters(prevValue, currentValue);
        });
    } else if (reqParamSearch.length == 3) {
      reqParamSearch.reduce((prevValue, currentValue) => {
        if (currentValue == reqParamSearch[reqParamSearch.length - 1]) {
          prevValue = reqParamSearch[reqParamSearch.length - 2];
          searchByTwoParameters(prevValue, currentValue);
        }
      });
    }
  };

  React.useEffect(() => {
    Object.keys(db).length && handlerValueSearchData();
  }, [reqParamSearch]);

  React.useEffect(() => {
    //handlerValueSearchData();
  console.log(listPaintings);
  //setListPaintings(listPaintings);
  //setter();
  }, [listPaintings]);

  return {
    onChange,
    listPaintings,
    listAuthors,
    listLocations,
  };
}

export default searchController;