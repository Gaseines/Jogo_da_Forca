import styles from "./StartView.module.css";
import Button from "./subComponents/Button";

const StartView = ({StartGame}) => {
  return (
    <div className="container">
      <h2>Jogo da Forca</h2>
      <Button text={"Começar o Jogo"} func={StartGame} />
    </div>
  );
};

export default StartView;
