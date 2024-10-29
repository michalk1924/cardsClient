import React, { useState } from 'react'
import styles from './Card.module.css'
import cardsService from '../../servies/cards'
import Colors from '../Colors/Colors'
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

  const handleEnterPress = async (e) => {
    if (e.key === 'Enter' && card.text.trim()) {
     changeText(e.target.value);
    }
  };

  const changeText = async (updatedText) => {
    try {
      await cardsService.updateCard(card.id,{ text: updatedText });
      setCards(prev => prev.map(c => c.id === card.id ? { ...c, text: updatedText } : c));
      setIsInputText(false);
    }
    catch (error) {
      console.log('Error updating card text');
    }
  }

  const handleTextChange = (newText) => {
    setCards(prev => prev.map(c => c.id === card.id ? { ...c, text: newText } : c));
  };


  return (
    <div className={`${styles.card} ${styles[card.color]}`}>
      <h2 id={`text${card.id}`} onClick={() => { setIsInputText(true) }}>
        {!isInputText && <span>{card.text}</span>}
        {isInputText && <input type="text" value={card.text}
          onChange={(e) => handleTextChange(e.target.value)}
          onKeyDown={handleEnterPress} />}
      </h2>
      <button onClick={showColorsF}><AiOutlineBgColors /></button>
      <button onClick={deleteCard}><MdDeleteSweep /></button>
      {showColors && <Colors cardId={card.id} setCards={setCards} />}
    </div>
  )
}

export default Card;