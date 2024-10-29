import React from 'react'
import styles from './Colors.module.css'
import cardsService from '../../servies/cards'

const colors = [
    'red',
    'green',
    'yellow',
    'blue',
]

function Colors({ cardId, setCards }) {

    const changeColor = (color) => {
        try {
            cardsService.updateCard(cardId, { color: color });
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
        <div id={`colors${cardId}`} className={styles.colors}>
            {colors.map(color =>
                <div onClick={()=>changeColor(color)} key={color} className={`${styles.colorCircle} ${styles[color]}`} />
            )}
        </div>
    )
}

export default Colors