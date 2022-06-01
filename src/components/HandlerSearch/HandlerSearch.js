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

  function setterLists(paints, authors, locations) {
    paints !== undefined && setListPaintings(paints);
    authors !== undefined && setListAuthors(authors);
    locations !== undefined && setListLocations(locations);
  }

  const newList = (arrList, reqParamSearch) => arrList.filter((itemList) => itemList[reqParamSearch] == searchData[reqParamSearch]);
  const newUniqAuthorList = (listPaints) => handlerUniqueValues(listPaints, 'authorId', db.authors); 
  const newUniqLocationsList = (listPaints) => handlerUniqueValues(listPaints, 'locationId', db.locations); 

  const arrSearchOnDate = (secondParamSearch) => {
    const isSearchOnlYByDate = reqParamSearch.length == 1 ? true : false;
    const newListPaintings = db.paintings.filter((itemList) => itemList.created >= searchData.created.from && itemList.created <= searchData.created.before);
    const newListAuthors = newUniqAuthorList(newListPaintings);
    const newListLocations = newUniqLocationsList(newListPaintings);
    isSearchOnlYByDate ? setListPaintings(newListPaintings) : setListPaintings(newList(newListPaintings, secondParamSearch));
    setListAuthors(newListAuthors);
    setListLocations(newListLocations);
  };

  const searchByTwoParameters = (firstValueField, secondValueField) => {
    //если второго поля нет, то новый список будет отфильтрован по db.paintings
    const newListPaintings = secondValueField == undefined ? newList(db.paintings, firstValueField) : newList(listPaintings, secondValueField);
    const newListAuthors = newUniqAuthorList(newListPaintings);
    const newListLocations = newUniqLocationsList(newListPaintings);

    switch (firstValueField) {
      case 'name':
        setterLists(newListPaintings, newListAuthors, newListLocations);
        break;
      case 'authorId':
        if (secondValueField == 'name') {
          setterLists(newListPaintings, newListAuthors, newListLocations);
        }
        if (secondValueField == 'locationId') {
          const newListAuthors = handlerUniqueValues(newList(db.paintings, secondValueField), 'authorId', db.authors);
          const newListLocations = handlerUniqueValues(newList(db.paintings, firstValueField), 'locationId', db.locations);
          setterLists(newListPaintings, newListAuthors, newListLocations);
        }
        if (secondValueField == 'created') {
          arrSearchOnDate(firstValueField);
        }
        //if only author
        if (secondValueField == undefined) {
          setterLists(newListPaintings, db.authors, newListLocations);
        }
        break;
      case 'locationId':
        if (secondValueField == 'name') {
          setterLists(newListPaintings, newListAuthors, newListLocations);
        }
        if (secondValueField == 'authorId') {
          const newListAuthors = handlerUniqueValues(newList(db.paintings, firstValueField), 'authorId', db.authors);
          const newListLocations = handlerUniqueValues(newList(db.paintings, secondValueField), 'locationId', db.locations);
          setterLists(newListPaintings, newListAuthors, newListLocations);
        }
        if (secondValueField == 'created') {
          arrSearchOnDate(firstValueField);
        }
        //if only locationId
        if (secondValueField == undefined) {
          setterLists(newListPaintings, newListAuthors, db.locations);
        }
        break;
      case 'created': 
        if (secondValueField == 'authorId') {
          setterLists(newListPaintings, newListAuthors, newListLocations);
        }
        if (secondValueField == 'locationId') {
          setterLists(newListPaintings, newListAuthors);
        }
        //if only created
        if (secondValueField == undefined) {
          arrSearchOnDate();
        }
        break;
    }
  };

  const handlerValueSearchData = () => {
    if (!reqParamSearch.length) {
      setInitialData(db);
    } else if (reqParamSearch.length == 1) {
        searchByTwoParameters(reqParamSearch[0]);
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
  };
}

export default searchController;