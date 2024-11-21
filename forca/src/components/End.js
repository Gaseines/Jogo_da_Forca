import React from 'react'

//styles
import styles from './End.module.css'

//components
import Button from './subComponents/Button'

const End = ({Restart, score, word}) => {
  return (
    <div className="container">
      <h2>Game Over</h2>
      <h3>A palavra correta era: <span className={styles.word}>{word}</span></h3>
      <h3>Sua pontuação final foi : <span className={styles.score}>{score}</span></h3>
      <Button text={"Restart"} func={Restart} />
    </div>
  )
}

export default End
