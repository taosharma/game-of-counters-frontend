/* Import react and css. */

import React, { useState, useEffect } from "react";
import css from "./App.module.css";

/* Import socket.io from its node module.  */

import io from "socket.io-client";

/* Import the Button and counter Components. */

import Button from "../Button";
import Counter from "../Counter";

/* Define a variable which uses socket.io on the desired namespace. */

const game = io("http://localhost:5000/game");

function App() {
  /* Saves the socket.io connection in state to be used in the app. Probably not necessary as it never changes, and can exist 
globally!  */
  const [connection] = useState(game);

  // State which holds the player id, which will be set by the server.

  const [playerId, setPlayerId] = useState("");

  // State which holds the player's room number, which will be set nby the server.

  const [playerRoom, setPlayerRoom] = useState("");

  // State which holds each player's counter.

  const [player1Counter, setPlayer1Counter] = useState(0);
  const [player2Counter, setPlayer2Counter] = useState(0);

  // State which holds a message to say whether the player is winning, losing or drawing with their opponent.

  const [winning, setWinning] = useState("Waiting for game to start.");

  /* A useEffect hook which triggers when the 'connection' state changes - in reality this is once on the first render. */

  useEffect(() => {
    /* Tells the client to listen for the 'joinedRoom' event, and uses the data sent by that event from the server.
  That data determines the player's id, room, and the state of both counters. */

    connection.on("joinedRoom", (data) => {
      console.log(data.message);
      setPlayerId(data.id);
      setPlayerRoom(data.message);
      setPlayer1Counter(data.player1Counter);
      setPlayer2Counter(data.player2Counter);
    });

    /* Tells the client to listen for the 'updateCounters' event, which uses the data sent by the server on that event to
    update the state of both counters.  */

    connection.on("updateCounters", (data) => {
      setPlayer1Counter(data.player1Counter);
      setPlayer2Counter(data.player2Counter);
    });

    /* Tells the client to listen on the 'currentWinner' event, which uses the data sent by the server to update to the player
    whether they are winning or not. */

    connection.on("currentWinner", (data) => {
      setWinning(data.message);
    });
  }, [connection]);

  /* A function which tells the server to respond to the 'incrementCounter' event. It sends a message and the player's id so
  that the server can increment the correct counter. */

  function incrementCounter() {
    connection.emit("incrementCounter", {
      message: "client has incremented the counter",
      id: playerId,
    });
  }

  /* The layout of the page - boring! */

  return (
    <main className={css.main}>
      <h1>{playerRoom}</h1>
      <Button text="Increment Counter" handleClick={incrementCounter} />
      <p className={css.winning}>{winning}</p>
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
