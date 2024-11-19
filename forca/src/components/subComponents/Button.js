import styles from "./Button.module.css";

const Button = ({text, func}) => {
  return (
    <div>
      <button className={styles.button} onClick={func}>
        <span className={styles.circle1}></span>
        <span className={styles.circle2}></span>
        <span className={styles.circle3}></span>
        <span className={styles.circle4}></span>
        <span className={styles.circle5}></span>
        <span className={styles.text}>{text}</span>
      </button>
    </div>
  );
};

export default Button;
