import React from 'react'
import styles from './Card.module.css'

function card({card}) {

    const showColors = () => {
        document.getElementById('colors').classList.add('hidden')
    }

  return (
    <div className={`${styles.card} ${styles[card.color]}`}>
        <h2>{card.text}</h2>
        <button onClick={showColors} >colors</button>
        <button>delete</button>
    </div>
  )
}

export default card;