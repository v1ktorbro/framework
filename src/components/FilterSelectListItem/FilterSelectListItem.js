import './FilterSelectListItem.css';
import React from 'react';
import BtnSwitchBlind from '../BtnSwitchBlind/BtnSwitchBlind';
import BtnResetCross from '../BtnResetCross/BtnResetCross';
import DropDownList from '../DropDownList/DropDownList';
import { borderStyleHandlerThemeForFilter } from '../../utils/utils';

function FilterSelectListItem ({theme, data, nameFilter, handlerSelectList}) {
  const [isOpenListAuthor, setIsOpenListAuthor] = React.useState(false);
  const [isFocus, setIsFocus] = React.useState(false);
  const [selectValue, setSelectValue] = React.useState('');

  const toggleOpenListAuthor = () => {
    setIsOpenListAuthor(prev => !prev);
    setIsFocus(prev => !prev);
  };

  const selectItemList = (evt) => {
    const {textContent} = evt.currentTarget;
    handlerSelectList(textContent);
    setSelectValue(textContent);
    toggleOpenListAuthor();
  };

  const handlerReset = () => {
    handlerSelectList('');
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
            />
          }
          <BtnSwitchBlind
            theme={theme}
            isOpen={isOpenListAuthor}
            onClick={toggleOpenListAuthor}
          />
        </div>
      </div>
      <DropDownList 
        theme={theme}
        data={data}
        isOpen={isOpenListAuthor}
        onClickSelectItem={selectItemList}
      />
    </nav>
  );
}

export default FilterSelectListItem;