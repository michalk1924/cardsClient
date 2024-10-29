import React, { useState } from 'react'
import styles from './Card.module.css'
import cardsService from '../../servies/cards'
import Colors from '../Colors/Colors'

// const Colors = {
//   red: "#ff0000",
//   blue: "#0000ff",
//   green: "#00ff00",
//   yellow: "#ffff00",
//   orange: "#ffa500",
// };

function Card({ card, setCards }) {

  const [showColors, setShowColors] = useState(false);

  const showColorsF = () => {
    setShowColors(prev =>!prev);
  }

  const deleteCard = async () => {
    try {
      await cardsService.deleteCard(card.id);
      setCards(prev => prev.filter(c => c.id != card.id));
    }
    catch (error) {
      console.log('Error deleting card');
    }
  }

  return (
    <div className={`${styles.card} ${styles[card.color]}`}>
      <h2>{card.text}</h2>
      <button onClick={showColorsF}>colors</button>
      <button onClick={deleteCard}>delete</button>
      {showColors && <Colors cardId={card.id} setCards={setCards} />}
    </div>
  )
}

export default Card;