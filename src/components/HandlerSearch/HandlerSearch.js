import React from 'react';

function HandlerSearch (searchData, db, callBackReturnNewArrList) {
  const [listPaintings, setListPaintings] = React.useState([]);
  const [listAuthors, setListAuthors] = React.useState([]);
  const [listLocations, setListLocations] = React.useState([]);
  const [reqParamSearch, setReqParamSearch] = React.useState([]);
  const [isDuplicateReqParamSearch, setIsDuplicateReqParamSearch] = React.useState(false);
  const [filteredDbForUser, setFilteredDbForUser] = React.useState({ paintings: [], authors: [], locations: [] });
  const newUniqAuthorList = (listPaints) => handlerUniqueValues(listPaints, 'authorId', db.authors); 
  const newUniqLocationsList = (listPaints) => handlerUniqueValues(listPaints, 'locationId', db.locations); 

  // handler on search param list and return it
  const newList = (arrList, reqParamSearch) => {
    return arrList.filter((itemList) => {
      const isReqParamSearchCreated = reqParamSearch == 'created';
      const funcFilterOnData = (itemList.created >= searchData.created.from) && (itemList.created <= searchData.created.before);
      const funcFilterAnothers = itemList[reqParamSearch] == searchData[reqParamSearch];
      return isReqParamSearchCreated ? funcFilterOnData : funcFilterAnothers;
    });
  }

  const setInitialData = (db) => {
    setListPaintings(db.paintings);
    setListAuthors(db.authors);
    setListLocations(db.locations);
  };

  const handlerReqParamSearch = React.useCallback((keyName, value) => {
    const isDublikateKey = reqParamSearch.some((item) => item == keyName);
    setIsDuplicateReqParamSearch(isDublikateKey);
    const addParamSearch = () => !isDublikateKey && setReqParamSearch([...reqParamSearch, keyName]);
    const removeEmptyParam = () => setReqParamSearch(reqParamSearch.filter((item) => item != keyName));
    if (keyName == 'created') {
      value.from.length && value.before.length ? addParamSearch() : removeEmptyParam();
    } else {
      value.length ? addParamSearch() : removeEmptyParam();
    }
  }, [reqParamSearch]);

  //  сравнивает спискок картин по ключам и фильтрует их, если те повторяются 
  //  на выходе список с уникальными ключами
  const handlerUniqueValues = (arrWithNewPaints, keyNameId, arrBeingCompared) => {
    let arrUniqueId = [];
    let newArr = [];
    const obj = {};
    for (let i = 0; i < arrWithNewPaints.length; i++) {
      const currentEl = arrWithNewPaints[i][keyNameId];
      if (!(currentEl in obj)) {
        obj[currentEl] = 1;
      } else {
        obj[currentEl] += 1;
      }
    }
    const keys = Object.keys(obj);
    keys.forEach((key) => arrUniqueId.push(key));
    arrUniqueId.forEach((id) => newArr.push(arrBeingCompared[id - 1]));
    return newArr;
  };

  function setterLists(paints, authors, locations) {
    paints !== undefined && setListPaintings(paints);
    authors !== undefined && setListAuthors(authors);
    locations !== undefined && setListLocations(locations);
  }

  //  фильтрация по времени
  //  value приходит в формате: create: {from: '', before: ''}
  const arrSearchOnDate = (paramValueSearch) => {
    const isSearchOnlyByDateSearch = reqParamSearch.length == 1;
    const newListPaintings = newList(db.paintings, paramValueSearch);
    const newListAuthors = newUniqAuthorList(newListPaintings);
    const newListLocations = newUniqLocationsList(newListPaintings);
    isSearchOnlyByDateSearch ? setListPaintings(newListPaintings) : setListPaintings(newList(newListPaintings, paramValueSearch));
    setListAuthors(newListAuthors);
    setListLocations(newListLocations);
  };

  const requestHandler = (firstValueField, secondValueField) => {
    const isSecondValueFieldEmpty = (secondValueField == undefined);
    const newListPaintingsOnFirstField = newList(db.paintings, firstValueField);
    const newListNextParamSearch = newList(listPaintings, secondValueField);
    const handlerListPaintings = () => {
      //  если второго поля нет, то новый список будет отфильтрован по первому одному параметру
      if (isSecondValueFieldEmpty) {
        return newListPaintingsOnFirstField;
      } else {
        const newListPaintings = newList(newListPaintingsOnFirstField, secondValueField);
        //  если у нас дубликат ключа, то проходимся по всем картинкам, сначала ищем по первому полю и по второму
        //  иначе просто проходимся по массиву картинок, что осталось после предыдущего ключа
        return isDuplicateReqParamSearch ? newListPaintings : newListNextParamSearch;
      }
    };
    const newListPaintings =  handlerListPaintings();
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
        //  if only author
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
        //  if only locationId
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
        //  if only created
        if (secondValueField == undefined) {
          arrSearchOnDate(firstValueField);
        }
        break;
    }
  };

  const handlerSearch = () => {
    const reducerSeveralParam = () => {
      reqParamSearch.reduce((prevValue, currentValue) => {
        //  если первый элмент массива равен последнему в списке запросов
        //  то prevValue пусть равен предпоследнему элементу
        //  а currentValue крайнему
        if (currentValue == reqParamSearch[reqParamSearch.length - 1]) {
          prevValue = reqParamSearch[reqParamSearch.length - 2];
          requestHandler(prevValue, currentValue);
        }
      });
    };

    reqParamSearch.length == 0 && setInitialData(db);
    reqParamSearch.length == 1 && requestHandler(reqParamSearch[0]);
    reqParamSearch.length > 1 && reducerSeveralParam();
  };

  React.useEffect(() => {
    Object.keys(db).length && handlerSearch();
  }, [searchData, db, reqParamSearch]);

  React.useEffect(() => {
    setFilteredDbForUser({...filteredDbForUser, paintings: listPaintings, authors: listAuthors, locations: listLocations});
  }, [listPaintings, listAuthors, listLocations]);

  React.useEffect(() => {
    callBackReturnNewArrList(filteredDbForUser);
  }, [filteredDbForUser]);

  return {
    setInitialData,
    handlerReqParamSearch,
  };
}

export default HandlerSearch;