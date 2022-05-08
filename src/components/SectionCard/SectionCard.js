import './SectionCard.css';
import React from 'react';
import CardImage from '../CardImage/CardImage';

function SectionCard({ listCard, listAuthors, listLocations }) {
  return (
    <section className='section-card'>
      {listCard.map((dataCard) => {
        return (
          <CardImage 
            key={dataCard.id}
            dataCard={dataCard}
            authorOfCard={listAuthors[dataCard.authorId - 1].name}
            locationOfCard={listLocations[dataCard.locationId - 1].location}
          />
        );
      })}
    </section>
  );
}

export default SectionCard;