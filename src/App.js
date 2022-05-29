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
import Navbar from "./components/Navbar";
//import { Router } from "express";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Instr from './pages/Instr'

// const words = ["application", "programming", "interface", "wizard"];

// let selectedWord = words[Math.floor(Math.random() * words.length)];
let selectedWord = "";

function App() {
	const i = useRef(0);
	const [playable, setPlayable] = useState(true);
	const [correctLetters, setCorrectLetters] = useState([]);
	const [wrongLetters, setWrongLetters] = useState([]);
	const [showNotification, setshowNotification] = useState(false);
	const [post, setPost] = useState({});

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
					const letter = key.toLowerCase();

					if (post.includes(letter)) {
						if (!correctLetters.includes(letter)) {
							setCorrectLetters((currentLetters) => [
								...currentLetters,
								letter,
							]);
						} else {
							show(setshowNotification);
						}
					} else {
						if (!wrongLetters.includes(letter)) {
							setWrongLetters((wrongLetters) => [...wrongLetters, letter]);
						} else {
							show(setshowNotification);
						}
					}
				}
			}
		};
		window.addEventListener("keydown", handleKeydown);

		return () => window.removeEventListener("keydown", handleKeydown);
	}, [correctLetters, wrongLetters, playable]);

	function playAgain() {
		setPlayable(true);

		setCorrectLetters([]);
		setWrongLetters([]);

		i.current = 0;
	}
	return (
		<>
			<Router>
				<Navbar />
				<Routes>
					<Route path="/" exact/>
					<Route path="/instructions" component={Instr}/>
				</Routes>
			</Router>
			<Header className="head" />

			<div className="game-container">
				<WrongLetters wrongLetters={wrongLetters} />
				<Figure wrongLetters={wrongLetters} />
				<Word selectedWord={selectedWord} correctLetters={correctLetters} />
			</div>
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
