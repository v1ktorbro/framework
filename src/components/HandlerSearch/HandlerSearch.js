import React from 'react';

function searchController (searchData, reqParamSearch, db, callBackReturnNewArrList) {
  const [listPaintings, setListPaintings] = React.useState([]);
  const [listAuthors, setListAuthors] = React.useState([]);
  const [listLocations, setListLocations] = React.useState([]);

  const setInitialData = (db) => {
    setListPaintings(db.paintings);
    setListAuthors(db.authors);
    setListLocations(db.locations);
  };

  const handlerUniqueValues = (arrFromApi, keyNameId, listArrData) => {
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
    const newListCreated = db.paintings.filter((itemList) => itemList.created >= searchData.created.from && itemList.created <= searchData.created.before);
    switch (valueField) {
      case 'name':
        setListPaintings(newListPaintings);
        setListAuthors(handlerUniqueValues(newListPaintings, 'authorId', db.authors));
        setListLocations(handlerUniqueValues(newListPaintings, 'locationId', db.locations));
        break;
      case 'authorId':
        setListPaintings(newListPaintings);
        setListLocations(handlerUniqueValues(newListPaintings, 'locationId', db.locations));
        setListAuthors(db.authors);
        break;
      case 'locationId':
        setListPaintings(newListPaintings);
        setListAuthors(handlerUniqueValues(newListPaintings, 'authorId', db.authors));
        setListLocations(db.locations);
        break;
      case 'created': 
        setListPaintings(newListCreated);
        setListAuthors(handlerUniqueValues(newListCreated, 'authorId', db.authors));
        setListLocations(handlerUniqueValues(newListCreated, 'locationId', db.locations));
        break;
    }
  };

  const searchByTwoParameters = (firstValueField, secondValueField) => {
    const newList = (arrList, reqParamSearch) => arrList.filter((itemList) => itemList[reqParamSearch] == searchData[reqParamSearch]);
    const newListPaintings = newList(listPaintings, secondValueField);
    const newListLocations = handlerUniqueValues(newListPaintings, 'locationId', db.locations);
    const newListAuthors = handlerUniqueValues(newListPaintings, 'authorId', db.authors);
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
          const newListAuthors = handlerUniqueValues(newList(db.paintings, firstValueField), 'authorId', db.authors);
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
          const newListAuthors = handlerUniqueValues(newList(db.paintings, firstValueField), 'authorId', db.authors);
          const newListLocations = handlerUniqueValues(newList(db.paintings, secondValueField), 'locationId', db.locations);
          setListPaintings(newListPaintings);
          setListAuthors(newListAuthors);
          setListLocations(newListLocations);
        }
        break;
      case 'created': 
        if (secondValueField == 'authorId') {
          setListPaintings(newListPaintings);
          setListAuthors(newListAuthors);
          setListLocations(newListLocations);
        }
        if (secondValueField == 'locationId') {
          setListPaintings(newListPaintings);
          setListAuthors(newListAuthors);
        }
        break;
    }
  };

  const handlerValueSearchData = () => {
    if (!reqParamSearch.length) {
      setInitialData(db);
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
  callBackReturnNewArrList(listPaintings, 'listPaintings');
  }, [listPaintings]);

  React.useEffect(() => {
  callBackReturnNewArrList(listAuthors, 'listAuthors');
  }, [listAuthors]);

  React.useEffect(() => {
  callBackReturnNewArrList(listLocations, 'listLocations');
  }, [listLocations]);

  return {
    setInitialData,
    listPaintings,
    listAuthors,
    listLocations,
  };
}

export default searchController;