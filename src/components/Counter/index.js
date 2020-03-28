import React from "react";

import css from "./Counter.module.css";

function Counter({ counter }) {
  return <p className={css.counter}>{counter}</p>;
}

Counter.defaultProps = {
  counter: "Display counter here"
};

export default Counter;
