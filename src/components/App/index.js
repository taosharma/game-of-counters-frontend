import React, { useState, useEffect } from "react";
import css from "./App.module.css";

import io from "socket.io-client";

import Button from "../Button";
import Counter from "../Counter";

function App() {
  const [counter, setCounter] = useState();

  const socket = io("http://localhost:5000");

  socket.on("counter", counter => {
    setCounter(counter);
  });

  function incrementCounter() {
    socket.emit("increment counter", { my: "data" });
    console.log("hello");
  }

  return (
    <main className={css.main}>
      <Button text="Increment Counter" handleClick={incrementCounter} />
      <Counter counter={counter} />
    </main>
  );
}

export default App;
