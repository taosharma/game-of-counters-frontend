import React from "react";

import css from "./Counter.module.css";

function Counter({ label, counter, grid }) {
  return (
    <div className={grid + " " + css.counter}>
      <p>{label}</p>
      <p>{counter}</p>
    </div>
  );
}

Counter.defaultProps = {
  counter: "Display counter here",
};

export default Counter;
