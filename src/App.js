import './App.css';
import Cards from './components/Cards/Cards';
import { useState } from'react';
import cardsService from './servies/cards';

function App() {

  const [cards, setCards] = useState([]);

  const addCard = async () => {
    try{
        const response = await cardsService.createCard({});
        setCards([...cards, response]);
    }
    catch(error){
        console.log(error.message);
    }
}

  return (
    <div className="App">
      <Cards cards={cards} setCards={setCards} />
      <button onClick={addCard}>Add Card</button>
    </div>
  );
}

export default App;
