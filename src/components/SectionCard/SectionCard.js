import './SectionCard.css';
import React from 'react';
import CardImage from '../CardImage/CardImage';

function SectionCard({ listCard, listAuthors, listLocations }) {
  const authorOfCard = (dataCard) => listAuthors.find((author) => author.id === dataCard.authorId).name;

  return (
    <section className='section-card'>
      {listCard.map((dataCard) => {
        return (
          <CardImage 
            key={dataCard.id}
            dataCard={dataCard}
            authorOfCard={authorOfCard(dataCard)}
            //locationOfCard={listLocations[dataCard.locationId - 1].location}
          />
        );
      })}
    </section>
  );
}

export default SectionCard;