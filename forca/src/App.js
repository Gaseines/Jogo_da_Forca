//Css
import "./App.css";

//React
import { useCallback, useEffect, useState } from "react";

// Dados
import { wordsList } from "./data/WordList";

//Components
import StartView from "./components/StartView";
import Game from "./components/Game";
import End from "./components/End";

function App() {

  let qtdTentativas = 7

  const [stage, setStage] = useState("start");
  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [errLetters, setErrLetters] = useState([]);
  const [guesses, setGuesses] = useState(qtdTentativas);
  const [score, setScore] = useState(0);

  const [words] = useState(wordsList);

  //Pick a category and word
  const PickCategoryAndWord = () => {
    //Pick categories
    const categories = Object.keys(words);
    //Pick a random category
    const category =
      categories[Math.floor(Math.random() * Object.keys(categories).length)];

    //Pick a random word
    const word =
      words[category][Math.floor(Math.random() * Object.keys(category).length)];

    return { word, category };
  };

  //Start the game
  const StartGame = () => {
    //Select random category
    const { word, category } = PickCategoryAndWord();

    //Separando em Letras
    let wordLetters = word.split("");
    //Letras minusculas
    wordLetters = wordLetters.map((l) => l.toUpperCase());

    console.log(word, category, wordLetters);
    setPickedCategory(category);
    setPickedWord(word);
    setLetters(wordLetters);
    setStage("game");
  };

  const VerifyLetter = (letter) => {

    //Inclui as letras certas e erradas ao array
    if (letters.includes(letter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        letter,
      ]);
    } else {
      setErrLetters((actualErrLetterss) => [...actualErrLetterss, letter]);

      //Diminuui 1 nas chances do usuario
      setGuesses(guesses - 1)
    }

  };
// função para limpar os dados antigos
  function clearLetterStates(){
    setErrLetters([])
    setGuessedLetters([])
  }

  useEffect(() => {
    if(guesses === 0){
      //Muda o stage da pagina para o fim de jogo
      setStage("end")

      //Limpa os dados antigos
      clearLetterStates()
    }
  }, [guesses])

  console.log(guesses);

  const Restart = () => {
    setStage("start");
    setScore(0)
    setGuesses([qtdTentativas])
  };

  return (
    <div className="App">
      {stage === "start" && <StartView StartGame={StartGame} />}
      {stage === "game" && (
        <Game
          VerifyLetter={VerifyLetter}
          pickedCategory={pickedCategory}
          pickedWord={pickedWord}
          letters={letters}
          guessedLetters={guessedLetters}
          errLetters={errLetters}
          guesses={guesses}
          score={score}
        />
      )}
      {stage === "end" && <End Restart={Restart} />}
    </div>
  );
}

export default App;
