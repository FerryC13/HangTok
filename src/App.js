import React, { useState, useEffect, useRef } from "react";
import Header from "./components/Header";
import Figure from "./components/Figure";
import WrongLetters from "./components/WrongLetters";
import Word from "./components/Word";
import Popup from "./components/Popup";
import Notification from "./components/Notification";
import { showNotification as show } from "./helpers/helpers";
import "./App.css";
import axios from "axios";

// const words = ["application", "programming", "interface", "wizard"];

// let selectedWord = words[Math.floor(Math.random() * words.length)];
let selectedWord = "";

function App() {
  const i = useRef(0);
  const [playable, setPlayable] = useState(true);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [showNotification, setshowNotification] = useState(false);
  const [post, setPost] = useState([]);

  useEffect(() => {
    axios
      .get("https://random-word-api.herokuapp.com/word")
      .then((res) => {
        if (i.current == 0) {
          selectedWord = res.data[0];
          console.log(selectedWord);
          setPost(selectedWord);
          i.current = i.current + 1;
        }
        // console.log(res);
        // console.log(res.data[0]);
        // console.log(post);
      })
      .catch((err) => {
        console.log(err);
      });

    const handleKeydown = (event) => {
      {
        const { key, keyCode } = event;
        if (playable && keyCode >= 65 && keyCode <= 90) {
          const letter = key.toUpperCase();

          gameLogic(letter);
        }
      }
    };
    window.addEventListener("keydown", handleKeydown);

    return () => window.removeEventListener("keydown", handleKeydown);
  }, [correctLetters, wrongLetters, playable]);

  function playAgain() {
    setPlayable(true);
    resetBtn();
    setCorrectLetters([]);
    setWrongLetters([]);

    i.current = 0;
  }

  function resetBtn() {
    var letter, btn;
    for (var i = 65; i <= 90; i++) {
      letter = String.fromCharCode(i);
      btn = document.getElementById("button_" + letter);
      btn.disabled = false;
    }
  }
    window.addEventListener("load", function (windowLoadE) {
      var p, letter, button, holder;
      holder = document.getElementById("buttonsHolder");
      holder.style.zoom = "90%";
      for (var i = 65; i <= 90; i++) {
        if (i == 65 || i == 79) {
          p = document.createElement("p");
          p = document.createElement("p");
          p.padding = "20px 30px";
          p.position = "relative";
          p.margin = "auto";
          p.height = "350px";
          p.width = "100%";
        }
        letter = String.fromCharCode(i);
        button = document.createElement("button");
        button.setAttribute("class", "letterBtn");
        button.setAttribute("id", "button_" + letter);
        button.innerHTML = letter;
        button.setAttribute("data-letter", letter);
        button.onclick = function (e) { setLetter(this.getAttribute("data-letter")); };
        button.style.height = "100%";
        // button.style.backgroundColor = "rgba(250,199,92,0.8)";
        button.style.backgroundColor = "rgba(250,199,92,0.8)";
        button.style.color = "black";
        button.style.fontSize = "15px";
        button.style.padding = "20px 15px";
        button.style.borderRadius = "5px";
        button.style.margin = "0px 5px";
        button.style.cursor = "pointer";
        button.style.width = "40px";


        if (wrongLetters.includes(letter) || correctLetters.includes(letter)) {
          button.disabled = true;
        }
        p.appendChild(button);
        if (i == 78 || i == 89) {
          holder.appendChild(p);
        }
      }
    });



    function setLetter(input_letter) {
      gameLogic(input_letter);
    }

    function gameLogic(chosen_letter) {
      var btn = document.getElementById("button_" + chosen_letter);
      btn.disabled = true;
      if (post.includes(chosen_letter)) {
        if (!correctLetters.includes(chosen_letter)) {
          setCorrectLetters((currentLetters) => [
            ...currentLetters,
            chosen_letter,
          ]);
        } else {
          show(setshowNotification);
        }
      } else {
        if (!wrongLetters.includes(chosen_letter)) {
          setWrongLetters((wrongLetters) => [...wrongLetters, chosen_letter]);
        } else {
          show(setshowNotification);
        }
      }



    }



    return (
      <>
        <Header className="head" />
        <div className="game-container">
          <WrongLetters wrongLetters={wrongLetters} />
          <Figure wrongLetters={wrongLetters} />
          <Word selectedWord={selectedWord} correctLetters={correctLetters} />
        </div>
        <div id="buttonsHolder"></div>
        <Popup
          correctLetters={correctLetters}
          wrongLetters={wrongLetters}
          selectedWord={selectedWord}
          setPlayable={setPlayable}
          playAgain={playAgain}
        />
        <Notification showNotification={showNotification} />
      </>
    );
  }

  export default App;
