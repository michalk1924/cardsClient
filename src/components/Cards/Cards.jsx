import React, { useEffect, useState } from 'react'
import cardsService from '../../servies/cards'
import Card from '../Card/Card.jsx'
import styles from './Cards.module.css'
import { IoMdAdd } from 'react-icons/io';
import { CiSearch } from "react-icons/ci";


function Cards() {

    const [cards, setCards] = useState([]);
    const [allCards, setAllCards] = useState([]);
    const [searchInput, setSearchInputValue] = useState('');

    useEffect(() => {
        const fetchCards = async () => {
            try {
                const data = await cardsService.getAllCards();
                setAllCards(data);
                setCards(data);
            } catch (err) {
                console.log(err.message);
            }
        };
        fetchCards();
    }, []);

    useEffect(() => {
        if (localStorage.getItem('searchInput')) {
            setSearchInputValue(localStorage.getItem('searchInput'));

        }
    }, []);

    useEffect(() => {
        localStorage.setItem('searchInput', searchInput);
        const searchData = allCards.filter(card =>
            card.text.toLowerCase().includes(searchInput.toLowerCase()) || card?.isNewCard
        );
        setCards(searchData);
    }, [searchInput, allCards]);

    const addCard = async () => {
        try {
            const response = await cardsService.createCard({});
            setAllCards([...cards, { ...response, isNewCard: true }]);
        }
        catch (error) {
            console.log(error.message);
        }
    }

    const updateCard = async (id, updatedCard) => {
        try {
            await cardsService.updateCard(id, updatedCard);
            setAllCards(prev => prev.map(c => c.id === id ? updatedCard : c));
        }
        catch (error) {
            console.log('Error updating card');
        }
    }

    const updateCardLocali = (id, updatedCard) => {
        setCards(prev => prev.map(c => c.id === id ? updatedCard : c));
    }

    const deleteCard = async (id) => {
        try {
            await cardsService.deleteCard(id);
            setAllCards(prev => prev.filter(c => c.id !== id));
        }
        catch (error) {
            console.log('Error deleting card');
        }
    }

    const handleSearchInputChange = (event) => {
        setSearchInputValue(event.target.value);
    };

    return (
        <div className={styles.cards}>
            <div className={styles.serachDiv}>
                <input value={searchInput} type="text" name='search' onChange={handleSearchInputChange} />
                <CiSearch />
            </div>
            {cards.map(card =>
                <Card card={card} key={card.id} setCards={setCards}
                    updateCard={updateCard}
                    deleteCard={deleteCard}
                    updateCardLocali={updateCardLocali} />
            )}
            <div className={styles.buttonContainer}>
                <button className={styles.addButton} onClick={addCard} >
                    <IoMdAdd />
                </button>
            </div>
        </div>
    )
}

export default Cards