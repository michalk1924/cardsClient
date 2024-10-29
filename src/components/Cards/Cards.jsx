import React, { useEffect, useState } from 'react'
import cardsService from '../../servies/cards'
import Card from '../Card/Card.jsx'
import styles from './Cards.module.css'
import { IoMdAdd } from'react-icons/io';

function Cards() {


    const [cards, setCards] = useState([]);

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

    const addCard = async () => {
        try {
            const response = await cardsService.createCard({});
            setCards([...cards, response]);
        }
        catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className={styles.cards}>
            {cards.map(card =>
                <Card card={card} key={card.id} setCards={setCards} />
            )}
            <div className={styles.buttonContainer}><button className={styles.addButton} onClick={addCard} ><IoMdAdd /></button></div>

        </div>
    )
}

export default Cards