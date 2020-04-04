import React, { useState, useEffect } from "react";
import css from "./App.module.css";

import io from "socket.io-client";

import Button from "../Button";
import Counter from "../Counter";

const game = io("http://localhost:5000/game");

function App() {
  const [connection] = useState(game);
  const [playerId, setPlayerId] = useState("");
  const [playerRoom, setPlayerRoom] = useState("");
  const [player1Counter, setPlayer1Counter] = useState(0);
  const [player2Counter, setPlayer2Counter] = useState(0);
  const [winning, setWinning] = useState("Waiting for game to start.");

  useEffect(() => {
    connection.on("joinedRoom", (data) => {
      console.log(data.message);
      setPlayerId(data.id);
      setPlayerRoom(data.message);
      setPlayer1Counter(data.player1Counter);
      setPlayer2Counter(data.player2Counter);
    });
    connection.on("updateCounters", (data) => {
      setPlayer1Counter(data.player1Counter);
      setPlayer2Counter(data.player2Counter);
    });
    connection.on("currentWinner", (data) => {
      setWinning(data.message);
    });
  }, [connection]);

  function incrementCounter() {
    connection.emit("incrementCounter", {
      message: "client has incremented the counter",
      id: playerId,
    });
    connection.on("updateCounters", (data) => {
      setPlayer1Counter(data.player1Counter);
      setPlayer2Counter(data.player2Counter);
    });
    connection.on("currentWinner", (data) => {
      setWinning(data.message);
    });
  }

  return (
    <main className={css.main}>
      <h1>{playerRoom}</h1>
      <Button text="Increment Counter" handleClick={incrementCounter} />
      <p>{winning}</p>
      <Counter
        label="Player 1 Counter:"
        counter={player1Counter}
        grid={css.counter1Grid}
      />
      <Counter
        label="Player 2 Counter:"
        counter={player2Counter}
        grid={css.counter2Grid}
      />
    </main>
  );
}

export default App;
