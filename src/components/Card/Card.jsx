import React, { useState } from 'react'
import styles from './Card.module.css'
import cardsService from '../../servies/cards'
import Colors from '../Colors/ColorsSlector'
import { AiOutlineBgColors } from 'react-icons/ai';
import { MdDeleteSweep } from 'react-icons/md';

function Card({ card, setCards }) {

  const [showColors, setShowColors] = useState(false);
  const [isInputText, setIsInputText] = useState(false);

  const showColorsF = () => {
    setShowColors(prev => !prev);
  }

  const deleteCard = async () => {
    try {
      await cardsService.deleteCard(card.id);
      setCards(prev => prev.filter(c => c.id !== card.id));
    }
    catch (error) {
      console.log('Error deleting card');
    }
  }

  const changeText = async (updatedText) => {
    try {
      if (updatedText === '') {
        updatedText = "..."
      }
      await cardsService.updateCard(card.id, { text: updatedText });
      setCards(prev => prev.map(c => c.id === card.id ? { ...c, text: updatedText } : c));
      setIsInputText(false);
    }
    catch (error) {
      console.log('Error updating card text');
    }
  }

  const handleTextChange = (newText) => {
    setCards(prev => prev.map(c => c.id === card.id ? { ...c, text: newText } : c));
  }

  const onColorChange = async (cardId, color) => {
    try {
      console.log(cardId, color);
      await cardsService.updateCard(cardId, { color: color });
      setCards((prevCards) => {
        const cardIndex = prevCards.findIndex((c) => c.id === cardId);
        if (cardIndex === -1) return prevCards;
        const updatedCards = [...prevCards];
        updatedCards[cardIndex] = { ...updatedCards[cardIndex], color };
        return updatedCards;
      });
    }
    catch (err) {
      console.log(err.message);
    }
  }

  return (
    <div className={`${styles.card} ${styles[card.color]}`}>
      <h2 id={`text${card.id}`} onClick={() => { setIsInputText(true)}}>
        {!isInputText && <span>{card.text}</span>}
        {isInputText && <input type="text" value={card.text}
          onChange={(e) => handleTextChange(e.target.value)}
          onKeyDown={e => e.key === 'Enter' ? changeText(e.target.value) : {}}
          onBlur={(e) => changeText(e.target.value)} />}
      </h2>
      <button onClick={showColorsF}><AiOutlineBgColors /></button>
      <button onClick={deleteCard}><MdDeleteSweep /></button>
      {showColors && <Colors id={card.id} onColorChange={onColorChange} />}
    </div>
  )
}

export default Card;