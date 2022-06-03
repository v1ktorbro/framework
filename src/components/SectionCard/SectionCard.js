import './SectionCard.css';
import React from 'react';
import CardImage from '../CardImage/CardImage';

function SectionCard({ listCard, listAuthors, listLocations }) {
  const authorOfCard = (dataCard) => listAuthors.find((author) => author.id === dataCard.authorId).name;
  const locationOfCard = (dataCard) => listLocations.find((location) => location.id === dataCard.locationId).location;

  return (
    <section className='section-card'>
      {listCard.map((dataCard) => {
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