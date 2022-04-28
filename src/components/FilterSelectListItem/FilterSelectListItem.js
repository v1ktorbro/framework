import './FilterSelectListItem.css';
import React from 'react';
import BtnSwitchBlind from '../BtnSwitchBlind/BtnSwitchBlind';
import BtnResetCross from '../BtnResetCross/BtnResetCross';
import DropDownList from '../DropDownList/DropDownList';
import { borderStyleHandlerThemeForFilter } from '../../utils/utils';

function FilterSelectListItem ({theme, data}) {
  const [isOpenListAuthor, setIsOpenListAuthor] = React.useState(false);
  const [isFocus, setIsFocus] = React.useState(false);

  const toggleOpenListAuthor = (evt) => {
    setIsOpenListAuthor(prev => !prev);
    setIsFocus(prev => !prev);
  };

  React.useEffect(() => {
    const filterContainer = document.querySelector('.filter-select-list-item__container');
    borderStyleHandlerThemeForFilter(filterContainer, theme, isOpenListAuthor, isFocus);
  }, [isOpenListAuthor, theme, isFocus])

  return (
    <nav className={`filter-select-list-item filter-select-list-item_${theme}`}>
      <div className={`filter-select-list-item__container filter-select-list-item__container_${theme} ${isFocus && `filter-select-list-item__container_focus-${theme}`}`}>
        <input className='filter-select-list-item__input-display-selected-text' disabled placeholder='Author'/>
        <div className='filter-select-list-item__btn-container'>
          <BtnResetCross 
            theme={theme}
            hStyle={{
              position: 'relative',
              marginRight: '5px',
            }}
          />
          <BtnSwitchBlind
            theme={theme}
            onClick={toggleOpenListAuthor}
          />
        </div>
      </div>
      <DropDownList 
        theme={theme}
        data={data}
        isOpen={isOpenListAuthor}
      />
    </nav>
  );
}

export default FilterSelectListItem;