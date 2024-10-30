import React from 'react'
import styles from './ColorsSlector.module.css'

const colors = [
    'red',
    'green',
    'yellow',
    'blue',
]

function ColorsSlector({ id, onColorChange }) {

    return (
        <div id={`colors${id}`} className={styles.colorsSlector}>
            {colors.map(color =>
                <div onClick={() => onColorChange(color)} key={color}
                    className={`${styles.colorCircle} ${styles[color]}`} />
            )}
        </div>
    )
}

export default ColorsSlector