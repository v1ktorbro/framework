import './CardImage.css';
import React from 'react';
import api from '../../utils/Api';

function CardImage({ dataCard, authorOfCard, locationOfCard}) {
  const [isHoverCard, setIsHoverCard] = React.useState(false);
  const url = api.url;

  const handlerHoverState = () => {
    setIsHoverCard(prev => !prev);
  };

  return (
    <article className='card-image' onMouseEnter={handlerHoverState} onMouseLeave={handlerHoverState} >
      <img alt={`Picture: ${dataCard.name}`} className='card-image__image' src={`${url}${dataCard.imageUrl}`} />
      <div className='card-image__title-container'>
        <h2 className='card-image__title'>{dataCard.name}</h2>
        { isHoverCard &&
          <>
            <h3 className='card-image__subtitle'>Author: 
              <span className='card-image__subtitle-content'>{authorOfCard}</span>
            </h3>
            <h3 className='card-image__subtitle'>Created: 
              <span className='card-image__subtitle-content'>{dataCard.created}</span>
            </h3>
            <h3 className='card-image__subtitle'>Location: 
              <span className='card-image__subtitle-content'>{locationOfCard}</span>
            </h3>
          </>
        }
      </div>
    </article>
  );
}

export default CardImage;