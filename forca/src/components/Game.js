import React, { useEffect, useRef, useState } from "react";
import styles from "./Game.module.css";
import Button from "./subComponents/Button";

const Game = ({
  VerifyLetter,
  pickedCategory,
  pickedWord,
  letters,
  guessedLetters,
  errLetters,
  guesses,
  score,
}) => {

  const headRef = useRef(null)
  const bodyRef = useRef(null)
  const arm1Ref = useRef(null)
  const arm2Ref = useRef(null)
  const leg1Ref = useRef(null)
  const leg2Ref = useRef(null)

  const [letter, setLetter] = useState("")
  const inputRef = useRef(null)

  const handleSubmit = (e) =>{
    e.preventDefault()
    const l = letter.toUpperCase()
    VerifyLetter(l)
    setLetter("")

    inputRef.current.focus()
  }

  useEffect(() => {
    if(guesses === 6){
      headRef.current.style.display = "block"
    }
    if(guesses === 5){
      bodyRef.current.style.display = "block"
    }
    if(guesses === 4){
      arm1Ref.current.style.display = "block"
    }
    if(guesses === 3){
      arm2Ref.current.style.display = "block"
    }
    if(guesses === 2){
      leg1Ref.current.style.display = "block"
    }
    if(guesses === 1){
      leg2Ref.current.style.display = "block"
    }
  }, [guesses])

  return (
    <div className={`container ${styles.game}`}>
      <div className={styles.container_title_and_man}>
        <div className={styles.view}>
          <div className={styles.points}>
            Sua pontuação: <span>{score}</span>
          </div>
          <h1>Jogo da Forca</h1>
          <div className={styles.tip}>
            Categoria: <span>{pickedCategory}</span>
          </div>
        </div>
        <div className={styles.stick_man}>
          <div className={styles.forc}>
            <div className={styles.t1}></div>
            <div className={styles.t2}></div>
            <div className={styles.t3}></div>
            <div className={styles.t4}></div>
            <div ref={headRef} className={styles.head}></div>
            <div ref={bodyRef} className={styles.body}></div>
            <div ref={arm1Ref} className={styles.arm01}></div>
            <div ref={arm2Ref} className={styles.arm02}></div>
            <div ref={leg1Ref} className={styles.leg01}></div>
            <div ref={leg2Ref} className={styles.leg02}></div>
          </div>
        </div>
      </div>
      <div className={styles.letters}>
        {letters.map((letter, i) =>
          guessedLetters.includes(letter) ? (
            <span key={i} className={styles.letter}>
              {letter}
            </span>
          ) : (
            <span className={styles.box_blank}></span>
          )
          
        )}
      </div>

      <div className={styles.letters_send}>
        <p>Letras já utilizadas:</p>
        {errLetters.map((letter, i) => (
          <span key={i}>{letter},</span>
        ))}
      </div>

      <div className={styles.container_form}>
        <p>Tente adivinha uma letra da palavra: </p>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            name="letter"
            maxLength={"1"}
            required
            onChange={(e) => setLetter(e.target.value)}
            value={letter}
            ref={inputRef}
          />
          <Button text={"Enviar"} />
        </form>
      </div>
    </div>
  );
};

export default Game;
