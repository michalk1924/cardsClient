import React, { useState, useEffect } from 'react'
import styles from './Card.module.css'
import Colors from '../ColorsSlector/ColorsSlector'
import { AiOutlineBgColors } from 'react-icons/ai';
import { MdDeleteSweep } from 'react-icons/md';

function Card({ card, updateCard, updateCardLocali, deleteCard }) {

  const [showColors, setShowColors] = useState(false);
  const [isInputText, setIsInputText] = useState(false);

  useEffect(() => { if (card.isNewCard) setIsInputText(true) }, [card]);

  const showColorsF = () => {
    setShowColors(prev => !prev);
  }

  const changeText = async (updatedText) => {
    if (updatedText === '') {
      updatedText = "..."
    }
    await updateCard(card.id, { ...card, text: updatedText, isNewCard: false });
    setIsInputText(false);
  }

  const handleTextChange = (newText) => {
    updateCardLocali(card.id, { ...card, text: newText });
  }

  const onColorChange = async (color) => {
    await updateCard(card.id, { ...card, color: color });
  }

  const deleteThisCard = async () => {
    await deleteCard(card.id);
  }

  return (
    <div className={`${styles.card} ${styles[card.color]}`}>
      <p id={`text${card.id}`} onClick={() => { setIsInputText(true) }}>
        {!isInputText && <span>{card.text}</span>}
        {isInputText && <input type="text" value={card.text}
          onChange={(e) => handleTextChange(e.target.value)}
          onKeyDown={e => e.key === 'Enter' ? changeText(e.target.value) : {}}
          onBlur={(e) => changeText(e.target.value)} />}
      </p>
      <button onClick={showColorsF}><AiOutlineBgColors /></button>
      <button onClick={deleteThisCard}><MdDeleteSweep /></button>
      {showColors && <Colors id={card.id} onColorChange={onColorChange} />}
    </div>
  )
}

export default Card;