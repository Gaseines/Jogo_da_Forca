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
  const [letters, setLetters] = useState(["a"]);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [errLetters, setErrLetters] = useState([]);
  const [correctWord, setCorrectWord] = useState([])
  const [guesses, setGuesses] = useState(qtdTentativas);
  const [score, setScore] = useState(0);

  const [words] = useState(wordsList);

  //Pick a category and word
  const PickCategoryAndWord = useCallback(() => {
    //Pick categories
    const categories = Object.keys(words);
    //Pick a random category
    const category =
      categories[Math.floor(Math.random() * Object.keys(categories).length)];

    //Pick a random word
    const word =
      words[category][Math.floor(Math.random() * Object.keys(category).length)];

    return { word, category };
  },[words]);

  //Start the game
  const StartGame = useCallback(() => {
    //Confere word
    if(correctWord.includes(pickedWord)){
      return;
    }

    //Select random category
    const { word, category } = PickCategoryAndWord();

    //Separando em Letras
    let wordLetters = word.split("");
    //Letras minusculas
    wordLetters = wordLetters.map((l) => l.toUpperCase());

    // console.log(word, category, wordLetters); se quiser ver no console a resposta
    setPickedCategory(category);
    setPickedWord(word);
    setLetters(wordLetters);
    setStage("game");
  }, [PickCategoryAndWord, pickedWord, correctWord]);

  //Vrifica a Letra enviada
  const VerifyLetter = (letter) => {

    if(guessedLetters.includes(letter) || errLetters.includes(letter)){
      return;
    }
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

  //Win condition
  useEffect(() => {
    const uniqueLetters = [...new Set(letters)]

    if(guessedLetters.length === uniqueLetters.length ){
      //add Correct Word
      setCorrectWord((actualCorrectWords) => [
        ...actualCorrectWords,
        pickedWord,
      ])

      //Add 100 to score
      setScore((actualScore) => actualScore += 100)

      //Reset tha Letters
      StartGame()

      //Clear states
      clearLetterStates()
      setGuesses(qtdTentativas)

      console.log("Acertou")
    }
    console.log(correctWord)
  }, [guessedLetters, letters, StartGame, qtdTentativas, pickedWord])

  //Lose condition
  useEffect(() => {
    if(guesses === 0){
      //Muda o stage da pagina para o fim de jogo
      setStage("end")

      //Limpa os dados antigos
      clearLetterStates()
    }
  }, [guesses])

  

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
      {stage === "end" && <End Restart={Restart} score={score} word={pickedWord}/>}
    </div>
  );
}

export default App;
