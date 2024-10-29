import React, { useEffect, useState } from 'react'
import cardsService from '../../servies/cards'
import Card from '../Card/Card.jsx'

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


    return (
        <div>
            {cards.map(card =>
                <Card card={card} key={card.id} />
            )}
        </div>
    )
}

export default Cards