import styles from "./Game.module.css";
import Button from "./subComponents/Button";

const Game = ({ GameOver }) => {
  return (
    <div className={`container ${styles.game}`}>
      <div className={styles.container_title_and_man}>
        <div className={styles.view}>
          <div className="points">
            Sua pontuação: <span>000</span>
          </div>
          <h1>Jogo da Forca</h1>
          <div className="tip">
            Categoria: <span>Dica</span>
          </div>
        </div>
        <div className={styles.stick_man}>
        <div className={styles.forc}>
          <div className={styles.t1}></div>
          <div className={styles.t2}></div>
          <div className={styles.t3}></div>
          <div className={styles.t4}></div>
          <div className={styles.head}></div>
          <div className={styles.body}></div>
          <div className={styles.arm01}></div>
          <div className={styles.arm02}></div>
          <div className={styles.leg01}></div>
          <div className={styles.leg02}></div>
        </div>
        </div>
      </div>
      <Button text={"Enviar"} func={GameOver} />
    </div>
  );
};

export default Game;
