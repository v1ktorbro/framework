import './FilterSelectListItem.css';
import React from 'react';
import { CurrentThemeContext } from '../../context/CurrentThemeContext';
import { CurrentDataSearchContext } from '../../context/CurrentDataSearchContext';
import { CurrentDataContext } from '../../context/CurrentDataContext';
import BtnSwitchBlind from '../BtnSwitchBlind/BtnSwitchBlind';
import BtnResetCross from '../BtnResetCross/BtnResetCross';
import DropDownList from '../DropDownList/DropDownList';
import { borderStyleHandlerThemeForFilter } from '../../utils/utils';

function FilterSelectListItem ({ data, keyNameForListData, nameFilter, handlerSetValueParamSearch }) {
  const theme = React.useContext(CurrentThemeContext);
  const initialDb = React.useContext(CurrentDataContext);
  const searchData = React.useContext(CurrentDataSearchContext);
  const [isOpenListAuthor, setIsOpenListAuthor] = React.useState(false);
  const [isFocus, setIsFocus] = React.useState(false);
  const [selectValue, setSelectValue] = React.useState('');

  const valueOfInputFromSearchData = (db, key) => {
    const currentList = db[`${nameFilter.toLowerCase()}s`];
    const currentValue = currentList.find((item) => item.id == searchData[`${nameFilter.toLowerCase()}Id`]);
    return currentValue == undefined ? '' : currentValue[key];
  };

  const toggleOpenListAuthor = () => {
    setIsOpenListAuthor(prev => !prev);
    setIsFocus(prev => !prev);
  };

  const selectItemList = (evt) => {
    const {textContent, id} = evt.currentTarget;
    handlerSetValueParamSearch(`${nameFilter.toLowerCase()}Id`, id);
    setSelectValue(textContent);
    toggleOpenListAuthor();
  };

  const handlerReset = () => {
    handlerSetValueParamSearch(`${nameFilter.toLowerCase()}Id`, '');
    setSelectValue('');
    setIsOpenListAuthor(false);
    setIsFocus(false);
  };

  const onBlur = (evt) => {
    const thisComponent = document.getElementById(`filter-select-list-${nameFilter.toLowerCase()}`);
    const isClickInsideComponent = thisComponent.contains(evt.target);
    if (!isClickInsideComponent) {
      setIsFocus(false);
      setIsOpenListAuthor(false);
    }
  };

  const escBtnListener = (evt) => {
    if(evt.key === 'Escape' || evt.keyCode === 27) {
      setIsFocus(false);
      setIsOpenListAuthor(false);
    }
  };

  React.useEffect(() => {
    const filterContainer = document.getElementById(`filter-select-list-${nameFilter.toLowerCase()}`).querySelector('.filter-select-list-item__container');
    borderStyleHandlerThemeForFilter(filterContainer, theme, isOpenListAuthor, isFocus);
  }, [isOpenListAuthor, theme, isFocus]);

  React.useEffect(() => {
    document.addEventListener('click', onBlur);
    return () => document.removeEventListener('click', onBlur);
  }, [isFocus]);

  React.useEffect(() => {
    if (Object.keys(initialDb).length) {
      nameFilter == 'Author' && setSelectValue(valueOfInputFromSearchData(initialDb, 'name'));
      nameFilter == 'Location' && setSelectValue(valueOfInputFromSearchData(initialDb, 'location'));
    }
  }, [initialDb]);

  return (
    <nav 
      className={`filter-select-list-item filter-select-list-item_${theme}`}
      onClick={() => setIsFocus(true)}
      tabIndex="0"
      onKeyDown={escBtnListener}
      id={`filter-select-list-${nameFilter.toLowerCase()}`}
    >
      <div className={`filter-select-list-item__container filter-select-list-item__container_${theme} ${isFocus && `filter-select-list-item__container_focus-${theme}`}`}>
        <input 
          className='filter-select-list-item__input-display-selected-text' 
          value={selectValue}
          disabled 
          placeholder={nameFilter} 
        />
        <div className='filter-select-list-item__btn-container'>
          {selectValue.length > 0 &&
            <BtnResetCross 
              theme={theme}
              onClick={handlerReset}
              style={{marginLeft: '10px'}}
            />
          }
          <BtnSwitchBlind
            theme={theme}
            isOpen={isOpenListAuthor}
            onClick={toggleOpenListAuthor}
            style={{marginLeft: '10px'}}
          />
        </div>
      </div>
      <DropDownList
        data={data}
        isOpen={isOpenListAuthor}
        onClickSelectItem={selectItemList}
        keyNameForListData={keyNameForListData}
      />
    </nav>
  );
}

export default FilterSelectListItem;