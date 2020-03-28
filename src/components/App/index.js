import React, { useState, useEffect } from "react";
import css from "./App.module.css";

import Button from "../Button";
import Counter from "../Counter";

function App() {
  const [counter, setCounter] = useState();
  const [request, setRequest] = useState(false);
  console.log(counter);

  useEffect(() => {
    async function fetchCounter() {
      const response = await fetch("http://localhost:5000/counter");
      const { payload } = await response.json();
      console.log(payload);
      setCounter(payload);
    }
    fetchCounter();
  }, [request]);

  async function incrementCounter() {
    setRequest(true);
    await fetch("http://localhost:5000/counter/increment");
    setRequest(false);
  }
  return (
    <main className={css.main}>
      <Button text="Increment Counter" handleClick={incrementCounter} />
      <Counter counter={counter} />
    </main>
  );
}

export default App;
