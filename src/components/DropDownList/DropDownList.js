import './DropDownList.css';

function DropDownList({ theme, data }) {
  return (
    <ul className={`drop-down-list drop-down-list_${theme}`}>
    {data.map((comment, index) => {
      return (
        <li 
          key={index} 
          className='drop-down-list__item'
          >
            <span className='drop-down-list__text-item'>{comment.author}</span>
        </li>
      );
    })}
    </ul>
  );
}

export default DropDownList;