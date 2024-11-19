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
  const [stage, setStage] = useState("start")

  const [words] = useState(wordsList);

  //Pick a category and word
  const PickCategoryAndWord = () =>{
    //Pick categories
    const categories = Object.keys(words)
    //Pick a random category
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]

    //Pick a random word
    const word = words[category][Math.floor(Math.random() * Object.keys(category).length)]

    return {word, category}
  }

  //Start the game
  const StartGame = () =>{
    //Select random category
   const { word, category} = PickCategoryAndWord()
   

   //Separando em Letras
   let letters = word.split("")
   //Letras minusculas
   letters = letters.map((l) => l.toLowerCase())

   console.log(word, category, letters)

    setStage("game")
  }

  const GameOver = () =>{
    setStage("end")
  }

  const Restart = () =>{
    setStage("start")
  }

  return (
    <div className="App">
      {stage === "start" && <StartView StartGame={StartGame} />}
      {stage === "game" && <Game GameOver={GameOver} />}
      {stage === "end" && <End Restart={Restart} />}
    </div>
  );
}

export default App;
