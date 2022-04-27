import './DropDownList.css';

function DropDownList({ theme, data, isOpen, onClickSelectItem, isFocus }) {
  return (
    <ul 
      className={`drop-down-list drop-down-list_${theme} ${isOpen ? 'drop-down-list_open' : 'drop-down-list_close'} ${isFocus ? 'drop-down-list_focus' : ''}`}
    >
    {data.map((comment, index) => {
      return (
        <li 
          key={comment.id}
          id={comment.id}
          className='drop-down-list__item'
          onMouseDown={(evt) => onClickSelectItem(evt)}
        >
            <span 
              className='drop-down-list__text-item'
            >{comment.author}</span>
        </li>
      );
    })}
    </ul>
  );
}

export default DropDownList;