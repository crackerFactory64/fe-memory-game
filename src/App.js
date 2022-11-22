import React, { useState, useEffect } from "react";
import Card from "./Card";

function App() {
  const VALUES = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6];
  const cardButtons = [...document.querySelectorAll(".card")];

  const [card1, setCard1] = useState(null);
  const [card2, setCard2] = useState(null);
  const [cardValues] = useState(shuffle(VALUES));
  const [matchedCards, setMatchedCards] = useState(0);

  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  function handleClick(e) {
    const { target } = e;

    if (!card1) {
      target.className = "card show";
      setCard1(target);
    } else if (card1) {
      if (target !== card1) {
        target.className = "card show";
        setCard2(target);
      }
    }
  }

  function compareCards(card1, card2) {
    if (card1.dataset.value === card2.dataset.value) {
      //if cards match update total score
      setMatchedCards(
        cardButtons.filter((button) => button.classList.contains("show")).length
      );
    } else if (card1.dataset.value !== card2.dataset.value) {
      //if cards don't match hide them again
      card1.className = "card";
      card2.className = "card";
    }

    //reset selected cards
    setCard1(null);
    setCard2(null);
  }

  useEffect(() => {
    if (card1 && card2) {
      cardButtons.forEach((button) => {
        button.disabled = true;
      });
      setTimeout(() => {
        compareCards(card1, card2);
        cardButtons.forEach((button) => {
          if (!button.classList.contains("show")) button.disabled = false;
        });
      }, 1000);
    }
  }, [card2]);

  const cards = cardValues.map((value, index) => {
    return <Card key={index} value={value} handleClick={handleClick} />;
  });

  return (
    <div className="container">
      <h1>Memory Game</h1>
      <p className="score">
        Score: {matchedCards}/{VALUES.length}
      </p>
      <div className="card-grid">{cards}</div>
    </div>
  );
}

export default App;
