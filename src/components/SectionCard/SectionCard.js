import './SectionCard.css';
import React from 'react';
import CardImage from '../CardImage/CardImage';

function SectionCard({theme, data}) {
  return (
    <section className={`section-card section-card_${theme}`}>
      {data.map((itemData) => {
        return (
          <CardImage 
            key={itemData.id}
            dataCard={itemData}
          />
        );
      })}
    </section>
  );
}

export default SectionCard;