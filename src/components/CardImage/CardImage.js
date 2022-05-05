import './CardImage.css';
import React from 'react';

function CardImage({dataCard}) {
  const [isHoverCard, setIsHoverCard] = React.useState(false);

  const handlerHoverState = () => {
    setIsHoverCard(prev => !prev);
  };

  return (
    <article className='card-image' onMouseEnter={handlerHoverState} onMouseLeave={handlerHoverState} >
      <img alt='something image' className='card-image__image' src={dataCard.src} />
      <div className='card-image__title-container'>
        <h2 className='card-image__title'>{dataCard.title}</h2>
        { isHoverCard &&
          <>
            <h3 className='card-image__subtitle'>Author: 
              <span className='card-image__subtitle-content'>Rembrandt</span>
            </h3>
            <h3 className='card-image__subtitle'>Created: 
              <span className='card-image__subtitle-content'>1642</span>
            </h3>
            <h3 className='card-image__subtitle'>Location: 
              <span className='card-image__subtitle-content'>The Rijksmuseum</span>
            </h3>
          </>
        }
      </div>
    </article>
  );
}

export default CardImage;