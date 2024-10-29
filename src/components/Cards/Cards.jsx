import React, { useEffect, useState } from 'react'
import cardsService from '../../servies/cards'
import Card from '../Card/Card.jsx'
import styles from './Cards.module.css'

function Cards({cards, setCards}) {

    useEffect(() => {
        const fetchCards = async () => {
            try {
                const data = await cardsService.getAllCards();
                setCards(data);
            }
            catch (err) {
                console.log(err.message);
            }
        }

        fetchCards();

    }, []);

    return (
        <div className={styles.cards}>
            {cards.map(card =>
                <Card card={card} key={card.id} setCards={setCards} />
            )}
        </div>
    )
}

export default Cards