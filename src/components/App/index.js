import React, { useState } from "react";
import css from "./App.module.css";

import Button from "../Button";
import Counter from "../Counter";

function App() {
  const [counter, setCounter] = useState(0);

  function incrementCounter() {
    let updatedCounter = counter;
    updatedCounter++;
    setCounter(updatedCounter);
  }
  return (
    <main className={css.main}>
      <Button text="Increment Counter" handleClick={incrementCounter} />
      <Counter counter={counter} />
    </main>
  );
}

export default App;
