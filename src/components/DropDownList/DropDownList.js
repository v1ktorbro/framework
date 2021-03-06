import './DropDownList.css';
import React from 'react';
import { CurrentThemeContext } from '../../context/CurrentThemeContext';

function DropDownList({ data, keyNameForListData, isOpen, onClickSelectItem, isFocus }) {
  const theme = React.useContext(CurrentThemeContext);
  
  return (
    <ul 
      className={`drop-down-list drop-down-list_theme-${theme} ${isOpen ? 'drop-down-list_open' : 'drop-down-list_close'} ${isFocus ? 'drop-down-list_focus' : ''}`}
    >
    {data.map((item) => {
      return (
        <li 
          key={item.id}
          id={item.id}
          className='drop-down-list__item'
          onMouseDown={(evt) => onClickSelectItem(evt)}
        >
            <span 
              className='drop-down-list__text-item'
            >{item[keyNameForListData]}</span>
        </li>
      );
    })}
    </ul>
  );
}

export default DropDownList;