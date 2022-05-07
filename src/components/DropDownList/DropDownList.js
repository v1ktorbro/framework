import './DropDownList.css';

function DropDownList({ theme, data, keyNameForListData, isOpen, onClickSelectItem, isFocus }) {
  
  return (
    <ul 
      className={`drop-down-list drop-down-list_${theme} ${isOpen ? 'drop-down-list_open' : 'drop-down-list_close'} ${isFocus ? 'drop-down-list_focus' : ''}`}
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