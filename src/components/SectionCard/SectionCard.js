import './SectionCard.css';
import React from 'react';
import CardImage from '../CardImage/CardImage';
import { CurrentDataContext } from '../../context/CurrentDataContext';

function SectionCard({ listCard, isLoading }) {
  const db = React.useContext(CurrentDataContext);

  if (isLoading) {
    return <h1>LOADING...</h1>
  }
  
  return (
    <section className='section-card'>
      {listCard.map((dataCard) => {
        const authorOfCard = (dataCard) => db.authors.find((author) => author.id === dataCard.authorId).name;
        const locationOfCard = (dataCard) => db.locations.find((location) => location.id === dataCard.locationId).location;
        return (
          <CardImage 
            key={dataCard.id}
            dataCard={dataCard}
            authorOfCard={authorOfCard(dataCard)}
            locationOfCard={locationOfCard(dataCard)}
          />
        );
      })}
    </section>
  );
}

export default SectionCard;